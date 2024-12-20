import { valida, mensaje } from './class/valida.class.js';
const miModulo = (()=>{
    'use strict'
    const nombre = document.querySelector('#nombre');
    const apellido = document.querySelector('#apellido');
    const dni = document.querySelector('#dni');
    const telefono = document.querySelector('#telefono');
    const direccion = document.querySelector('#domicilio');
    const formulario = document.querySelector('.formulario');
    
    nombre.addEventListener('input', valida);
    apellido.addEventListener('input', valida);
    dni.addEventListener('input', valida);
    telefono.addEventListener('input', valida);
    direccion.addEventListener('input', mensaje);
    formulario.addEventListener('submit', (evento)=>{
        const datos = Object.fromEntries(
            new FormData(evento.target)
        )
        //console.log(datos)
        if(!datos.nombre || !datos.apellido || !datos.dni || !datos.fecha_nac || !datos.telefono || !datos.email || !datos.domicilio || !datos.carrera){
            evento.preventDefault();
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Debe completar todos los campos!",
            });
        }else{
            return
        }
    })
})();




