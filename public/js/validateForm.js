const alert = document.querySelector('.alert');
const form = document.querySelector('form');
const emailInput = form.querySelector('#email');
const passwordInput = form.querySelector('#password');
const usernameInput = form.querySelector('#name');
const formSubmitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    const validUsername = usernameInput ? validateUsername(usernameInput.value) : false;
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

document.body.addEventListener('keydown', function (e) {
    if (e.keyCode == 13 && (e.metaKey || e.ctrlKey)) {
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

if (usernameInput) {
    usernameInput.addEventListener('input', async function () {
        formSubmitBtn.disabled = true;
        toggleTooltip([formSubmitBtn.parentElement], 'Please Wait!', 'hover');
        try {
            const availability = await fetch('/api/check_username', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: usernameInput.value.trim(),
                }),
            });
            const result = await availability.json();
            if (!result.available) {
                throw new Error('Username exists');
            }
            console.warn(result);
            toggleTooltip([formSubmitBtn.parentElement], '', '');
            formSubmitBtn.disabled = false;
        } catch (err) {
            // eslint-disable-next-line quotes
            toggleTooltip([formSubmitBtn.parentElement], "Username isn't available", 'hover');
            formSubmitBtn.disabled = true;
        }
    });
}

const toggleTooltip = (el, title, trigger) => {
    el.map(function (triggerEl) {
        // eslint-disable-next-line no-undef
        return new bootstrap.Tooltip(triggerEl, {
            container: 'body',
            trigger,
            title,
        });
    });
};
