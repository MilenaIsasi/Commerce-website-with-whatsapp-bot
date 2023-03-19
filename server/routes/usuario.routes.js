const { authenticate , admin } = require('../config/jwt.config');
const UsuarioController = require('../controllers/usuario.controller');

module.exports = function (app){
    // app.get('/', UsuarioController.index);
    app.post('/api/usuario', UsuarioController.createUser);
    app.get('/api/usuarios/salir', UsuarioController.logout)
    app.get('/api/usuarios/:id', UsuarioController.getUsuario);
    app.post('/api/usuario/login', UsuarioController.login);
    app.get('/api/usuarios', authenticate, UsuarioController.getAllUsuarios);
    app.get('/api/usuarios/all', UsuarioController.get_all);
    app.get("/api/admin", admin, (req, res) => { res.status(200).json({}) })



}