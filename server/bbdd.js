const mysql = require('mysql2');
// const mysql = require('mysql2/promise')
// require('dotenv').config({path: './env/.env'});

const conexion = mysql.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 3306,
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