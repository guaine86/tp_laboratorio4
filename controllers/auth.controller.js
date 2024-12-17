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
                alert: true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese un usuario y un password!!" ,
                alertIcon: "info",
                showConfirmationButton: true,
                timer: false,
                ruta: 'login'
            });
        }else{
            const busca = `SELECT * FROM usuarios WHERE usuario = '${usuario}';`;
            conexion.query(busca, async(err, resultados)=>{
                if(err){
                    throw err;
                }else if(resultados.length === 0 || !(await bcryptjs.compare(pass, resultados[0].pass))){
                    res.render('login', {
                        alert: true,
                        alertTitle: "Advertencia",
                        alertMessage: "Ingrese un usuario y un password validos!!" ,
                        alertIcon: "info",
                        showConfirmationButton: true,
                        timer: false,
                        ruta: 'login'
                    });
                }else{
                    const id = resultados[0].idusuarios;
                    const token = jwt.sign({id: id}, process.env.JWT_SECRETO, {
                        expiresIn: process.env.JWT_EXPIRA
                    })
                    console.log(`Usuario: ${usuario} - Token: ${token}`);

                    const cookieOptions = {
                        expires: new Date(Date.now() + process.env.JWT_COOKIE * 24 * 60 * 60 *1000),
                        httpOnly: true
                    }
                    res.cookie('jwt', token, cookieOptions)
                    res.render('login', {
                        alert: true,
                        alertTitle: "Conexion Exitosa!!",
                        alertMessage: `Bienvenido ${usuario}` ,
                        alertIcon: 'success',
                        showConfirmationButton: false,
                        timer: 800,
                        ruta:'consulta'
                    })
                }
            });
        }
    }catch (error){
        throw err;
    }
};
