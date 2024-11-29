import '../css/normalize.css'
import '../css/styles.css'
import './class/valida.class.js'
import { ValidaCadena } from './class/valida.class.js';

const nombre = document.querySelector('#nombre');
const apellido = document.querySelector('#apellido');
const dni = document.querySelector('#dni');
const telefono = document.querySelector('#telefono');

nombre.addEventListener('input', valida);
apellido.addEventListener('input', valida);
dni.addEventListener('input', valida);
telefono.addEventListener('input', valida);

function valida(evento){
    const validaCadena = new ValidaCadena(evento.target.id, evento.target.value);
}




