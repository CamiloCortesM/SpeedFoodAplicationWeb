var Domiciliariodb = require('../model/model');
var Productodb = require('../model/model2');
var Pedidodb = require('../model/model3');

// Crear y guardar nuevo Domiciliario
exports.createdomic = (req, res) => {
    // validar solicitud
    if (!req.body) {
        res.status(400).send({ message: "¡El contenido no puede estar vacío!" });
        return;
    }

    // nuevo domiciliario
    const domiciliario = new Domiciliariodb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        age: req.body.age
    })
     // Guardar domiliciario en la base de datos
    domiciliario
        .save(domiciliario)
        .then(data => {

            res.redirect('/add-domic');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Se produjo un error al crear una operación de creación"
            });
        });

}

exports.createOrder = (req, res) => {
    // validar solicitud
    if (!req.body) {
        res.status(400).send({ message: "¡El contenido no puede estar vacío!" });
        return;
    }

   
    // nuevo Producto
    const pedido = new Pedidodb({
        Date: req.body.Date,
        name: req.body.name,
        address: req.body.address,
        telephone: req.body.telephone,
        nameDomic: req.body.nameDomic,
        TypeProduct: req.body.TypeProduct,
        NameProduct: req.body.NameProduct,
        price: req.body.price,
        priceTotal: req.body.priceTotal,
        earnings:req.body.price*0.2,
    })

            pedido
                .save(pedido)
                .then(data => {
                    res.redirect('/new_pedido');
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "Se produjo un error al crear una operación de creación"
                    });
                });

   
    //Guardar producto en la base de datos
    
}

exports.createproduct = (req, res) => {
    // validar solicitud
    if (!req.body) {
        res.status(400).send({ message: "¡El contenido no puede estar vacío!" });
        return;
    }

   
    // nuevo Producto
    const producto = new Productodb({
        type: req.body.type,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    })

   
    //Guardar producto en la base de datos
    producto
        .save(producto)
        .then(data => {

            res.redirect('/add-product');
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Se produjo un error al crear una operación de creación"
            });
        });

}

exports.findLiquds = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;

        Liquiddb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Pedido no encontrado con id " + id })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error recuperando pedido con id " + id })
            })

    } else {
        Liquiddb.find()
            .then(pedido => {
                res.send(pedido)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Se produjo un error al recuperar la información del Domiciliario" })
            })
    }


}

exports.findOrder = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;

        Pedidodb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Pedido no encontrado con id " + id })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error recuperando pedido con id " + id })
            })

    } else {
        Pedidodb.find()
            .then(pedido => {
                res.send(pedido)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Se produjo un error al recuperar la información del Domiciliario" })
            })
    }


}
// recuperar y devolver todos los productos / recuperar y devolver un solo productos
exports.findproduct = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;

        Productodb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Producto no encontrado con id " + id })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error recuperando Producto con id " + id })
            })

    } else {
        Productodb.find()
            .then(product => {
                res.send(product)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Se produjo un error al recuperar la información del Domiciliario" })
            })
    }


}
// recuperar y devolver todos los domiciliarios / recuperar y devolver un solo domiciliario
exports.finddomic = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;

        Domiciliariodb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Domiciliario no encontrado con id " + id })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error recuperando Domiciliario con id " + id })
            })

    } else {
        Domiciliariodb.find()
            .then(domic => {
                res.send(domic)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Se produjo un error al recuperar la información del Domiciliario" })
            })
    }


}

// Actualizar un nuevo Domiciliario identificado por ID de Domiciliario
exports.updatedomic = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Los datos para actualizar no pueden estar vacíos" })
    }

    const id = req.params.id;
    Domiciliariodb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `No se puede actualizar el domiciliario con ${id}. ¡Quizás no se encuentra el Domiciliario!` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error al actualizar la información del Domiciliario" })
        })
}
// Actualizar un nuevo prodcuto ID
exports.updateproduct = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Los datos para actualizar no pueden estar vacíos" })
    }

    const id = req.params.id;
    Productodb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `No se puede actualizar el producto con ${id}. ¡Quizás no se encuentra el producto!` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error al actualizar la información del Producto" })
        })
}

// Eliminar un Domiciliario con la identificación de Domiciliario especificada en la solicitud
exports.deletedomic = (req, res) => {
    const id = req.params.id;
    Domiciliariodb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `No se puede eliminar con id ${id}. Tal vez la identificación esté mal` })
            } else {
                res.send({
                    message: "¡El domiciliario fue eliminado correctamente!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar el Domiciliario con id =" + id
            });
        });
}
exports.updateproduct = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Los datos para actualizar no pueden estar vacíos" })
    }

    const id = req.params.id;
    Productodb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `No se puede actualizar el producto con ${id}. ¡Quizás no se encuentra el producto!` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error al actualizar la información del Producto" })
        })
}

// Eliminar un Domiciliario con la identificación de Domiciliario especificada en la solicitud
exports.deletedomic = (req, res) => {
    const id = req.params.id;
    Domiciliariodb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `No se puede eliminar con id ${id}. Tal vez la identificación esté mal` })
            } else {
                res.send({
                    message: "¡El domiciliario fue eliminado correctamente!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar el Domiciliario con id =" + id
            });
        });
}
// Eliminar un producto
exports.deleteproduct = (req, res) => {
    const id = req.params.id;
    Productodb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `No se puede eliminar con id ${id}. Tal vez la identificación esté mal` })
            } else {
                res.send({
                    message: "¡El Producto fue eliminado correctamente!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar el Producto con id =" + id
            });
        });
}

