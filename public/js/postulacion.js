import {valida} from './class/valida.class.js'
const postula = (()=>{
    "use strict"
    const nombre = document.querySelector('#nombre');
    const input = document.querySelector('#cv1');
    const formulario = document.querySelector('.formulario');
    const label = input.nextElementSibling;
    let labelValue = label.innerHTML;

    const allowedTypes = [
        "image/jpeg", 
        "image/png", 
        "application/msword", 
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document", 
        "application/vnd.oasis.opendocument.text", 
        "application/pdf"
    ];

    function validFileType(file) {
        return allowedTypes.includes(file.type);
    }

    nombre.addEventListener('input', valida);
    input.addEventListener('change', (evento) => {
        console.log(validFileType(evento.target.files[0]));
        const file = evento.target.files[0];
        const size = evento.target.files[0].size;
        let fileName = '';
          
        if(evento.target.value){
            fileName = evento.target.value.split('\\').pop();
        }
        
        if(fileName){
            label.querySelector('span').innerHTML = ' ' + fileName; 
        }else{
            label.innerHTML = labelValue;
        }
        
        if(size > 5*1024*1024){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "El tamaño del archivo es mayor del permitido!",
            });
        }
        
        if(!validFileType(file)){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Este tipo de archivo NO esta permitido!",
            }); 
        }    
    });
    
    formulario.addEventListener('submit', (evento)=>{
        const datos = Object.fromEntries(
            new FormData(evento.target)
        )
        let mensaje;

        if(!datos.nombre || !datos.curriculum.name ){
            evento.preventDefault();
            mensaje = "Debe completar todos los campos!";
            // Swal.fire({
            //     icon: "error",
            //     title: "Oops...",
            //     text: "Debe completar todos los campos!",
            // });
        }else if(datos.curriculum.size > 5*1024*1024){
            evento.preventDefault();
            mensaje = "El tamaño del archivo es mayor del permitido!"
            // Swal.fire({
            //     icon: "error",
            //     title: "Oops...",
            //     text: "El tamaño del archivo es mayor del permitido!",
            // });
        }else if(!validFileType(datos.curriculum)){
            evento.preventDefault();
            mensaje = "Este tipo de archivo NO esta permitido!!";
            
        }else{
            return
        }

        return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${mensaje}`,
        });
    })
})();