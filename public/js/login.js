//import {usuario} from './usuario.js';
import {mensaje, mostrarPass} from './class/valida.class.js'
const login = (() => {
    'use strict'
    const usuario = document.querySelector('#usuario');
    const pass = document.querySelector('#pass');
    const check = document.querySelector('#ver');
        
    usuario.addEventListener('input', mensaje);
    pass.addEventListener('input', mensaje);
    check.addEventListener('click', evento => mostrarPass(evento, pass));
})();
