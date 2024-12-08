//import '../css/normalize.css'
//import '../css/styles.css'
//import './class/valida.class.js'
import { ValidaCadena } from './class/valida.class.js';
const miModulo = (()=>{
    'use strict'
    const nombre = document.querySelector('#nombre');
    const apellido = document.querySelector('#apellido');
    const dni = document.querySelector('#dni');
    const telefono = document.querySelector('#telefono');
    const direccion = document.querySelector('#domicilio');
    
    nombre.addEventListener('input', valida);
    apellido.addEventListener('input', valida);
    dni.addEventListener('input', valida);
    telefono.addEventListener('input', valida);
    direccion.addEventListener('input', mensaje);
    
    function valida(evento){
        const validaCadena = new ValidaCadena(evento.target.id, evento.target.value);
        mensaje(evento);
    }
    
    function mensaje(evento){
        const campo = evento.target;
        const validaCampo = campo.validity;
    
        if(validaCampo.tooShort){
            campo.setCustomValidity(`El campo ${evento.target.id.toUpperCase()} requiere ${evento.target.minLength} caracteres como minimo`);
        }else{
            campo.setCustomValidity("");
        }
        campo.reportValidity();
    }
})();




