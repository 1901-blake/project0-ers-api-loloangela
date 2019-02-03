async function login(event) {
  event.preventDefault(); // prevent default form submission
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const credentials = {
    username, // username: value of the variable
    password
  }
  console.log( JSON.stringify(credentials));
  const res = await fetch('http://localhost:3000/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
  if (res.status === 200) {
    window.location = 'manager.html';
  } else {
    console.log('failed to log in');
    document.getElementById('password').value = '';
    document.getElementById('error-message').innerText = 'failed to login';
  }
}