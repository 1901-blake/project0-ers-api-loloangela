//import { response } from '../../../../../AppData/Local/Microsoft/TypeScript/3.2/node_modules/@types/express';

async function login(event) {
	event.preventDefault(); // prevent default form submission
	const username = document.getElementById('inputUsername').value;
	const password = document.getElementById('inputPassword').value;
	const showResult = document.getElementById('error-message');
	const credentials = {
		username, // username: value of the variable
		password
	};

	// Connect UI to api (supposedly)
	console.log(credentials);
	const res = await fetch('http://localhost:3003/login', {
		method: 'POST',
		body: JSON.stringify(credentials),
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: 'include'
	});
	if (res.status === 200) {
		const data = await res.json();
		showResult.innerHTML = JSON.stringify(data);
	} else {
		console.log('failed to log in');
		document.getElementById('password').innerText = ' ';
		document.getElementById('error-message').innerText = 'failed to login';
	}
}
