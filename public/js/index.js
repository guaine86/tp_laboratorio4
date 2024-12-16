import { valida, mensaje } from './class/valida.class.js';
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
})();




