const { authenticate } = require('../config/jwt.config');
const PizzeriaController = require('../controllers/pizzeria.controller');

module.exports = function (app){
    app.get('/',authenticate, PizzeriaController.index);
    app.post('/getpizzas',authenticate, PizzeriaController.createPizza);
    app.get('/getpizzas',authenticate, PizzeriaController.getpizza);
    app.get('/getallpizzas',authenticate, PizzeriaController.getallpizza);

}