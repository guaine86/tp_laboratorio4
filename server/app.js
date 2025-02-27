const express = require('express');
const env = require('dotenv');
const cookieParser = require('cookie-parser');

env.config({path: './env/.env'});
const app = express();

app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));
app.use('/', require('./router'));
app.use((req,res,next)=>{
    if(!req.usuario){
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    }
    next();
})

const puerto = process.env.PORT || 3000;
app.listen(puerto, ()=>{
    console.log(`El servidor local es http://localhost:${puerto}`);
});
