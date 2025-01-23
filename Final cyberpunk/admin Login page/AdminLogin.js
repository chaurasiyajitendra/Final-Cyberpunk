// Function to check if password and confirm password are the same
function checkPasswords() {
    const password = document.querySelector('.form_back input[placeholder="Password"]').value;
    const confirmPassword = document.querySelector('.form_back input[placeholder="Confirm Password"]').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return false;
    }
    return true;
}

// Function to validate all required fields in the back form
function validateFormBack() {
    const formBackInputs = document.querySelectorAll('.form_back input[required]');
    for (let input of formBackInputs) {
        if (!input.value) {
            alert('Please fill all required fields.');
            return false;
        }
    }
    return true;
}

// Function to check if username contains at least one special character and one number
function validateUsername() {
    const username = document.querySelector('.form_back input[placeholder="Username"]').value;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRegex = /[0-9]/;

    if (!specialCharRegex.test(username) || !numberRegex.test(username)) {
        alert('Username must contain at least one special character and one number.');
        return false;
    }
    return true;
}

// Add event listener to the signup button
document.querySelector('.form_back .btn').addEventListener('click', function(event) {
    if (!checkPasswords() || !validateFormBack() || !validateUsername()) {
        event.preventDefault(); // Prevent form submission if passwords do not match, required fields are not filled, or username is invalid
    } else {
        // Show the front form after successful signup
        document.getElementById('signup_toggle').checked = false;
        toggleForms();
    }
});

// Function to toggle form visibility
function toggleForms() {
    const formFront = document.querySelector('.form_front');
    const formBack = document.querySelector('.form_back');
    const signupToggle = document.getElementById('signup_toggle');

    if (signupToggle.checked) {
        formFront.classList.add('hidden');
        formBack.classList.remove('hidden');
    } else {
        formFront.classList.remove('hidden');
        formBack.classList.add('hidden');
        clearFormBack(); // Clear the back form fields when switching to the front form
    }
}

// Function to clear the back form fields
function clearFormBack() {
    const formBackInputs = document.querySelectorAll('.form_back input');
    formBackInputs.forEach(input => {
        input.value = '';
    });
}

// Add event listener to the toggle switch
document.getElementById('signup_toggle').addEventListener('change', toggleForms);

// Initial call to set the correct form visibility
toggleForms();