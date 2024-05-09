const container = document.querySelector(".container"),
      pwShowHide = document.querySelectorAll(".showHidePw"),
      pwFields = document.querySelectorAll(".password"),
      signUp = document.querySelector(".signup-link"),
      login = document.querySelector(".login-link");

    //   js code to show/hide password and change icon
    pwShowHide.forEach(eyeIcon =>{
        eyeIcon.addEventListener("click", ()=>{
            pwFields.forEach(pwField =>{
                if(pwField.type ==="password"){
                    pwField.type = "text";

                    pwShowHide.forEach(icon =>{
                        icon.classList.replace("uil-eye-slash", "uil-eye");
                    })
                }else{
                    pwField.type = "password";

                    pwShowHide.forEach(icon =>{
                        icon.classList.replace("uil-eye", "uil-eye-slash");
                    })
                }
            }) 
        })
    })

    // js code to appear signup and login form
    signUp.addEventListener("click", ( )=>{
        container.classList.add("active");
    });
    login.addEventListener("click", ( )=>{
        container.classList.remove("active");
    });
    

// Function to validate signup form
function validateRegistrationForm() {
    var name = document.querySelector(".signup [name='name']").value;
    var email = document.querySelector(".signup [name='email']").value;
    var password = document.querySelector(".signup [name='password']").value;
    var confirmPassword = document.querySelector(".signup [name='confirmPassword']").value;
    var termsAccepted = document.getElementById("termCon").checked;

    if (!name || !email || !password || !confirmPassword) {
        alert("Please fill in all fields.");
        return false;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return false;
    }

    if (!termsAccepted) {
        alert("You must accept the terms and conditions to proceed.");
        return false;
    }

    // After successful validation, redirect to the upload page
    window.location.href = 'upload.html'; // Replace with your actual upload page URL
    return false; // Prevent the form from submitting normally
}

function loginWithEmailPassword() {
    var email = document.querySelector("[name='email']").value;
    var password = document.querySelector("[name='password']").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            // Redirect or do something with the user info
            console.log("Logged in as: ", user.email);
            window.location.href = 'upload.html'; // Redirect to a welcome page
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert("Error: " + errorMessage);
        });
    return false; // Prevent the form from submitting normally
}
