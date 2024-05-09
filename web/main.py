import os
import json
import torch
import torch.nn as nn
from torchvision.models import resnet50, ResNet50_Weights
from torchvision import transforms
from PIL import Image
import numpy as np
import shutil
from fastapi import FastAPI, UploadFile, File, HTTPException, Request
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from firebase_admin import credentials, storage, initialize_app

# Configuration
UPLOAD_FOLDER = "uploads"
MODEL_PATH = "best_model.pth"
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
FIREBASE_CREDENTIALS_PATH = "Firebase Service Account.json"  # Update this path
FIREBASE_BUCKET_NAME = "gray-matter-2ad47.appspot.com"  # Update this with your Firebase Storage bucket name

# Initialize Firebase Admin SDK
cred = credentials.Certificate(FIREBASE_CREDENTIALS_PATH)
initialize_app(cred, {
    'storageBucket': FIREBASE_BUCKET_NAME
})

# Initialize FastAPI app
app = FastAPI()

# Static files setup
app.mount("/uploads", StaticFiles(directory=UPLOAD_FOLDER), name="uploads")
app.mount("/static", StaticFiles(directory="static"), name="static")

# Jinja2 templates
templates = Jinja2Templates(directory="templates")

# Load the trained model
weights = ResNet50_Weights.DEFAULT
model = resnet50(weights=weights)
num_ftrs = model.fc.in_features
model.fc = nn.Linear(num_ftrs, 2)  # Assuming two classes: MCI and NC
model.to(DEVICE)

# Check if the best model file exists
if os.path.exists(MODEL_PATH):
    model.load_state_dict(torch.load(MODEL_PATH, map_location=DEVICE))
    model.eval()
else:
    raise FileNotFoundError(f"{MODEL_PATH} not found. Please ensure the best model is available.")

# Define preprocess function
preprocess = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

# Check file extension
def allowed_file(filename):
    return filename.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.dcm'))

# Load and preprocess an image
def load_image(image_path):
    if image_path.endswith('.dcm'):
        import pydicom
        dicom = pydicom.dcmread(image_path)
        image = dicom.pixel_array.astype(float)
        image -= image.min()
        image /= image.max()
        image *= 255.0
        image = image.astype(np.uint8)
        image = np.stack((image,) * 3, axis=-1)
        image = Image.fromarray(image, 'RGB')
    else:
        image = Image.open(image_path).convert('RGB')

    image = preprocess(image)
    return image

# Classify image
def classify_image(image):
    with torch.no_grad():
        image = image.unsqueeze(0).to(DEVICE)
        outputs = model(image)
        _, predicted = torch.max(outputs, 1)
        return predicted.item()

# Upload file to Firebase Storage
def upload_to_firebase(file_path):
    bucket = storage.bucket()
    blob = bucket.blob(f"images/{os.path.basename(file_path)}")
    blob.upload_from_filename(file_path)
    blob.make_public()
    return blob.public_url

# Home route with HTML form
@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# Upload and classify route
@app.post("/upload")
async def upload_file(request: Request, file: UploadFile = File(...)):
    if not allowed_file(file.filename):
        raise HTTPException(status_code=400, detail="Invalid file format")

    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    with open(file_path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    image = load_image(file_path)
    class_idx = classify_image(image)
    classes = ['NC', 'MCI']  # Adjust based on your dataset classes
    result = classes[class_idx]

    public_url = upload_to_firebase(file_path)

    return templates.TemplateResponse("Result.html", {
        "request": request,
        "result": result,
        "public_image_url": public_url
    })

# Download the best model
@app.get("/download_model")
async def download_model():
    if os.path.exists(MODEL_PATH):
        return FileResponse(MODEL_PATH, media_type='application/octet-stream', filename='best_model.pth')
    else:
        raise HTTPException(status_code=404, detail="Model file not found.")

if __name__ == "_main_":
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)