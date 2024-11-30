const conexion = require('./bbdd.js');

exports.validar = (req,res)=>{
    const datos = req.body;
    let {nombre, apellido, dni, fecha_nac, telefono, email, domicilio, observaciones} = datos
    
    nombre = nombre.toLowerCase();
    apellido = apellido.toLowerCase();
    email = email.toLowerCase();
    domicilio = domicilio.toLowerCase();
    observaciones = observaciones.toLowerCase();
    
    let muestra;
    
    const busca = `SELECT * FROM alumnos WHERE dni = ${dni};`
    conexion.query(busca, (err, rows)=>{
        if(err){
            throw err;
        }else if(rows.length>0){
            muestra = "No se puede volver a cargar el mismo alumno!";
            res.render('index',{muestra});
        }else{
            const inserta = `INSERT INTO alumnos (nombre, apellido, dni, fecha_nac, telefono, email, domicilio, observaciones) VALUES ('${nombre}', '${apellido}','${dni}','${fecha_nac}','${telefono}','${email}','${domicilio}','${(observaciones === ''||observaciones === ' ') ? '-' : observaciones}');`
            conexion.query(inserta, (err)=>{
                if(err){
                    throw err;
                }else{
                    muestra = "Alumno Ingresado con Exito!";
                    res.render('index',{muestra});
                }
            });
        };
    });    
};

exports.actualizar = (req,res)=>{
    const datos = req.body;
    let {nombre, apellido, dni, fecha_nac, telefono, email, domicilio, observaciones, id} = datos;
    
    nombre = nombre.toLowerCase();
    apellido = apellido.toLowerCase();
    email = email.toLowerCase();
    domicilio = domicilio.toLowerCase();
    observaciones = observaciones.toLowerCase();

    let muestra;

    const modifica = `UPDATE alumnos SET nombre = '${nombre}', apellido = '${apellido}', dni='${dni}', fecha_nac = '${fecha_nac}', telefono = '${telefono}', email = '${email}', domicilio = '${domicilio}', observaciones = '${(observaciones === ''||observaciones === ' ') ? '-' : observaciones}' WHERE idalumnos = ${id};`;
    conexion.query(modifica, (err)=>{
        if(err){
            throw err;
        }else{
            muestra = "Datos actualizados con exito!!";
            res.render('index', {muestra});
        }
    })
};