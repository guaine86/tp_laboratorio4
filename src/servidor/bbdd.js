const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: 'localhost',
    database: 'tp_laboratorio4',
    user: 'root',
    password: 'root'
});

conexion.connect((err)=>{
    if(err){
        throw err;
    }else{
        console.log("Conexion exitosa a la BBDD!!");
    }
});

module.exports = conexion;