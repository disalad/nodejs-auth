const alert = document.querySelector('.alert');
const form = document.querySelector('form');
const usernameInput = form.querySelector('#name');
const formSubmitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    if (validateUsername(usernameInput.value)) {
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

const validateUsername = username => {
    return username.length < 1;
};

if (usernameInput) {
    let typingTimer;
    let doneTypingInterval = 500;

    usernameInput.addEventListener('input', () => {
        formSubmitBtn.disabled = true;
        toggleTooltip([formSubmitBtn.parentElement], 'Please Wait!', 'hover');
        clearTimeout(typingTimer);
        if (usernameInput.value.trim()) {
            typingTimer = setTimeout(doneTyping, doneTypingInterval);
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

let aborter = null;
async function doneTyping() {
    try {
        if (aborter) {
            aborter.abort();
        }
        // make our request cancellable
        aborter = new AbortController();
        const signal = aborter.signal;
        const availability = await fetch('/api/check_username', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: usernameInput.value.trim(),
            }),
            signal: signal,
        });
        const result = await availability.json();
        aborter = null;
        if (!result.available) {
            throw new Error('Username already exists');
        }
        // UI Stuff
        toggleTooltip([formSubmitBtn.parentElement], '', '');
        alert.textContent = '';
        alert.classList.add('hidden');
        formSubmitBtn.disabled = false;
    } catch (err) {
        // UI Stuff
        // prettier-ignore
        alert.textContent = err.message;
        alert.classList.remove('hidden');
        toggleTooltip([formSubmitBtn.parentElement], '', '');
        formSubmitBtn.disabled = true;
    }
}
