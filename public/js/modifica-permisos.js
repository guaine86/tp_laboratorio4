import {valida} from './class/valida.class.js'
const modifica = (()=>{
    "use strict"
    const dni = document.querySelector('#dni');
    const nombre = document.querySelector('#nombre');
    const formulario = document.querySelector('.formulario');
    
    dni.addEventListener('input', valida);
    nombre.addEventListener('input', valida);
    formulario.addEventListener('submit', (evento)=>{
        const datos = Object.fromEntries(
            new FormData(evento.target)
        )
        //console.log(datos)
        if(!datos.dni || !datos.rol){
            evento.preventDefault();
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Debe completar todos los campos!",
            });
        }else{
            return;
        }
    })
})();