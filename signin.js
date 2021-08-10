function signIn(event) {
  event.preventDefault();
  const form = document.getElementById('form-signin');
  const email = form.children[1].children[0].value;
  const password = form.children[2].children[0].value;
  const emailCheck = /[a-z0-9\.\_\%\+\-]+@[a-z0-9\.\-]+\.[a-z]{2,4}/g;
  const passwordCheck = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\!\@\#\$\%\^\&\*\(\)\-\_\=\+]).{6,16}$/g;

  let storage = {
    email: false,
    password: false
  }

  let validLog = false;

  if (window.localStorage.getItem('users') === null) {
    window.localStorage.setItem('users', JSON.stringify([]));
  }

  let users = JSON.parse(localStorage.getItem('users'));
  if (password.match(passwordCheck) !== null) {
    storage.pass = true; 
  }

  if (email.match(emailCheck)) {
    storage.email = true;
  }

  if (storage.pass === true && storage.email === true){
    users.forEach((userObj) => {
      if (userObj.email === email) {
        if (password === userObj.password) {
          validLog = true;
          window.location = 'homepage.html';
        }
      }
    });

    if (validLog === false) {
      form.children[1].children[0].value = '';
      form.children[2].children[0].value = '';
    }
  }
}
const btn = document.getElementById('sign-in');

btn.addEventListener('click', signIn);
