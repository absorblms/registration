document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#registration-form');
    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');
    const confirmPasswordInput = document.querySelector('#confirm-password');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        if (!validateName(name)) {
            showError('name', 'Please enter a valid name.');
            return;
        }

        if (!validateEmail(email)) {
            showError('email', 'Please enter a valid email address.');
            return;
        }

        if (!validatePassword(password)) {
            if (password.length < 8) {
                showError('password', 'Password must contain 8 characters.');
            } else {
                showError('password', 'Password must contain one uppercase, one lowercase, and one digit.');
            }
            return;
        }

        if (password !== confirmPassword) {
            showError('confirm-password', 'Passwords do not match.');
            return;
        }

        const formData = {
            name,
            email,
            password,
            confirmPassword
        };

        // Form validation successful, do further processing or submit the form
        fetchpost(formData);
    });

    function fetchpost(e) {
        // (A) GET FORM DATA
        const data = new FormData(e.currentTarget);
        const url = 'https://formbold.com/s/3GqGp';
        // (B) FETCH
        fetch(url, { method: 'POST', body: data })
            .then((res) => {
                if (res.status === 200) {
                    thankYou();
                }
                return res;
            })
            .then(res => res.json())
            // eslint-disable-next-line no-console
            .catch(err => console.error(err));

        // (C) PREVENT HTML FORM SUBMIT
        return false;
    }

    function thankYou() {
        const thank = document.querySelector('.thank-you');
        const section = document.querySelector('section');
        thank.classList.add('show');
        section.classList.add('hide');
    }

    function validateName(name) {
        return /^[a-zA-Z]+$/.test(name);
    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    function validatePassword(password) {
        // Password must contain at least 8 characters, one uppercase, one lowercase, one digit
        const regEmail = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        return regEmail.test(password);
    }

    function showError(input, message) {
        const formGroup = document.querySelector(`.${input}`);
        const errorInput = formGroup.querySelector('input');
        const container = formGroup.querySelector('small');
        const errorMessage = document.createElement('span');
        errorMessage.className = 'error-message';
        errorMessage.innerText = message;
        container.appendChild(errorMessage);
        errorInput.classList.add('error');
        setTimeout(() => {
            clearErrorMessages();
        }, 10000);
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
