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
    function validateForm() {
    const email = document.querySelector("input[type='email']").value;
    const password = document.querySelector("input[type='password']").value;

    if (!email || !password) {
        alert("Please fill in both email and password.");
        return false;
    }

    if (!validateEmail(email) || !validatePassword(password)) {
        alert("Please enter a valid email and password.");
        return false;
    }

    window.location.href = 'upload.html';
    return true;

 }


   function validatesignUpForm() {
     const name = document.querySelector("input[type='name']").value;
     const email = document.querySelector("input[type='email']").value;
     const password = document.querySelector("input[type='password']").value;
     const confirmPassword = document.querySelector("input[type=confirm-password']").value;

     console.log(name, email, password, confirmPassword); // استخدم هذا للتأكد من أن القيم تُجمع بشكل صحيح

    if (!name || !email || !password || !confirmPassword) {
        alert("Please fill in all fields.");
        return false;
    }

    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return false;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return false;
    }

    window.location.href = 'upload.html';
    return true;
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password) {
    return password.length >= 6; // Adjust this as necessary
}
