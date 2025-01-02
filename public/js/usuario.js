import {valida, mensaje, mostrarPass} from './class/valida.class.js'
const usuario = (function(){
    'use strict'
    const nombre = document.querySelector('#nombre');
    const dni = document.querySelector('#dni');
    const usuario = document.querySelector('#usuario');
    const pass = document.querySelector('#pass');
    const check = document.querySelector('#ver');
    const formulario = document.querySelector('.formulario');
    
    nombre.addEventListener('input', valida);
    dni.addEventListener('input', valida);
    usuario.addEventListener('input', mensaje);
    pass.addEventListener('input', mensaje);
    check.addEventListener('click', evento => mostrarPass(evento, pass));
    formulario.addEventListener('submit', (evento)=>{
        const datos = Object.fromEntries(
            new FormData(evento.target)
        )
        //console.log(datos)
        if(!datos.nombre || !datos.dni || !datos.email || !datos.usuario || !datos.pass ){
            evento.preventDefault();
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Debe completar todos los campos!",
            });
        }else{
            return
        }
    });
})();