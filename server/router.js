const path = require('path');
const express = require('express');
const router = express.Router();
const conexion = require('./bbdd.js');
const crud = require('./crud.js');
const autenticacion = require('../controllers/auth.controller.js');

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
router.get('/consulta', (req,res)=>{
    let lista_carreras = [];

    const carreras = `SELECT * FROM carrera;`;
    conexion.query(carreras, (err,resultados)=>{
        if(err){
            throw err;
        }else{
            lista_carreras = resultados;
        }
    });
    
    const consulta = 'SELECT a.idalumnos ,a.nombre, a.apellido, a.dni, a.fecha_nac, a.telefono, a.email, a.domicilio, c.nomenclatura as carrera, a.observaciones, ac.egresado FROM alumnos as a INNER JOIN alumno_cursa_carrera as ac INNER JOIN carrera as c WHERE a.idalumnos = ac.ALUMNOS_idalumnos AND ac.CARRERA_idcarrera = c.idcarrera AND ac.confirma = 1;';
    conexion.query(consulta, (err, registros)=>{
        if(err){
            throw err;
        }else{
            res.render('consulta',{resultados: registros, rows: lista_carreras});
        }
    });
});

router.get('/consulta/:ordena',(req,res)=>{
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
            res.render('consulta',{resultados: registros, rows: lista_carreras});
        }
    });
});

router.post('/filtra',(req,res)=>{
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
                res.render('consulta',{resultados: registros, rows: lista_carreras});
            }
        });
    }else{
        const filtroBusqueda = `SELECT a.idalumnos ,a.nombre, a.apellido, a.dni, a.fecha_nac, a.telefono, a.email, a.domicilio, c.nomenclatura as carrera, a.observaciones, ac.egresado FROM alumnos as a INNER JOIN alumno_cursa_carrera as ac INNER JOIN carrera as c WHERE a.idalumnos = ac.ALUMNOS_idalumnos AND ac.CARRERA_idcarrera = c.idcarrera AND ac.confirma = 1 AND ac.CARRERA_idcarrera = ${id_carrera} AND ac.egresado = ${egresado};`;
        conexion.query(filtroBusqueda,(err, registros)=>{
            if(err){
                throw err;
            }else{
                res.render('consulta',{resultados: registros, rows: lista_carreras});
            }
        });
    }

});

// Ruta Editar Registros
router.get('/modifica/:id/:carrera',(req,res)=>{
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
router.get('/elimina/:id/:carrera',(req,res)=>{
    const id = req.params.id;
    const carrera = req.params.carrera.toLowerCase();
    let muestra;
    //const elimina = `DELETE FROM alumnos WHERE idalumnos = ${id};`;
    const elimina = `UPDATE alumno_cursa_carrera SET confirma = 0 WHERE ALUMNOS_idalumnos = ${id} AND CARRERA_idcarrera = (SELECT idcarrera FROM carrera WHERE nomenclatura = '${carrera}');`;
    conexion.query(elimina,(err)=>{
        if(err){
            throw err;
        }else{
            muestra = "Registro eliminado con exito!!";
            res.render('index', {muestra});
        }
    })
});

//Ruta para el login
router.get('/login', (req, res) => {
    res.render('login');
});

//Ruta para el registro
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/validar', crud.validar);
router.post('/actualizar/:carrera_anterior', crud.actualizar);
router.post('/registrar', autenticacion.registrar);
router.post('/ingresar', autenticacion.ingresar);

module.exports = router;