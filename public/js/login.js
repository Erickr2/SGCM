const API = 'http://localhost:5000';

const $user = document.getElementById('user');
const $password = document.getElementById('password');
const $btnLogin = document.getElementById('btn-login');

$btnLogin.onclick = async e => {
	e.preventDefault();

	if ($password.value === '' || $user.value === '') {
		alert('Ingresa usuario y contraseña, para poder continuar');
		return;
	}

	try {
		const body = {
			user: $user.value,
			password: $password.value,
		};

		const result = await request(`${API}/iniciar-sesion`, 'POST', body);

		if (result.validacion) {
			const result = await request(`${API}/mi-perfil`, 'POST', {
				user: $user.value,
			});
			localStorage.setItem('user', JSON.stringify(result));
			window.location.href = './perfil.html';
		} else {
			alert('El usuario o contraseña son incorrectos, intenta de nuevo');
		}
	} catch (error) {
		console.log(error);
	}
};

const request = async (url = '', method = 'GET', data = {}) => {
	const response = await fetch(url, {
		method,
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});
	return response.json();
};
