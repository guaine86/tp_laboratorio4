const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const conexion = require('../server/bbdd.js');
const {promisify} = require('util');
const transporter = require ('../server/email.js');

exports.registrar = async(req,res) => {
    try {
        const datos = req.body;
        let {nombre, dni, email, usuario, pass} = datos;
        nombre = nombre.toLowerCase();
        email = email.toLowerCase();
        usuario = usuario.toLowerCase();
        let passHash = await bcryptjs.hash(pass, 8);
        const token = jwt.sign({email}, process.env.JWT_SECRETO, {expiresIn: '1h'});

        let idAuth;
        let idRol;
        if(typeof req.params.idAuth !== 'undefined' && typeof req.params.idRol !== 'undefined'){
            idAuth = req.params.idAuth;
            idRol = req.params.idRol;
        }
        
        let muestra;
        let modifica;

        const verificacionLink = `http://localhost:${process.env.PORT}/verificar/${token}/registro/usuario`;
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Verificacion de cuenta',
            html: `
                <h1 style="text-transform: capitalize;">Hola, ${nombre}</h1>
                <p>Gracias por registrarte!! Por favor, verifica tu cuenta haciendo click en el siguiente enlace:</p>
                <a href="${verificacionLink}">Verificar cuenta</a>
            `
        }
        

        const buscaAuth = `SELECT * FROM usuarios_autorizados WHERE dni = ${dni} AND baja = 0;`;
        conexion.query(buscaAuth,(err, resultados) => {
            if(err){
                throw err;
            }else if(resultados.length===0){
                return res.render('register',{
                    alert: true,
                    alertTitle: "Advertencia",
                    alertMessage: "Ud no esta autorizado para registrarse" ,
                    alertIcon: "info",
                    ruta: 'index'
                });
            }else{

                const busca = `SELECT * FROM usuarios WHERE (usuario = '${usuario}' OR email = '${email}') AND confirma = 1;`;
                conexion.query(busca, async (err, resultados) => {
                    if(err){
                        throw err;
                    }else if(resultados.length > 0){
                        muestra = 'No se puede registrar el mismo usuario o email!!';
                        res.render('register',{muestra});
                    }else{
                        await transporter.sendMail(mailOptions);
                        
                        const busca2 = `SELECT * FROM usuarios WHERE (usuario = '${usuario}' OR email = '${email}') AND confirma = 0;`;
                        conexion.query(busca2,(err, resultados)=>{
                            if(err){
                                throw err;
                            }else if(resultados.length >0){
                                if(resultados[0].usuario === usuario || resultados[0] === email){
                                    if(resultados[0].usuario === usuario){
                                        modifica = `UPDATE usuarios SET email = '${email}' WHERE usuario = '${usuario}';`;
                                    }else if(resultados[0].email === email){
                                        modifica = `UPDATE usuarios SET usuario = '${usuario}' WHERE email = '${email}'; `;
                                    }
                                    conexion.query(modifica, (err)=>{
                                        if(err){
                                            throw err;
                                        }else{
                                            muestra = `
                                            Usuario o Email modificado con exito!! 
                                            Verifique su cuenta a traves del correo enviado a su email para poder iniciar sesion
                                            `;
                                            res.render('login', {muestra});
                                        }
                                    });
                                }
                            }
                            else{
                                // const buscaAuth = `SELECT idusuarios_autorizados FROM usuarios_autorizados WHERE dni ='${dni}';`;
                                // const buscaAuth = `SELECT ua.idusuarios_autorizados, ra.ROL_idrol FROM usuarios_autorizados as ua INNER JOIN roles_autorizados as ra INNER JOIN usuarios as u WHERE ua.idusuarios_autorizados = ra.AUTH_idusuarios_autorizados AND ua.dni = '${dni}' AND u.usuario = '${usuario}';`
                                const buscaAuth = `SELECT ua.idusuarios_autorizados, ra.ROL_idrol FROM usuarios_autorizados as ua INNER JOIN roles_autorizados as ra INNER JOIN usuarios as u WHERE ua.idusuarios_autorizados = ra.AUTH_idusuarios_autorizados AND ua.dni = '${dni}' AND ra.confirma = 0 LIMIT 1;`
                                
                                conexion.query(buscaAuth, async(err, resultado)=>{
                                    if(err){
                                        return res.render('register',{
                                            alert: true,
                                            alertTitle: "Advertencia",
                                            alertMessage: "Ingreso algun dato invalido" ,
                                            alertIcon: "info",
                                            ruta: 'index'
                                        });
                                        // throw err;   
                                    }else{
                                        console.log(resultado);
                                        if(resultado.length > 0 && (typeof req.params.idAuth === 'undefined' && typeof req.params.idRol === 'undefined')){
                                            idAuth = resultado[0].idusuarios_autorizados;
                                            idRol = resultado[0].ROL_idrol;
                                        }

                                        const cargaNombre = `UPDATE usuarios_autorizados SET nombre_completo = '${nombre}' WHERE idusuarios_autorizados = ${idAuth};`;
                                        conexion.query(cargaNombre,(err,resultado)=>{
                                            if(err){
                                                throw err;
                                            }
                                        })

                                        const registra = `INSERT INTO usuarios (usuario, nombre, email, pass, AUTH_idusuarios_autorizados, ROL_idrol) VALUES ('${usuario}', '${nombre}', '${email}', '${passHash}', ${idAuth}, ${idRol});`;
                                        conexion.query(registra, (err) => {
                                            if(err){
                                                throw err;
                                            }else{
                                                muestra = 'Usuario ingresado con exito!! Verifique su cuenta a traves del correo enviado a su email para poder iniciar sesion';
                                                res.render('login', {muestra});
                                            }
                                        });
                                    }
                                });
                            }      
                        });                  
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
            const busca = `SELECT u.idusuarios, u.usuario, u.nombre, u.email, u.pass FROM usuarios as u INNER JOIN usuarios_autorizados as ua WHERE u.usuario = '${usuario}' AND u.confirma = 1 AND u.AUTH_idusuarios_autorizados = ua.idusuarios_autorizados AND ua.baja = 0 AND u.baja_rol = 0;`;
            conexion.query(busca, async(err, resultados)=>{
                if(err){
                    throw err;
                }else if(resultados.length === 0 || !(await bcryptjs.compare(pass, resultados[0].pass))){
                    res.render('login', {
                        alert: true,
                        alertTitle: "Advertencia",
                        alertMessage: "Ingrese un usuario y un password validos!!" ,
                        alertIcon: "info",
                        ruta: 'login'
                    });
                }else{
                    const id = resultados[0].idusuarios;
                    const token = jwt.sign({id: id}, process.env.JWT_SECRETO, {
                        expiresIn: process.env.JWT_EXPIRA
                    })

                    const cookieOptions = {
                        expires: new Date(Date.now() + process.env.JWT_COOKIE * 24 * 60 * 60 *1000),
                        httpOnly: true,
                    }
                    res.cookie('jwt', token, cookieOptions)
                    res.render('login', {
                        alert: true,
                        alertTitle: "Conexion Exitosa!!",
                        alertMessage: `Bienvenido ${usuario}` ,
                        alertIcon: 'success',
                        ruta:'consulta'
                    })
                }
            });
        }
    }catch (error){
        throw err;
    }
};

exports.autenticado = async(req, res, next) =>{
    let token = req.cookies.jwt
    if(token){
        try {
            const decodificar = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO);
            // const consulta = `SELECT * FROM usuarios WHERE idusuarios = ${decodificar.id};`;
            const consulta = `SELECT u.idusuarios, u.usuario, u.nombre, u.email, u.pass, u.confirma, u.AUTH_idusuarios_autorizados, u.ROL_idrol, r.rol ,u.baja_rol FROM usuarios as u INNER JOIN rol as r WHERE u.idusuarios = ${decodificar.id} AND u.ROL_idrol = r.idrol;`
            conexion.query(consulta, (err, resultado) => {
                if(err){
                    throw err;
                }
                if(!resultado){return next()}
                req.usuario = resultado[0];
                return next()
            });
        } catch (error) {
            res.render('login');
            // console.log(error)
        }
    }else{
        res.render('login');
    }
};

exports.logout = (req, res) => {
    res.clearCookie('jwt');
    return res.render('index')
};