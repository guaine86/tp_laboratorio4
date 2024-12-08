const express = require('express');
const router = express.Router();
const conexion = require('./bbdd');
const crud = require('./crud');

// Ruta Principal
router.get('/',(req,res)=>{
    res.render('index');
});

// Ruta Consultas
router.get('/consulta', (req,res)=>{
    
    const consulta = 'SELECT a.idalumnos ,a.nombre, a.apellido, a.dni, a.fecha_nac, a.telefono, a.email, a.domicilio, c.nomenclatura as carrera, a.observaciones FROM alumnos as a INNER JOIN alumno_cursa_carrera as ac INNER JOIN carrera as c WHERE a.idalumnos = ac.ALUMNOS_idalumnos AND ac.CARRERA_idcarrera = c.idcarrera AND ac.confirma = 1;';
    conexion.query(consulta, (err, registros)=>{
        if(err){
            throw err;
        }else{
            res.render('consulta',{resultados: registros});
        }
    });
});

router.get('/consulta/:ordena',(req,res)=>{
    const ordena = req.params.ordena;

    const orderBy = `SELECT a.idalumnos ,a.nombre, a.apellido, a.dni, a.fecha_nac, a.telefono, a.email, a.domicilio, c.nomenclatura as carrera, a.observaciones FROM alumnos as a INNER JOIN alumno_cursa_carrera as ac INNER JOIN carrera as c WHERE a.idalumnos = ac.ALUMNOS_idalumnos AND ac.CARRERA_idcarrera = c.idcarrera AND ac.confirma = 1 ORDER BY ${ordena};`;
    conexion.query(orderBy,(err, registros)=>{
        if(err){
            throw err;
        }else{
            res.render('consulta',{resultados: registros});
        }
    });
});

// Ruta Editar Registros
router.get('/modifica/:id/:carrera',(req,res)=>{
    const id = req.params.id;
    const carrera = req.params.carrera.toLowerCase();

    //const busca = `SELECT * FROM alumnos WHERE idalumnos = ${id};`;
    const busca = `SELECT a.idalumnos ,a.nombre, a.apellido, a.dni, a.fecha_nac, a.telefono, a.email, a.domicilio, c.nomenclatura as carrera, a.observaciones FROM alumnos as a INNER JOIN alumno_cursa_carrera as ac INNER JOIN carrera as c WHERE a.idalumnos = '${id}' AND c.nomenclatura = '${carrera}' AND a.idalumnos = ac.ALUMNOS_idalumnos AND ac.CARRERA_idcarrera = c.idcarrera;`;
    conexion.query(busca,(err, registro)=>{
        if(err){
            throw err;
        }else{
            res.render('modifica', {alumno: registro[0]});
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

router.post('/validar', crud.validar);
router.post('/actualizar/:carrera_anterior', crud.actualizar);

module.exports = router;