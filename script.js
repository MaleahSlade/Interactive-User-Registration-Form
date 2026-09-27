// 1. Grab the elements
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// 2. Load saved username (runs when the page opens)
const savedUsername = localStorage.getItem('username');

if (savedUsername) {
    username.value = savedUsername;
}

// 3. Submit listener (with setItem added)
form.addEventListener('submit', function(event) {
    event.preventDefault();

    if (validateInputs()) {
        localStorage.setItem('username', username.value.trim());
        alert('Registration successful!');
        form.reset();
    }
});

function setError(element, message) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error-message');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

function setSuccess(element) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error-message');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

function validateInputs() {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value;
    const password2Value = password2.value;

    if (usernameValue === '') {
        setError(username, 'Username is REQUIRED');
    } else if (!/^[a-zA-Z0-9]{3,20}$/.test(usernameValue)) {
        setError(username, 'Username must be 3-20 letters or numbers');
    } else {
        setSuccess(username);
    }

    if (emailValue === '') {
        setError(email, 'Email is REQUIRED');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
        setError(email, 'Please enter a valid email address');
    } else {
        setSuccess(email);
    }

     if (passwordValue === '') {
        setError(password, 'Password is REQUIRED');
    } else if (passwordValue.length < 8) {
        setError(password, 'Password must be at least 8 characters');
    } else {
        setSuccess(password);
    }

    if (password2Value === '') {
        setError(password2, 'Please confirm your password');
    } else if (password2Value !== passwordValue) {
        setError(password2, 'Passwords do not match');
    } else {
        setSuccess(password2);
    }

    const errors = form.querySelectorAll('.error');
    return errors.length === 0;
}