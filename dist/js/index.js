const nombre = document.querySelector('#nombre');
const apellido = document.querySelector('#apellido');
const dni = document.querySelector('#dni');
const telefono = document.querySelector('#telefono');
let patron;

nombre.addEventListener('input', validaChar);
apellido.addEventListener('input', validaChar);
dni.addEventListener('input', validaNum);
telefono.addEventListener('input',validaTel )

function validaChar(evento){
    patron = new RegExp(/^[a-zA-Z\s]*$/);
    cadena = evento.target.value;
    if(!patron.test(cadena)){
        alert('No es un caracter alfabetico');
        return
    }
}

function validaNum(evento){
    patron = new RegExp(/^[0-9]*(\.[0-9]*)?$/)
    campoDni = evento.target.value;
    if(!patron.test(campoDni)){
        alert('Solo admite numeros para el DNI!!');
        return
    }
}

function validaTel(evento){
    patron = new RegExp(/^\d*[- ]*\d*$/);
    campoTel = evento.target.value;
    if(!patron.test(campoTel)){
        alert('Ingrese telefono con el siguiente fomato 11 5555-6666');
        return
    }
}