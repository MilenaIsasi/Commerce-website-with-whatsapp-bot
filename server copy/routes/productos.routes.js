const { authenticate } = require('../config/jwt.config');
const ProductoController = require('../controllers/productos.controller');

module.exports = function (app){
    app.get('/producto', ProductoController.index);
    app.post('/api/crearProducto', ProductoController.createProducto);
    app.get('/api/getproductos',authenticate, ProductoController.getproducto);
    app.get('/api/getallproductos', ProductoController.getallproducto);
}