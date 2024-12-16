import {valida, mensaje, mostrarPass} from './class/valida.class.js'
const usuario = (function(){
    'use strict'
    const nombre = document.querySelector('#nombre');
    const usuario = document.querySelector('#usuario');
    const pass = document.querySelector('#pass');
    const check = document.querySelector('#ver');
    
    nombre.addEventListener('input', valida);
    usuario.addEventListener('input', mensaje);
    pass.addEventListener('input', mensaje);
    check.addEventListener('click', evento => mostrarPass(evento, pass));
})();