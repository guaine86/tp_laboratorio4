import '../css/normalize.css'
import '../css/bootstrap.min.css'
import '../css/styles.css'
import './class/valida.class.js'
import { ValidaCadena } from './class/valida.class.js';

const nombre = document.querySelector('#nombre');
const apellido = document.querySelector('#apellido');
const dni = document.querySelector('#dni');

nombre.addEventListener('input', valida);
apellido.addEventListener('input', valida);
dni.addEventListener('input', valida);

function valida(evento){
    const validaCadena = new ValidaCadena(evento.target.id, evento.target.value);
}




