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

const perfil = JSON.parse(localStorage.getItem('user'));

$alcaldia.value = perfil.alcaldia;
$alergia.value = perfil.tipo_alergia;
$apellidom.value = perfil.primer_apellido;
$apellidop.value = perfil.segundo_apellido;
$calle.value = perfil.calle;
$civil.value = perfil.estado_civil;
$colonia.value = perfil.colonia;
$curp.value = perfil.curp;
$nombre.value = perfil.nombre;
$fechaNacimiento.value = perfil.fecha_nacimiento.split('-').reverse().join('/');
$nss.value = perfil.nss;
$numeroExt.value = perfil.num_ext;
$numeroInt.value = perfil.num_int;
$ocupacion.value = perfil.ocupacion;
$sangre.value = perfil.tipo_sangre;
$genero.value = perfil.genero === 'm' ? 'Masculino' : 'Femenino';