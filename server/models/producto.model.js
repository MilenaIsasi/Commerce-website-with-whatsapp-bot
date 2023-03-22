const mongoose = require ('mongoose');

const ProductoSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
    },
    price:{
        type: Number,
        required: [true, "Price is required"],
    },
},  { timestamps: true });



module.exports.Producto = mongoose.model('Producto', ProductoSchema);