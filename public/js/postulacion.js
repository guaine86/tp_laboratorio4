import {valida} from './class/valida.class.js'
const postula = (()=>{
    "use strict"
    const nombre = document.querySelector('#nombre');
    const input = document.querySelector('#cv1');
    const formulario = document.querySelector('.formulario');
    const label = input.nextElementSibling;
    let labelValue = label.innerHTML;
    
    nombre.addEventListener('input', valida);
    input.addEventListener('change', (evento) => {
        let fileName = '';
        if(evento.target.value){
            fileName = evento.target.value.split('\\').pop();
        }
        
        if(fileName){
            label.querySelector('span').innerHTML = ' ' + fileName; 
        }else{
            label.innerHTML = labelValue;
        }
    });
    
    formulario.addEventListener('submit', (evento)=>{
        const datos = Object.fromEntries(
            new FormData(evento.target)
        )
        //console.log(datos)
        if(!datos.nombre || !datos.curriculum ){
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