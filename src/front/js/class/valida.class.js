export class ValidaCadena{
    constructor(campo, valor){
        this.campo = campo;
        this.valor = valor;
        this.patron = this.asignaPatron();
        this.mensaje;
    };
    asignaPatron(){
        if (this.campo  === 'nombre' || this.campo === 'apellido'){
            this.patron = new RegExp(/^[a-zA-Z\s]*$/);
            this.mensaje = 'Este campo solo admite caracteres alfabeticos!!';
        }else if(this.campo === 'dni'){
            this.patron = new RegExp(/^[0-9]*(\.[0-9]*)*$/);
            this.mensaje = 'Solo se admiten numeros para ingresar DNI!!';
        }else if(this.campo === 'telefono'){
            this.patron = new RegExp(/^\d*[-|\s]*\d*[-|\s]*\d*$/);
            this.mensaje = 'Ingrese telefono con el siguiente fomato 11 5555-6666';
        }
        this.valida();
        return
    }
    valida(){
        if(!this.patron.test(this.campo)){
            alert(this.mensaje);
            return
        }
    }
}