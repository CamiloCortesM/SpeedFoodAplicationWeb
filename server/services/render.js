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


