const conexion = require('./bbdd.js');

exports.validar = (req,res)=>{
    const datos = req.body;
    let {nombre, apellido, dni, fecha_nac, telefono, email, domicilio, carrera, observaciones} = datos
    
    nombre = nombre.toLowerCase();
    apellido = apellido.toLowerCase();
    email = email.toLowerCase();
    domicilio = domicilio.toLowerCase();
    carrera = carrera.toLowerCase();
    observaciones = observaciones.toLowerCase();
    
    let muestra;
    let lista_carreras = [];

    const carreras = `SELECT * FROM carrera;`;
    conexion.query(carreras, (err,resultados)=>{
        if(err){
            throw err;
        }else{
            lista_carreras = resultados;
        }
    });
    
    const busca = `SELECT * FROM alumnos as a INNER JOIN alumno_cursa_carrera as ac WHERE a.dni = ${dni} AND ac.CARRERA_idcarrera = '${carrera}';`
    conexion.query(busca, (err, rows)=>{
        if(err){
            throw err;
        }else if(rows.length>0){
            const busca2 = `SELECT confirma FROM alumno_cursa_carrera WHERE ALUMNOS_idalumnos = (SELECT idalumnos FROM alumnos WHERE dni = '${dni}') AND CARRERA_idcarrera = ${carrera} AND confirma = 0;`;
            conexion.query(busca2,(err,resultado)=>{
                if(err){
                    throw err;
                }else if(resultado.length>0){
                    const modifica = `UPDATE alumno_cursa_carrera SET confirma = 1 WHERE ALUMNOS_idalumnos = (SELECT idalumnos FROM alumnos WHERE dni = '${dni}') AND CARRERA_idcarrera = ${carrera};`;
                    conexion.query(modifica, (err)=>{
                        if(err){
                            throw err;
                        }else{
                            muestra = "Alumno Ingresado con Exito!!";
                            res.render('index',{muestra, rows: lista_carreras});
                        }
                    })
                }else{
                    const buscaAlumno = `SELECT * FROM alumnos WHERE dni = '${dni}';`;
                    conexion.query(buscaAlumno,(err, resultado)=>{
                        if(err){
                            throw err;
                        }else if(resultado.length>0){
                            const id_alumno = resultado[0].idalumnos;
                            const inserta2 = `INSERT INTO alumno_cursa_carrera (ALUMNOS_idalumnos, CARRERA_idcarrera) VALUES (${id_alumno}, ${carrera});`;
                            conexion.query(inserta2,(err)=>{
                                if(err){
                                    muestra = "No se puede volver a cargar el mismo alumno a la misma carrera!!";
                                    res.render('index',{muestra, rows: lista_carreras});
                                }else{
                                    muestra = "Alumno Ingresado con Exito!!";
                                    res.render('index',{muestra, rows: lista_carreras});
                                }
                            });
                        }
                    })        
                }
            });
        }else{
            const buscaAlumno = `SELECT * FROM alumnos WHERE dni = '${dni}';`;
            conexion.query(buscaAlumno,(err, resultado)=>{
                if(err){
                    throw err;
                }else if(resultado.length>0){
                    const id_alumno = resultado[0].idalumnos;
                    const inserta2 = `INSERT INTO alumno_cursa_carrera (ALUMNOS_idalumnos, CARRERA_idcarrera) VALUES (${id_alumno}, ${carrera});`;
                    conexion.query(inserta2,(err)=>{
                        if(err){
                            throw err;
                        }else{
                            muestra = "Alumno Ingresado con Exito!";
                            res.render('index',{muestra, rows: lista_carreras});
                        }
                    });
                }else{
                    const inserta = `INSERT INTO alumnos (nombre, apellido, dni, fecha_nac, telefono, email, domicilio, observaciones) VALUES ('${nombre}', '${apellido}','${dni}','${fecha_nac}','${telefono}','${email}','${domicilio}','${(observaciones === ''||observaciones === ' ') ? '-' : observaciones}');`
                    conexion.query(inserta, (err, insertado)=>{
                        if(err){
                            throw err;
                        }else{
                            const id_generado = insertado.insertId;
                            const inserta2 = `INSERT INTO alumno_cursa_carrera (ALUMNOS_idalumnos, CARRERA_idcarrera) VALUES (${id_generado}, ${carrera});`;
                            conexion.query(inserta2,(err)=>{
                                if(err){
                                    throw err;
                                }else{
                                    muestra = "Alumno Ingresado con Exito!!";
                                    res.render('index',{muestra, rows: lista_carreras});
                                }
                            });
                        };
                    });
                }
            })
        };
    });    
};

exports.actualizar = (req,res)=>{
    const datos = req.body;
    const carrera_anterior = req.params.carrera_anterior;

    let {nombre, apellido, dni, fecha_nac, telefono, email, domicilio, carrera, observaciones, id, egresado} = datos;

    nombre = nombre.toLowerCase();
    apellido = apellido.toLowerCase();
    email = email.toLowerCase();
    domicilio = domicilio.toLowerCase();
    observaciones = observaciones.toLowerCase();

    let muestra;
    let lista_carreras = [];

    const carreras = `SELECT * FROM carrera;`;
    conexion.query(carreras, (err,resultados)=>{
        if(err){
            throw err;
        }else{
            lista_carreras = resultados;
        }
    });

    const modifica = `UPDATE alumnos SET nombre = '${nombre}', apellido = '${apellido}', dni='${dni}', fecha_nac = '${fecha_nac}', telefono = '${telefono}', email = '${email}', domicilio = '${domicilio}', observaciones = '${(observaciones === ''||observaciones === ' ') ? '-' : observaciones}' WHERE idalumnos = ${id};`;
    conexion.query(modifica, (err)=>{
        if(err){
            throw err;
        }else{
            const modifica2 = `UPDATE alumno_cursa_carrera SET CARRERA_idcarrera = (SELECT idcarrera FROM carrera WHERE nomenclatura = '${carrera}'), egresado = ${egresado} WHERE ALUMNOS_idalumnos = ${id} AND CARRERA_idcarrera = (SELECT idcarrera FROM carrera WHERE nomenclatura = '${carrera_anterior}');`;
            conexion.query(modifica2, (err)=>{
                if(err){
                    const busca_previo = `SELECT * FROM alumno_cursa_carrera WHERE ALUMNOS_idalumnos = ${id} AND CARRERA_idcarrera = (SELECT idcarrera FROM carrera WHERE nomenclatura = '${carrera}') AND confirma = 0;`;
                    conexion.query(busca_previo,(err, resultado)=>{
                        if(err){
                            throw err;
                        }else if(resultado.length>0){
                            const modifica3 = `UPDATE alumno_cursa_carrera SET confirma = 1 WHERE ALUMNOS_idalumnos = ${id} AND CARRERA_idcarrera = (SELECT idcarrera FROM carrera WHERE nomenclatura = '${carrera}');`;
                            conexion.query(modifica3,(err)=>{
                                if(err){
                                    throw err;
                                }else{
                                    const modifica4 = `UPDATE alumno_cursa_carrera SET confirma = 0 WHERE ALUMNOS_idalumnos = ${id} AND CARRERA_idcarrera = (SELECT idcarrera FROM carrera WHERE nomenclatura = '${carrera_anterior}');`;
                                    conexion.query(modifica4, (err)=>{
                                        if(err){
                                            throw err;
                                        }else{
                                            muestra = "Datos actualizados con exito!!";
                                            res.render('index', {muestra, rows: lista_carreras});
                                        }
                                    });
                                }
                            })
                        }else{
                            muestra = 'No se puede volver a cargar el mismo alumno a la misma carrera!!';
                            res.render('index', {muestra, rows: lista_carreras});
                        }
                    });
                }else{
                    muestra = "Datos actualizados con exito!!";
                    res.render('index', {muestra, rows: lista_carreras});
                }
            })
        }
    })
};