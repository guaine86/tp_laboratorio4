const express = require('express');

const app = express();

// const configServer = {
//     host:"localhost",
//     database: "tp_laboratorio4",
//     user: "root",
//     password: "root"
// };
// module.exports = configServer;

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('dist'));
app.use('/', require('./router'));

// app.post('/validar', (req, res)=>{
//     const conexion = new Formulario(configServer);
//     const datos = req.body;
//     console.log(datos);
//     const muestra = conexion.agregaRegistro(datos);
//     console.log(muestra);
//     res.render('index', {muestra});
// })

app.listen(3000, ()=>{
    console.log("El servidor local es http://localhost:3000");
})
