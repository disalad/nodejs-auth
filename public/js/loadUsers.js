const loadUsers = document.getElementById('loadUsers');

loadUsers.addEventListener('click', async function (ev) {
    ev.preventDefault();
    const currentPage = Number(getQueryParam('page') || 1);
    const res = await fetch(`/api/users?skip=${currentPage}`);
    const users = await res.json();
    console.log(users);
    changeQueryParam(currentPage + 1);
    renderUsers(users);
    if (users.length < 5) {
        const div = loadUsers.parentElement;
        loadUsers.remove();
        div.innerHTML = '<h6 class="mb-5">End of Results</h6>';
    }
});

const changeQueryParam = n => {
    const newurl =
        window.location.protocol +
        '//' +
        window.location.host +
        window.location.pathname +
        `?page=${n}`;
    window.history.pushState({ path: newurl }, '', newurl);
};

const getQueryParam = query => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    const value = params[query];
    return value;
};

const renderUsers = users => {
    users.forEach(user => {
        const userList = document.querySelector('.user-list');
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex align-items-center user';
        li.innerHTML = `<img
                        src="${user.imgUrl}"
                        alt=""
                        width="50"
                        height="50"
                        class="rounded-circle me-3 profile-picture"
                    />
                    <div class="flex-fill pl-3 pr-3">
                        <div>
                            <a
                                href="/profile/${user.username}"
                                class="text-dark font-weight-600"
                                >${user.username}</a
                            >
                        </div>
                        ${user.bio ? `<div class="text-muted fs-13px">${user.bio}</div>` : ''}
                    </div>`;
        userList.appendChild(li);
    });
};
