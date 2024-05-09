document.addEventListener('DOMContentLoaded', function() {
    var stars = document.querySelectorAll('.star');
    var ratingInput = document.getElementById('rating');
    var form = document.getElementById('feedback-form');

    stars.forEach(function(star) {
        star.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent form submission when star is clicked
            var value = star.getAttribute('data-value');
            ratingInput.value = value; // Update the hidden input with the rating value
            stars.forEach(function(s, index) {
                if (index < value) {
                    s.classList.add('rated');
                } else {
                    s.classList.remove('rated');
                }
            });
            console.log('Rated: ' + value + '/10');
        });
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the default form submission
        var formData = new FormData(form);

        // Use fetch to send the form data to your server endpoint
        fetch('path-to-your-server-endpoint.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                console.log(data); // Handle the response from the server here
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const imagePath = params.get('image'); // Assuming the URL parameter is named 'image'

    if (imagePath) {
        const imageElement = document.getElementById('dynamicImage');
        imageElement.src = imagePath;
        imageElement.alt = "Displayed image from URL parameter";
    } else {
        console.log('No image parameter provided');
    }
});
window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    const imageUrl = params.get('image');
    console.log('Image URL:', imageUrl);
    if (imageUrl) {
        document.getElementById('dynamicImage').src = decodeURIComponent(imageUrl);
    }
};
window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    const imageUrl = params.get('image');
    if (imageUrl) {
        var link = document.createElement('a');
        link.href = decodeURIComponent(imageUrl);
        link.textContent = "View Uploaded Image";
        link.target = "_blank";

        var container = document.querySelector('.result-link-container');
        if (container) {
            container.appendChild(link);
        } else {
            console.error('Result link container not found');
        }
    } else {
        console.error('No image URL provided');
    }
};

