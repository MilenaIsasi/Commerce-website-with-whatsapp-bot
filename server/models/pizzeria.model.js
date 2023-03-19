const mongoose = require ('mongoose');

const PizzeriaSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
    },
    varients:[],
    prices:[],
    category:{
        type: String,
        required:true,
    },
    image:{
        type: String,
        required:true,

    },
    description: {
        type: String,
        required:true,

    },
    inCart: { type: Boolean, default: false },




},  { timestamps: true });



module.exports.Pizzeria = mongoose.model('Pizzeria', PizzeriaSchema);