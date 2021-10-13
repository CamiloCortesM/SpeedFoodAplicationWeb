# Proyecto SPEED-FOOD 

Proyecto de domicilios de un restaurante de comida variada, en este proyecto se utilizo la base de datos de mongodb para guardar la informacion de los productos,pedidos y domiciliarios se utilizo NodeJS con Express y EJS como motor de vistas y varios modulos y se utilizaron modulos y middleware para el desarrollo de este.

# Extructura del Proyecto

```bash
├── readme.md
├── package-lock.json
├── package.json
├── config.env.json
├── server.js
└── views
|    └── include
|    | 	 ├── _footer.ejs
|    |   ├── _form.ejs
|    |   ├── _formproducts.ejs
|    |   ├── _header.ejs
|    |   ├── _show.ejs
|    |   ├── _showLiquid.ejs
|    |   ├── _showPedidos.ejs
|    |   └── _showProducts.ejs
|    ├──add_domic.ejs
|    ├──add_product.ejs 
|    ├──admin.ejs  
|    ├──domiciliarios.ejs  
|    ├──index.ejs
|    ├──infoUser.ejs
|    ├──new_pedido.ejs
|    ├──PayDomiciliarios.ejs
|    ├──pedidos.ejs   		
|    ├──products.ejs  	
|    ├──update_domic.ejs  
|    ├──update_product.ejs               
|    └──User.ejs   		   
└── server
|      ├── controller
|      |       └── controller.js
|      ├── database
|      |       └── connection.js
|      ├── model
|      |       ├── model.js
|      |       ├── model2.js
|      |       └── model3.js
|      ├── routes
|      |       └── router.js
|      └── services
|              └── render.js        
└── assets    
|      ├── css
|      |     ├── login.css
|      |     └── style.css
|      ├── img
|      |     ├── domiciliarios.png
|      |     ├── food.png
|      |     └── pedidos.png
|      ├── js
|      |       ├── autoComplete.js
|      |       ├── FormPedit.js
|      |       ├── index.js
|      |       ├── Select.js
|      |       └── User.js
|      ├── plugins/FuzzyComplete
|      └── popper              
```
### Descripción de Carpetas
- `views` Contienen todas las vistas de usuario 
- `server`Contiene todos los archivos que se encargan del funcionamiento del servidor,enlazar a la base de datos y los enrutamientos del servidor 
- `assets`Contiene los archivos los cuales modifican el funcionamiento de la pagina del lado del cliente


# Instalacion Y Configuracion
```
npm install
npm start

```
> Puerto del Servidor: 3000

```
Admin:
Correo: admin   
Contraseña: admin

Cuenta Usuario:
Correo: user
Contraseña: 1234

```

### Archivo server.js

El Archivo `server.js` es donde se inicia y se configura el servidor tiene el siguiente contenido:

```javascript
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

``` 
### Archivo server/database/connection.js

El Archivo `connection.js` es donde se hace la coneccion a la base de datos (MongoDB):


```javascript

const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        // Coneccion a la Base de Datos
        const con = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log(`MongoDB Conectada : ${con.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB
``` 
### Archivo server/routes/router.js

Es el archivo en donde se configuran las rutas, tiene el siguiente conrtenido

```javascript

const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');

//login
const admin = {
    email: "admin",
    password: "admin"
}

const user = {
    email: "user"
}

route.post('/', (req, res) => {
    if (req.body.name == admin.email && req.body.password == admin.password) {
        res.redirect('/admin');
    }
    if( req.body.name == user.email  && req.body.password=="1234"){
            res.redirect('/User');
        }
        res.send('<script>alert("Contraseña o Usuario Incorrecto")</script>');
});
    


/**
 *  @description login
 *  @method GET /
 */
route.get('/', services.index);
/**
 *  @description admin
 *  @method GET /
 */
route.get('/admin', services.admin);
/**
 *  @description Userinfo
 *  @method GET /
 */
 route.get('/infoUser', services.infoUser);
/**
 *  @description User
 *  @method GET /
 */
 route.get('/User', services.User);
/**
 *  @description dimiciliarios
 *  @method GET /
 */

route.get('/domiciliarios', services.domic);
/**
 *  @description pedidos
 *  @method GET /pedido
 */

route.get('/pedidos', services.pedido);
/**
 *  @description Paydomiciliarios
 *  @method GET /PayDOMIC
 */

route.get('/PayDomiciliarios', services.PayDomic)
/**
 *  @description nuevo-pedido
 *  @method GET /nuevo-pedido
 */
 route.get('/new_pedido', services.new_pedido)
/**
 *  @description add domics
 *  @method GET /add-domic
 */
route.get('/add-domic', services.add_domic)

/**
 *  @description for update domic
 *  @method GET /update-domic
 */
route.get('/update-domic', services.update_domic)



//producto
route.get('/products', services.product)
route.get('/add-product', services.add_product)
route.get('/update_product', services.update_product)


// API domics
route.post('/api/domics', controller.createdomic);
route.get('/api/domics', controller.finddomic);
route.put('/api/domics/:id', controller.updatedomic);
route.delete('/api/domics/:id', controller.deletedomic);

//API productos
route.post('/api/products', controller.createproduct);
route.get('/api/products', controller.findproduct);
route.put('/api/products/:id', controller.updateproduct);
route.delete('/api/products/:id', controller.deleteproduct);

//API pedits
route.post('/api/pedits', controller.createOrder);
route.get('/api/pedits', controller.findOrder);

//export
module.exports = route



``` 
> post,get,put,delete aqui se utilizan los metodos de peticion

### Archivo server/services/sender.js

El Archivo `render.js` es donde se renderizan todas las paginas del usuario donde son llamadas de la clase router:


```javascript

const axios = require('axios');



exports.index = (req, res) => {
    res.render('index');
}

exports.admin = (req, res) => {
    res.render('admin');
}
exports.infoUser = (req, res) => {
    res.render('infoUser');
}

exports.User = (req, res) => {
    res.render('User');
}
exports.PayDomic = (req, res) => {
    // Realizar una solicitud de obtención a / api / pedits
   axios.get('http://localhost:3000/api/pedits')
       .then(function(response){
           res.render('PayDomiciliarios', { pedits : response.data });
       })
       .catch(err =>{
           res.send(err);
       })
}

exports.pedido = (req, res) => {
    // Realizar una solicitud de obtención a / api /pedits
   axios.get('http://localhost:3000/api/pedits')
       .then(function(response){
           res.render('pedidos', { pedits : response.data });
       })
       .catch(err =>{
           res.send(err);
       })
}
exports.domic = (req, res) => {
     // Realizar una solicitud de obtención a / api / domic
    axios.get('http://localhost:3000/api/domics')
        .then(function(response){
            res.render('domiciliarios', { domics : response.data });
        })
        .catch(err =>{
            res.send(err);
        })
}
exports.product = (req, res) => {
    // Realizar una solicitud de obtención a / api / products
   axios.get('http://localhost:3000/api/products')
       .then(function(response){
           res.render('products', { products : response.data });
       })
       .catch(err =>{
           res.send(err);
       })
}

exports.add_domic = (req, res) =>{
    res.render('add_domic');
}
exports.new_pedido = (req, res) =>{
    axios.get('http://localhost:3000/api/products')
       .then(function(response){
           res.render('new_pedido', { products : response.data });
       })
       .catch(err =>{
           res.send(err);
       })
}
//producto
exports.add_product = (req, res) =>{
    res.render('add_product');
}

exports.update_domic = (req, res) =>{
    axios.get('http://localhost:3000/api/domics', { params : { id : req.query.id }})
        .then(function(domicdata){
            res.render("update_domic", { domic : domicdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}
exports.update_product = (req, res) =>{
    axios.get('http://localhost:3000/api/products', { params : { id : req.query.id }})
        .then(function(productdata){
            res.render("update_product", { product : productdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.update_Order = (req, res) =>{
    res.render("pedidosJornada");
}


``` 