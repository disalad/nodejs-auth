const alert = document.querySelector('.alert');
const form = document.querySelector('form');
const emailInput = form.querySelector('#email');
const passwordInput = form.querySelector('#password');
const usernameInput = form.querySelector('#name');

form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    const username = usernameInput.value;
    const validUsername = usernameInput ? validateUsername(username) : true;
    if (validateEmail(email)) {
        alert.textContent = 'Please enter a valid email';
        alert.classList.remove('hidden');
    } else if (validatePassword(password)) {
        alert.textContent = 'Please enter a strong password';
        alert.classList.remove('hidden');
    } else if (validUsername) {
        alert.textContent = 'Please enter a username';
        alert.classList.remove('hidden');
    } else {
        alert.textContent = '';
        alert.classList.add('hidden');
        form.submit();
    }
});

const validateEmail = email => {
    const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !emailRegex.test(email);
};

const validatePassword = password => {
    const passwdRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return !passwdRegex.test(password);
};

const validateUsername = username => {
    return username.length < 1;
};
