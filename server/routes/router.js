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

