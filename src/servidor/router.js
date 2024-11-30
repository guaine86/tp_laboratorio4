const express = require('express');
const router = express.Router();
const bbdd = require('./bbdd');
const crud = require('./crud');

// Ruta Principal
router.get('/',(req,res)=>{
    res.render('index');
});

// Ruta Consultas
router.get('/consulta', (req,res)=>{
    const conexion = bbdd.creaConexion();

    const consulta = 'SELECT * FROM alumnos';
    conexion.query(consulta, (err, registros)=>{
        if(err){
            throw err;
        }else{
            res.render('consulta',{resultados: registros});
        }
    });

    conexion.end();
});

router.get('/consulta/:ordena',(req,res)=>{
    const ordena = req.params.ordena;
    const conexion = bbdd.creaConexion();

    const orderBy = `SELECT * FROM alumnos ORDER BY ${ordena};`;
    conexion.query(orderBy,(err, registros)=>{
        if(err){
            throw err;
        }else{
            res.render('consulta',{resultados: registros});
        }
    });

    conexion.end();
});

// Ruta Editar Registros
router.get('/modifica/:id',(req,res)=>{
    const id = req.params.id;
    const conexion = bbdd.creaConexion();

    const busca = `SELECT * FROM alumnos WHERE idalumnos = ${id};`;
    conexion.query(busca,(err, registro)=>{
        if(err){
            throw err;
        }else{
            res.render('modifica', {alumno: registro[0]});
        }
    });

    conexion.end();
});

// Ruta para Eliminar Registros
router.get('/elimina/:id',(req,res)=>{
    const id = req.params.id;
    const conexion = bbdd.creaConexion();

    let muestra;
    const elimina = `DELETE FROM alumnos WHERE idalumnos = ${id};`;
    conexion.query(elimina,(err)=>{
        if(err){
            throw err;
        }else{
            muestra = "Registro eliminado con exito!!";
            res.render('index', {muestra});
        }
    })

    conexion.end();
});

router.post('/validar', crud.validar);
router.post('/actualizar', crud.actualizar);

module.exports = router;