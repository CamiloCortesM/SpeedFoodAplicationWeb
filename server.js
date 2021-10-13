const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');

const connectDB = require('./server/database/connection');

const app = express();

dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT || 8080

// solicitud de registro
app.use(morgan('tiny'));

// Coneccion a la base de datos
connectDB();

// analizar la solicitud a body-parser
app.use(bodyparser.urlencoded({ extended : true}))

// configurar motor de vista
app.set("view engine", "ejs")

//cargar activos
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/plugins', express.static(path.resolve(__dirname, "assets/plugins")))
app.use('/popper', express.static(path.resolve(__dirname, "assets/popper")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))


// Cargar las rutas
app.use('/', require('./server/routes/router'))

// se inicia el servidor 
app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});