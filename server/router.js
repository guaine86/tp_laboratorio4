const path = require('path');
const express = require('express');
const router = express.Router();
const conexion = require('./bbdd.js');
const crud = require('./crud.js');
const autenticacion = require('../controllers/auth.controller.js');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const transporter = require('./email.js');

// Configurar Nodemailer
// const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth:{
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//     },
// });

// Ruta Principal
router.get('/',(req,res)=>{
    const carreras = `SELECT * FROM carrera;`;
    conexion.query(carreras,(err, resultados)=>{
        if(err){
            throw err;
        }else{
            res.render('index',{rows: resultados});
        }
    });
});

router.get('/index',(req,res)=>{
    const carreras = `SELECT * FROM carrera;`;
    conexion.query(carreras,(err, resultados)=>{
        if(err){
            throw err;
        }else{
            res.render('index',{rows: resultados});
        }
    });
});

// Ruta Consultas
router.get('/consulta', autenticacion.autenticado,(req,res)=>{
    let lista_carreras = [];

    const carreras = `SELECT * FROM carrera;`;
    conexion.query(carreras, (err,resultados)=>{
        if(err){
            throw err;
        }else{
            lista_carreras = resultados;
        }
    });
    
    const consulta = 'SELECT a.idalumnos ,a.nombre, a.apellido, a.dni, a.fecha_nac, a.telefono, a.email, a.domicilio, c.nomenclatura as carrera, a.observaciones, ac.egresado FROM alumnos as a INNER JOIN alumno_cursa_carrera as ac INNER JOIN carrera as c WHERE a.idalumnos = ac.ALUMNOS_idalumnos AND ac.CARRERA_idcarrera = c.idcarrera AND ac.confirma = 1 AND ac.muestra = 1;';
    conexion.query(consulta, (err, registros)=>{
        if(err){
            throw err;
        }else{
            res.render('consulta',{resultados: registros, rows: lista_carreras, usuario: req.usuario});
        }
    });
});

router.get('/consulta/:ordena', autenticacion.autenticado,(req,res)=>{
    const ordena = req.params.ordena;
    let lista_carreras = [];

    const carreras = `SELECT * FROM carrera;`;
    conexion.query(carreras, (err,resultados)=>{
        if(err){
            throw err;
        }else{
            lista_carreras = resultados;
        }
    });
    

    const orderBy = `SELECT a.idalumnos ,a.nombre, a.apellido, a.dni, a.fecha_nac, a.telefono, a.email, a.domicilio, c.nomenclatura as carrera, a.observaciones, ac.egresado FROM alumnos as a INNER JOIN alumno_cursa_carrera as ac INNER JOIN carrera as c WHERE a.idalumnos = ac.ALUMNOS_idalumnos AND ac.CARRERA_idcarrera = c.idcarrera AND ac.confirma = 1 ORDER BY ${ordena};`;
    conexion.query(orderBy,(err, registros)=>{
        if(err){
            throw err;
        }else{
            res.render('consulta',{resultados: registros, rows: lista_carreras, usuario: req.usuario});
        }
    });
});

router.post('/filtra', autenticacion.autenticado, (req,res)=>{
    const datos = req.body;
    const {carrera: id_carrera, egresado} = datos;
   
    let lista_carreras = [];
    let consulta;

    const carreras = `SELECT * FROM carrera;`;
    conexion.query(carreras, (err,resultados)=>{
        if(err){
            throw err;
        }else{
            lista_carreras = resultados;
        }
    });

    if(id_carrera === 'todas' || egresado === 'todas'){
        if(id_carrera !== 'todas'){
            consulta = `SELECT a.idalumnos ,a.nombre, a.apellido, a.dni, a.fecha_nac, a.telefono, a.email, a.domicilio, c.nomenclatura as carrera, a.observaciones, ac.egresado FROM alumnos as a INNER JOIN alumno_cursa_carrera as ac INNER JOIN carrera as c WHERE a.idalumnos = ac.ALUMNOS_idalumnos AND ac.CARRERA_idcarrera = c.idcarrera AND ac.confirma = 1 AND ac.CARRERA_idcarrera = ${id_carrera};`; 
        }else if(egresado !== 'todas'){
            consulta = `SELECT a.idalumnos ,a.nombre, a.apellido, a.dni, a.fecha_nac, a.telefono, a.email, a.domicilio, c.nomenclatura as carrera, a.observaciones, ac.egresado FROM alumnos as a INNER JOIN alumno_cursa_carrera as ac INNER JOIN carrera as c WHERE a.idalumnos = ac.ALUMNOS_idalumnos AND ac.CARRERA_idcarrera = c.idcarrera AND ac.confirma = 1 AND ac.egresado = ${egresado};`;
        }else{
            consulta = 'SELECT a.idalumnos ,a.nombre, a.apellido, a.dni, a.fecha_nac, a.telefono, a.email, a.domicilio, c.nomenclatura as carrera, a.observaciones, ac.egresado FROM alumnos as a INNER JOIN alumno_cursa_carrera as ac INNER JOIN carrera as c WHERE a.idalumnos = ac.ALUMNOS_idalumnos AND ac.CARRERA_idcarrera = c.idcarrera AND ac.confirma = 1;';
        }
        conexion.query(consulta, (err, registros)=>{
            if(err){
                throw err;
            }else{
                res.render('consulta',{resultados: registros, rows: lista_carreras, usuario: req.usuario});
            }
        });
    }else{
        const filtroBusqueda = `SELECT a.idalumnos ,a.nombre, a.apellido, a.dni, a.fecha_nac, a.telefono, a.email, a.domicilio, c.nomenclatura as carrera, a.observaciones, ac.egresado FROM alumnos as a INNER JOIN alumno_cursa_carrera as ac INNER JOIN carrera as c WHERE a.idalumnos = ac.ALUMNOS_idalumnos AND ac.CARRERA_idcarrera = c.idcarrera AND ac.confirma = 1 AND ac.CARRERA_idcarrera = ${id_carrera} AND ac.egresado = ${egresado};`;
        conexion.query(filtroBusqueda,(err, registros)=>{
            if(err){
                throw err;
            }else{
                res.render('consulta',{resultados: registros, rows: lista_carreras, usuario: req.usuario});
            }
        });
    }

});

// Ruta Editar Registros
router.get('/modifica/:id/:carrera', autenticacion.autenticado,(req,res)=>{
    const id = req.params.id;
    const carrera = req.params.carrera.toLowerCase();

    //const busca = `SELECT * FROM alumnos WHERE idalumnos = ${id};`;
    const busca = `SELECT a.idalumnos ,a.nombre, a.apellido, a.dni, a.fecha_nac, a.telefono, a.email, a.domicilio, c.nomenclatura as carrera, a.observaciones, ac.egresado FROM alumnos as a INNER JOIN alumno_cursa_carrera as ac INNER JOIN carrera as c WHERE a.idalumnos = '${id}' AND c.nomenclatura = '${carrera}' AND a.idalumnos = ac.ALUMNOS_idalumnos AND ac.CARRERA_idcarrera = c.idcarrera;`;
    conexion.query(busca,(err, registro)=>{
        if(err){
            throw err;
        }else{
            const carreras = `SELECT * FROM carrera;`
            conexion.query(carreras, (err, resultados)=>{
                if(err){
                    throw err;
                }else{
                    res.render('modifica', {alumno: registro[0], rows: resultados});
                }
            })
        }
    });
});

// Ruta para Eliminar Registros
router.get('/elimina/:id/:carrera', autenticacion.autenticado,(req,res)=>{
    const id = req.params.id;
    const carrera = req.params.carrera.toLowerCase();
    let muestra;
    //const elimina = `DELETE FROM alumnos WHERE idalumnos = ${id};`;
    const elimina = `UPDATE alumno_cursa_carrera SET muestra = 0 WHERE ALUMNOS_idalumnos = ${id} AND CARRERA_idcarrera = (SELECT idcarrera FROM carrera WHERE nomenclatura = '${carrera}');`;
    conexion.query(elimina,(err)=>{
        if(err){
            throw err;
        }else{
            muestra = "Registro eliminado con exito!!";
            res.render('index', {muestra});
        }
    })
});

// Ruta para el login
router.get('/login', (req, res) => {
    res.render('login');
});

// Ruta para el registro
router.get('/register', (req, res) => {
    res.render('register');
});

// Ruta para el contacto
router.get('/contacto', (req, res) => {
    res.render('contacto');
});

// Ruta Reestablecer contraseña
router.get('/reset-pass', (req,res)=>{
    res.render('reset-pass');
})

// Ruta nueva contraseña
router.get('/nuevo-pass/:token', (req, res)=>{
    const valida = req.params.token;
    res.render('nuevo-pass', {tokenPass: valida});
})

// Ruta para verificar correo
router.get('/verificar/:token/:tipo/:dni', async(req, res) => {
    try {
        const token = req.params.token;
        const tipo = req.params.tipo;
        const dni = req.params.dni;
        const decoded = jwt.verify(token, process.env.JWT_SECRETO);

        const email = decoded.email;
        let confirma;
        let titulo;
        let mensaje;
        
        if(tipo === 'registro'){
            confirma = `UPDATE usuarios SET confirma = 1 WHERE email = '${email}';`;
            titulo = "Usuario Verificado con Exito!!";
            mensaje = "Ya puede ingresar al sistema";

            conexion.query(confirma, (err) =>{
                if(err){
                    throw err;
                }else{
                    res.render('verificar',{
                            alert: true,
                            alertTitle: `${titulo}`,
                            alertMessage: `${mensaje}`,
                            alertIcon: "success",
                            showConfirmationButton: true,
                            timer: false,
                            ruta: 'login'
                    });
                }
            });
        }else{
            conexion.query(`SELECT a.idalumnos FROM alumnos as a INNER JOIN alumno_cursa_carrera as ac WHERE a.dni = ${dni} AND a.idalumnos = ac.ALUMNOS_idalumnos AND ac.CARRERA_idcarrera = ${tipo}`, (err, resultado)=>{
                if(err){
                    throw err
                }else{
                    const id = resultado[0].idalumnos;
                    confirma = `UPDATE alumno_cursa_carrera SET confirma = 1 WHERE ALUMNOS_idalumnos = ${id} AND CARRERA_idcarrera = ${tipo};`;
                    titulo = "Solicitud recibida con exito!!";
                    mensaje = "Pondremos tu contacto a disposicion de las busquedas";
                    conexion.query(confirma, (err) =>{
                        if(err){
                            throw err;
                        }else{
                            res.render('verificar',{
                                    alert: true,
                                    alertTitle: `${titulo}`,
                                    alertMessage: `${mensaje}`,
                                    alertIcon: "success",
                                    showConfirmationButton: true,
                                    timer: false,
                                    ruta: 'index'
                            });
                        }
                    });
                }
            })
        }
    } catch (error) {
        console.error(error);
        res.status(400).render('verificar', {
            alert: true,
            alertTitle: "Advertencia",
            alertMessage: "Enlace de verificacion invalido o expirado!!" ,
            alertIcon: "info",
            ruta: 'register'
        })
    }
});

// Ruta usuarios autorizados
router.get('/agregar', autenticacion.autenticado ,(req,res)=>{
    const carreras = `SELECT * FROM rol;`;
    conexion.query(carreras,(err, resultados)=>{
        if(err){
            throw err;
        }else{
            res.render('agregar',{rows: resultados});
        }
    });
});


router.post('/validar', crud.validar);
router.post('/actualizar/:carrera_anterior', crud.actualizar);
router.post('/registrar', autenticacion.registrar);
router.post('/ingresar', autenticacion.ingresar);
router.get('/logout', autenticacion.logout);

// Ruta enviar correo
router.post('/enviar-correo', async(req, res) => {
    try {
        const datos = req.body;
        const{nombre, email, empresa, puesto, mensaje} = datos;
    
        const mailOptions = {
            from: email,
            to: 'guaine86@gmail.com',
            subject: 'Solicitud Empleador',
            html:`
                <h3>Detalles de la solicitud:</h3>
                <ul>
                    <li><strong>Nombre: </strong>${nombre}</li>
                    <li><strong>Correo Electronico: </strong>${email}</li>
                    <li><strong>Tipo de Empresa: </strong>${empresa}</li>
                    <li><strong>Puesto Solicitado: </strong>${puesto}</li>
                </ul>
                <p><strong>Mensaje:</strong></p>
                <p>${mensaje}</p>
    
            `,
        };
    
        await transporter.sendMail(mailOptions, (err, info) =>{
            if(err){
                console.error('Error al enviar el correo:', err)
                //return res.status(500).send('Error al enviar el correo!!');
                res.render('contacto', {
                    alert: true,
                    alertTitle: "Error al Enviar el correo",
                    alertMessage: "Ingrese un mail valido!!" ,
                    alertIcon: "info",
                    ruta: 'contacto'
                });
            }
            //res.send('Correo Enviado con Exito!!');
            res.render('contacto', {
                alert: true,
                alertTitle: "Correo Enviado con Exito",
                alertMessage: "En breve nos pondremos en contacto con ud" ,
                alertIcon: 'success',
                ruta:'index'
            })
        });
        
    }catch (error){
        throw error;
    }
});

// Accion restablecer contraseña
router.post('/restablecer',async(req,res)=>{
    const {email} = req.body;
    let muestra;

    const token = jwt.sign({ email }, process.env.JWT_SECRETO, { expiresIn: '1h'});
    const resetLink = `http://localhost:${process.env.PORT}/nuevo-pass/${token}`;
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Restablecimiento de contraseña',
        html: `
            <h1>Hola</h1>
            <p>Solicitaste un cambio de  contraseña!! Por favor, verifica tu cuenta haciendo click en el siguiente enlace:</p>
            <a href="${resetLink}">Verificar cuenta</a>
        `
    }

    await transporter.sendMail(mailOptions);
    
    muestra = 'Enlace de restablecimiento enviado a tu correo!!';
    res.render('login', {muestra});
});

// Accion nueva contraseña
router.post('/nueva/:token', async(req, res)=>{
    try {
        const {token} = req.params;
        const {pass} = req.body;

        const decoded = jwt.verify(token, process.env.JWT_SECRETO);

        let passHash = await bcryptjs.hash(pass, 8);

        const modifica = `UPDATE usuarios SET pass = '${passHash}' WHERE email = '${decoded.email}'`
        conexion.query(modifica, (err)=>{
            if(err){
                throw err;
            }else{
                res.render('nuevo-pass',{
                    alert: true,
                    alertTitle: "Contraseña Actualizada!!",
                    alertMessage: "Ya puede ingresar nuevamente" ,
                    alertIcon: 'success',
                    ruta:'login'
                })
            }
        })
    } catch (error) {
        console.error(error);
        res.status(400).render('verificar', {
            alert: true,
            alertTitle: "Advertencia",
            alertMessage: "Enlace de verificacion invalido o expirado!!" ,
            alertIcon: "info",
            ruta: 'register'
        })
    }
})

// Accion agregar autorizado
router.post('/agregarAuth', (req,res)=>{
    const datos = req.body;
    const {dni, rol} = datos;
    let muestra;

    lista_roles = [];
    const carreras = `SELECT * FROM rol;`;
    conexion.query(carreras,(err, resultados)=>{
        if(err){
            throw err;
        }else{
            lista_roles = resultados;
        }
    });

    const agrega = `INSERT INTO usuarios_autorizados (dni) VALUES ('${dni}');`;
    conexion.query(agrega, (err, insertado,next)=>{
        if(err){
            muestra = "No se puede autorizar al mismo DNI!!"
            res.render('agregar', {muestra, rows: lista_roles});
        }else{
            const id_creado = insertado.insertId;
            const agrega2= `INSERT INTO roles_autorizados (AUTH_idusuarios_autorizados, ROL_idrol) VALUES (${id_creado}, ${rol});`;
            conexion.query(agrega2, (err)=>{
                if(err){
                    throw err;
                }else{
                    res.render('agregar', {
                        alert: true,
                        alertTitle: "Autorizacion agregada Correctamente!!",
                        alertMessage: "Cuando el usuario se registre podra ingresar al sistema" ,
                        alertIcon: 'success',
                        ruta:'consulta'
                    })
                }
            })
        }
    })

})

// router.get('/set-cookie', (req, res)=>{
//     res.cookie('testCookie', 'cookieValue',{httpOnly: true});
//     res.send('Cookie establecida')
// });

// router.get('/get-cookie',(req, res)=>{
//     const cookieValue = req.cookies.testCookie;
//     res.send(`Valor de la cookie ${cookieValue || 'No hay cookie disponible'}`);
// })

module.exports = router;