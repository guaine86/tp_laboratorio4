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

        let muestra;
        let modifica;

        const verificacionLink = `http://localhost:${process.env.PORT}/verificar/${token}/registro/usuario`;
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Verificacion de cuenta',
            html: `
                <h1>Hola, ${nombre}</h1>
                <p>Gracias por registrarte!! Por favor, verifica tu cuenta haciendo click en el siguiente enlace:</p>
                <a href="${verificacionLink}">Verificar cuenta</a>
            `
        }
        

        const buscaAuth = `SELECT * FROM usuarios_autorizados WHERE dni = ${dni};`;
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
                                const registra = `INSERT INTO usuarios (usuario, nombre, email, pass) VALUES ('${usuario}', '${nombre}', '${email}', '${passHash}');`;
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
            const busca = `SELECT * FROM usuarios WHERE usuario = '${usuario}' AND confirma = 1;`;
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
            const consulta = `SELECT * FROM usuarios WHERE idusuarios = ${decodificar.id};`;
            conexion.query(consulta, (err, resultado) => {
                if(err){
                    throw err;
                }
                if(!resultado){return next()}
                req.usuario = resultado[0];
                return next()
            });
        } catch (error) {
            console.log(error)
        }
    }else{
        res.render('login');
    }
};

exports.logout = (req, res) => {
    res.clearCookie('jwt');
    return res.render('index')
};