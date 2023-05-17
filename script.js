/* eslint-disable no-console */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registration-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrorMessages();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        if (!validateName(name)) {
            showError(nameInput, 'Please enter a valid name.');
            return false;
        }

        if (!validateEmail(email)) {
            showError(emailInput, 'Please enter a valid email address.');
            return false;
        }

        if (!validatePassword(password)) {
            showError(passwordInput, 'Please enter a valid password (at least 8 characters, one uppercase, one lowercase, one digit).');
            return false;
        }

        if (password !== confirmPassword) {
            showError(confirmPasswordInput, 'Passwords do not match.');
            return false;
        }

        // Form validation successful, do further processing or submit the form
        console.log('Form submitted successfully!');
        fetchpost(e);
        return true;
    });

    function fetchpost(e) {
        // (A) GET FORM DATA
        const data = new FormData(e.currentTarget);

        // (B) FETCH
        fetch(e.currentTarget.action, { method: 'post', body: data })
            .then(res => res.text())
            .then((txt) => {
                // do something when server responds
                console.log(txt);
                form.remove();
                const template = document.getElementById('thankYou');
                const clone = template.content.cloneNode(true);
                document.body.appendChild(clone);
            })
            .catch(err => console.log(err));

        // (C) PREVENT HTML FORM SUBMIT
        return false;
    }

    function validateName(name) {
        return /^[a-zA-Z]+$/.test(name);
    }

    function validateEmail(email) {
    // Basic email validation, can be improved
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validatePassword(password) {
    // Password must contain at least 8 characters, one uppercase, one lowercase, one digit
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(password);
    }

    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorMessage = document.createElement('span');
        errorMessage.className = 'error-message';
        errorMessage.innerText = message;
        formGroup.appendChild(errorMessage);
        input.classList.add('error');
    }

    function clearErrorMessages() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach((errorMessage) => {
            errorMessage.parentElement.removeChild(errorMessage);
        });

        const errorInputs = document.querySelectorAll('.error');
        errorInputs.forEach((errorInput) => {
            errorInput.classList.remove('error');
        });
    }
});
