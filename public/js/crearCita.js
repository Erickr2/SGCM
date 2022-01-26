const API = 'http://localhost:5000';

const request = async (url = '', method = 'GET', data = {}) => {
	const response = await fetch(url, {
		method,
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});
	return response.json();
};

const $consultorio = document.getElementById('consultorio');
const $medico = document.getElementById('medico');
const $fecha = document.getElementById('fecha');
const $hora = document.getElementById('hora');
const $btnCrearCita = document.getElementById('btn-crear-cita');
const $btnActualizarCita = document.getElementById('btn-crear-actualizar');
const $btnVerCitas = document.getElementById('ver-citas');
const $divCitas = document.getElementById('citas');

const perfil = JSON.parse(localStorage.getItem('user'));
const citas = JSON.parse(localStorage.getItem('citas'));
const citaActual = JSON.parse(localStorage.getItem('citaActual'));

$btnCrearCita.onclick = async e => {
	e.preventDefault();

	if (
		$consultorio.value === '' ||
		$medico.value === '' ||
		$fecha.value === '' ||
		$hora.value === ''
	) {
		alert('Todos los campos son obligatorios');
		return;
	}

	try {
		const body = {
			fechacita: $fecha.value,
			horacita: $hora.value,
			consultorio: $consultorio.value,
			medico: 1 /*$medico.value*/,
			mnss: perfil.mnss_paciente,
		};

		const response = await request(`${API}/crear-cita`, 'POST', body);

		if (response.estatus) {
			alert('Cita creada con exito');
			location.reload();
		} else {
			alert('Ocurrió un error, intenta mas tarde');
		}
	} catch (error) {
		console.error(error);
	}
};

$btnVerCitas.onclick = async e => {
	try {
		const body = { user: perfil.user };
		const response = await request(`${API}/consultar-cita`, 'POST', body);
		localStorage.setItem('citas', JSON.stringify(response));
		let citasTemplate = renderCitas(response);

		$btnVerCitas.setAttribute('class', 'd-none');
		$divCitas.setAttribute('class', 'd-block');

		$divCitas.innerHTML = citasTemplate;
	} catch (error) {
		console.error(error);
	}
};

$btnActualizarCita.onclick = async e => {
	e.preventDefault();

	if ($fecha.value === '' || $hora.value === '') {
		alert('Todos los campos son obligatorios');
		return;
	}
	try {
		const body = {
			id_cita: citaActual.id_dcita,
			fechacita: $fecha.value,
			horacita: $hora.value,
		};

		const response = await request(`${API}/actualizar-cita`, 'PUT', body);

		if (response.status) {
			alert('Cita actualizada con exito');
			location.reload();
		} else {
			alert('Ocurrió un error, intenta mas tarde');
		}
	} catch (error) {
		console.error(error);
	}
};

const renderCitas = citas => {
	let citasTemplate = '';
	citas.forEach(cita => {
		let actCita = { ...cita };
		citasTemplate += `
			<div class="cardM p-2">
				<div class="card">
					<div class="card-body">
						<p>Consulta General</p>
						<p>${formateDate(cita.fecha_cita)} ${cita.hora_cita}</p>
						<p>Consultorio: ${cita.num_consultorio}, Doctor: ${cita.medico}</p>
					</div>
					<div class="buttons p-3">
						<button type="button" class="btn btn-danger" onclick="eliminarCita(${
							cita.id_dcita
						})">
							Cancelar
						</button>
						<button type="button" class="btn btn-warning" onclick="actualizarCita(${
							cita.id_dcita
						})">
							Editar
						</button>
					</div>
				</div>
			</div>
		`;
	});
	return citasTemplate;
};

const formateDate = string => string.split('-').reverse().join('/');

const eliminarCita = async id => {
	try {
		const body = { id_cita: id };
		const response = await request(`${API}/eliminar-cita`, 'DELETE', body);
		if (response.status) {
			alert('Cita eliminada con exito');
			location.reload();
		}
	} catch (error) {
		console.error(error);
		alert('Ocurrió un error, intenta mas tarde');
	}
};

const actualizarCita = async id_dcita => {
	const citaActual = citas.find(cita => cita.id_dcita === id_dcita);

	localStorage.setItem('citaActual', JSON.stringify(citaActual));

	$btnCrearCita.setAttribute('class', 'd-none');
	$btnActualizarCita.setAttribute('class', 'btn btn-success d-block');
	$consultorio.setAttribute('disabled', true);
	$medico.setAttribute('disabled', true);

	$consultorio.value = citaActual.num_consultorio;
	$medico.value = citaActual.medico;
	$fecha.value = citaActual.fecha_cita;
	$hora.value = citaActual.hora_cita;
};
