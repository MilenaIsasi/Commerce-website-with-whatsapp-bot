const { Pizzeria } = require ("../models/pizzeria.model")

module.exports.index = (request, response) => {
    response.json({
    message: "Hello World "
    });
}

module.exports.createPizza = async (request, response) => {
    try {
        const { name, varients , prices, category, image, description} = request.body;
        pizza = await Pizzeria.create({
            name ,
            varients ,
            prices , 
            category ,
            image ,
            description
        });
        response.json(pizza);
    } catch (error) {
        response.status(400);
        response.json(error);
    }
}

module.exports.getpizza = async (request, response) => {
    try {
        const pizzas = await Pizzeria.find({})
        response.json(pizzas);
    } catch (error) {
        response.status(400);
        response.json(error);
    }
}


module.exports.getallpizza = async (request, response) => {
    try {
        const pizzas = await Pizzeria.find({})
        response.json(pizzas);
    } catch (error) {
        response.status(400);
        response.json(error);
    }
}

module.exports.deletePizza = async (request, response) => {
    try {
        const pizzas = await Pizzeria.deleteOne({ _id: request.params.id })
        response.json(pizzas);
    } catch (error) {
        response.status(400);
        response.json(error);
    }
}



module.exports.getPizza = async (request, response) => {
    try {
        const pizzas = await Pizza.findOne({_id:request.params.id})
        response.json(pizzas);
    } catch (error) {
        response.status(400);
        response.json(error);
    }
}

