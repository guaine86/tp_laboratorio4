const mysql = require('mysql2');

// export const formulario = (()=>{
//     "use strict"

module.exports =  

class Formulario{
        constructor(objConfig){
            this.config = objConfig;
        }
        agregaMensaje(mensaje){
            this.mensaje=mensaje;
        }
        agregaRegistro({nombre, apellido, dni, fecha_nac, telefono, email, domicilio, mensaje}){
           const conexion = mysql.createConnection(this.config);
           conexion.connect((err)=>{
             try{
                   if(err){
                       throw err;
                   }else{
                       const busca = `SELECT * FROM alumnos WHERE dni = ${dni};`
                       conexion.query(busca, (err, rows)=>{
                           if(err){
                               throw err;
                           }else if(rows.length>0){
                               muestra = "No se puede volver a cargar el mismo alumno!";
                               this.agregaMensaje("No se puede volver a cargar el mismo alumno!!!")
                               conexion.end();
                           }else{
                               const inserta = `INSERT INTO alumnos (nombre, apellido, dni, fecha_nac, telefono, email, domicilio, mensaje) VALUES ('${nombre}', '${apellido}','${dni}','${fecha_nac}','${telefono}','${email}','${domicilio}','${mensaje}');`
                               conexion.query(inserta, (err)=>{
                                   if(err){
                                       throw err;
                                   }else{
                                       muestra = "Alumno Ingresado con Exito!";
                                       //console.log(muestra);
                                       //conexion.end();
                                   }
                               });
                           }
                       })
                       
                   }
               }catch(err){
                   console.warn("Formulario.agregarRegistro --ERROR: ", err)
               }
           })
           return this.mensaje;
       }
   }
// })();  

// const configServer = {
//     host:"localhost",
//     database: "tp_laboratorio4",
//     user: "root",
//     password: "root"
// };

// const registro = {
//     nombre : "Edward Wayne",
//     apellido: "Cruz",
//     dni: "92783036",
//     fecha_nac: "1986-03-05",
//     telefono: "11 5977-3824",
//     email: "ewcruz@yahoo.com.ar",
//     domicilio: "av san martin 1860",
//     mensaje: "probando"
// };

// const conexion = new Formulario(configServer);
// console.log(conexion.agregaRegistro(registro));
// //conexion.mensaje="probando"; 
// //console.log(conexion.mensaje);


