const mongoose = require ('mongoose');

const PizzeriaSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    varients:[],
    prices:[],
    category:{
        type: String,
    },
    image:{
        type: String,

    },
    description: {
        type: String,

    },
    inCart: { type: Boolean, default: false },




},  { timestamps: true });



module.exports.Pizzeria = mongoose.model('Pizzeria', PizzeriaSchema);