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