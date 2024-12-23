import {valida, mensaje} from './class/valida.class.js'
const contacto = (() => {
    "use strict"
    const nombre = document.querySelector('#nombre');
    const empresa = document.querySelector('#empresa');
    const email = document.querySelector('#email');
    const formulario = document.querySelector('.formulario');

    nombre.addEventListener('input', valida);
    empresa.addEventListener('input', valida);
    email.addEventListener('input', valida);
    formulario.addEventListener('submit', (evento)=>{
        const datos = Object.fromEntries(
            new FormData(evento.target)
        )
        //console.log(datos)
        if(!datos.nombre || !datos.email || !datos.empresa || !datos.puesto || !datos.mensaje){
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