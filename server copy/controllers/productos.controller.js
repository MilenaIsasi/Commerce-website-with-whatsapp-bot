const { Producto } = require ("../models/producto.model")

module.exports.index = (request, response) => {
    response.json({
    message: "Hello World "
    });
}

module.exports.createProducto = async (request, response) => {
    try {
        const producto= new Producto(request.body);
        await producto.save();
        response.json({msg:"Producto Registrado", producto});
    } catch (error) {
        response.status(400);
        response.json(error);
    }
}

module.exports.getproducto = async (request, response) => {
    try {
        const productos = await Producto.find({})
        response.json(productos);
    } catch (error) {
        response.status(400);
        response.json(error);
    }
}


module.exports.getallproducto = async (request, response) => {
    try {
        const productos = await Producto.find({})
        response.json(productos);
    } catch (error) {
        response.status(400);
        response.json(error);
    }
}

module.exports.deletePizza = async (request, response) => {
    try {
        const productos = await Producto.deleteOne({ _id: request.params.id })
        response.json(productos);
    } catch (error) {
        response.status(400);
        response.json(error);
    }
}



module.exports.getPizza = async (request, response) => {
    try {
        const productos = await Pizza.findOne({_id:request.params.id})
        response.json(productos);
    } catch (error) {
        response.status(400);
        response.json(error);
    }
}

