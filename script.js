const form = document.getElementById('registration-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');

// This function is called when the form is submitted
form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Validate the input fields
    if (checkInputs()) {
        // If the inputs are valid, submit the form
        submitForm(e);
    }
});

// Asynchronously submit form
async function submitForm(e) {
    // GET FORM DATA
    const data = new FormData(e.currentTarget);

    // FETCH
    try {
        const response = await fetch(e.currentTarget.action, { method: 'post', body: data });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const status = await response.status;
        if (status === 200) {
            showSuccess();
        } else {
            showError(form, 'There was an error submitting the form. Please try again.');
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        showError(form, 'There was an error submitting the form. Please try again.');
    }

    // PREVENT HTML FORM SUBMIT
    return false;
}

function checkInputs() {
    clearErrorMessages();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    const nameIsValid = validateName(name);
    const emailIsValid = validateEmail(email);
    const passwordIsValid = validatePassword(password);
    const passwordsMatch = password === confirmPassword;

    if (!nameIsValid) {
        showError(nameInput, 'Please enter a valid name.');
    }

    if (!emailIsValid) {
        showError(emailInput, 'Please enter a valid email address.');
    }

    if (!passwordIsValid) {
        showError(passwordInput, 'Please enter a valid password (at least 8 characters, one uppercase, one lowercase, one digit).');
    }

    if (!passwordsMatch) {
        showError(confirmPasswordInput, 'Passwords do not match.');
    }

    // Return true if all inputs are valid
    if (nameIsValid && emailIsValid && passwordIsValid && passwordsMatch) {
        return true;
    }

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
    const formGroup = input.parentElement.parentElement;
    const errorMessage = document.createElement('div');
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

function showSuccess() {
    document.getElementById('registration-form').style.display = 'none';
    document.getElementById('success-message').style.display = 'block';
}
