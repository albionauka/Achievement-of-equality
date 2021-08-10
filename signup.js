function signUp(event) {
    event.preventDefault();
    const form = document.getElementById('form-signup');
    const username = form.children[1].children[0].value;
    const email = form.children[2].children[0].value;
    const password = form.children[3].children[0].value;
    const confirmPassword = form.children[4].children[0].value;
    const usernameCheck = /[a-zA-Z\d]{6,12}/g;
    const emailCheck = /[a-z0-9\.\_\%\+\-]+@[a-z0-9\.\-]+\.[a-z]{2,4}/g;
    const passwordCheck = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\!\@\#\$\%\^\&\*\(\)\-\_\=\+]).{6,16}$/g;
    let storage = {
        pass: false,
        user: false,
        email: false,

    }

    const user = {
        username,
        email,
        password
    }

    let exists = false;

    if (window.localStorage.getItem('users') === null) {
        window.localStorage.setItem('users', JSON.stringify([]));
    }

    let users = JSON.parse(localStorage.getItem('users'));

    if (username.match(usernameCheck) !== null) {
        storage.user = true;
    }

    if (email.match(emailCheck) !== null) {
        storage.email = true;
    }

    if (password.match(passwordCheck) !== null) {
        if (password === confirmPassword) {
           storage.pass = true; 
        } else {
            // passwords don't match case
        }
    } else {
        // invalid password case
    }

    if (storage.pass === true && storage.user === true && storage.email === true){
        users.forEach((userObj) => {
            if (userObj.username === username) {
                exists = true;
            }
        });

        if (exists === false) {
            users.push(user);
            window.localStorage.setItem('users', JSON.stringify(users));

            form.children[1].children[0].value = '';
            form.children[2].children[0].value = '';
            form.children[3].children[0].value = '';
            form.children[4].children[0].value = '';
        }
    }
}
const btn = document.getElementById('sign-up');

btn.addEventListener('click', signUp);
