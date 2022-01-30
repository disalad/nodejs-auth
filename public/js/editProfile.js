const form = document.querySelector('form');
const usernameInput = form.querySelector('#username');
const alert = form.querySelector('.alert');
const profileImg = form.querySelector('.profile-dp');
const fileInput = document.getElementById('file-input');

fileInput.addEventListener('change', function () {
    const [file] = fileInput.files;
    if (file) {
        profileImg.src = URL.createObjectURL(file);
    }
});

form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    console.log('TEST');
    if (usernameInput.value) {
        alert.textContent = '';
        alert.classList.add('hidden');
        this.submit();
    } else {
        alert.textContent = 'Please enter a username';
        alert.classList.remove('hidden');
    }
});
