const API = 'http://localhost:5000';

const request = async (url = '', method = 'GET', data = {}) => {
	const response = await fetch(url, {
		method,
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});
	return response.json();
};

const $alcaldia = document.getElementById('alcaldia');
const $alergia = document.getElementById('alergia');
const $apellidom = document.getElementById('apellidom');
const $apellidop = document.getElementById('apellidop');
const $calle = document.getElementById('calle');
const $civil = document.getElementById('estado-civil');
const $colonia = document.getElementById('colonia');
const $contraseña = document.getElementById('contraseña');
const $correo = document.getElementById('correo_electronico');
const $cp = document.getElementById('CP');
const $curp = document.getElementById('CURP');
const $fechaNacimiento = document.getElementById('fecha_nacimiento');
const $nombre = document.getElementById('nombre');
const $nss = document.getElementById('NSS');
const $numeroExt = document.getElementById('numero_ext');
const $numeroInt = document.getElementById('numero_int');
const $ocupacion = document.getElementById('ocupacion');
const $sangre = document.getElementById('tipo-sangre');
const $telefono = document.getElementById('telefono');
const $genero = document.getElementById('genero');
const $btnCrearCuenta = document.getElementById('btn-crear-cuenta');

$btnCrearCuenta.onclick = async e => {
	e.preventDefault();

	if (
		$alcaldia.value === '' ||
		$alergia.value === '' ||
		$apellidom.value === '' ||
		$apellidop.value === '' ||
		$calle.value === '' ||
		$civil.value === '' ||
		$colonia.value === '' ||
		$contraseña.value === '' ||
		$correo.value === '' ||
		$cp.value === '' ||
		$curp.value === '' ||
		$fechaNacimiento.value === '' ||
		$nombre.value === '' ||
		$nss.value === '' ||
		$numeroExt.value === '' ||
		$numeroInt.value === '' ||
		$ocupacion.value === '' ||
		$sangre.value === '' ||
		$telefono.value === '' ||
		$genero === ''
	) {
		alert('Faltan datos por llenar');
		return;
	}

	try {
		const body = {
			alcaldia: $alcaldia.value,
			calle: $calle.value,
			colonia: $colonia.value,
			curp: $curp.value,
			fecha_alta: new Date().toISOString().split('T')[0],
			fecha_nacimiento: $fechaNacimiento.value,
			id_alergia: $alergia.value,
			id_estadoCivil: $civil.value,
			id_genero: $genero.value === 'Hombre' ? 'M' : 'F',
			id_ocupacion: $ocupacion.value,
			id_tipo_sangre: $sangre.value,
			nombre: $nombre.value,
			nss: $nss.value,
			numero_ext: $numeroExt.value,
			numero_int: $numeroInt.value,
			password: $contraseña.value,
			primer_apellido: $apellidop.value,
			segundo_apellido: $apellidom.value,
			user: $correo.value,
		};

		console.log(body);

		const result = await request(`${API}/registro`, 'POST', body);

		if (result.msg) {
			window.location.href = './perfil.html';
			localStorage.setItem('usuario', $nss.value);
		}
	} catch (error) {
		console.error(error);
	}
};
