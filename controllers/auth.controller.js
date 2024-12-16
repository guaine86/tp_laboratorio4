const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const conexion = require('../server/bbdd.js');
const {promisify} = require('util');

exports.registrar = async(req,res) => {
    try {
        const datos = req.body;
        let {nombre, email, usuario, pass} = datos;
        nombre = nombre.toLowerCase();
        email = email.toLowerCase();
        usuario = usuario.toLowerCase();const Swal = require('sweetalert2')
        let passHash = await bcryptjs.hash(pass, 8);
        let muestra;
        
        const busca = `SELECT * FROM usuarios WHERE usuario = '${usuario}' OR email = '${email}';`;
        conexion.query(busca, (err, resultados) => {
            if(err){
                throw err;
            }else if(resultados.length > 0){
                muestra = 'No se puede registrar el mismo usuario o email!!';
                res.render('register',{muestra});
            }else{
                const registra = `INSERT INTO usuarios (usuario, nombre, email, pass) VALUES ('${usuario}', '${nombre}', '${email}', '${passHash}');`;
                conexion.query(registra, (err) => {
                    if(err){
                        throw err;
                    }else{
                        muestra = 'Usuario ingresado con exito!!';
                        res.render('login', {muestra});
                    }
                });
            }
        });
    } catch (error) {
        throw error;
    }
};

exports.ingresar = async(req, res) => {
    try{
        const datos = req.body;
        let {usuario, pass} = datos;
        // console.log(`${usuario} ${pass}`);

        if(!usuario || !pass){
            res.render('login', {
                alert:true, 
            });
        }

    }catch (error){
        throw err;
    }
};
