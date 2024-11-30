const mysql = require('mysql2');

const conexion = mysql.createPool({
    host: 'localhost',
    database: 'tp_laboratorio4',
    user: 'root',
    password: 'root',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0
});

conexion.getConnection((err, db)=>{
    if(err){
        throw err;
    }else{
        console.log("Conexion exitosa a la BBDD!!");
        db.release();
    }
});

module.exports = conexion;