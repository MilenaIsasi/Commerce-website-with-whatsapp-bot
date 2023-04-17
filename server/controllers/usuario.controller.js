const bcrypt = require('bcryptjs');
const { response } = require('express');
const { Usuario } = require("../models/usuario.model")
const jwt = require("jsonwebtoken");

module.exports.createUser = async (request, response) => {
  try {
    const { email } = request.body;
    const existingUser = await Usuario.findOne({ email });

    if (existingUser) {
      return response.status(400).json({ msg: 'Ya existe un usuario con este email.' });
    }

    const usuario = new Usuario(request.body);
    await usuario.save();
    response.json({ msg: 'Usuario registrado', usuario });
  } catch (error) {
    response.status(400).json(error);
  }
};

module.exports.updateUser = async (request, response) => {
    try {
        const usuario = await Usuario.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        response.json(usuario);
    } catch (error) {
        response.status(400);
        response.json(error);
    }
}

module.exports.getUsuario = async (request, response)=>{
    try{
        const usuario = await Usuario.findOne({_id:request.params.id})
        response.cookie("mipropiocookie", "valor de la cookie", { httpOnly: true })
        response.json(usuario);
    } catch (error){
        response.status(400);
        response.json(error);
    }

}


module.exports.login = async (request, response) => {
    const {email, password} = request.body
    try {
        const usuario = await Usuario.findOne({email})
        if (!usuario) {
            return response.status(403).json({ mensaje: 'Correo incorrecto' });
        }
        const coincide = await bcrypt.compare(password, usuario.password)
        
        if(coincide){
            const secret = "Esto";

            const newJWT = jwt.sign({
                _id: usuario._id,
                name: `${usuario.name} ${usuario.lastName}`,
                email: usuario.email,
                rol: usuario.rol,
            }, secret)

            response.cookie("user_token", newJWT, { 
                httpOnly: true 
            })
            response.json({usuario});
        }
        else
            return response.status(403).json({ msg: 'Contraseña incorrecta' });
            
    } catch (error){
        response.status(400);
        response.json(error);
    }

}

module.exports.getAllUsuarios = async (request, response) =>{
    try {
        const usuarios = await Usuario.find({});
        response.json(usuarios);
    } catch (error) {
        response.status(400);
        response.json(error);
    }
}

 //SALIR DE SESION
module.exports.logout = (request, response) =>{
    try{
        response.clearCookie("user_token");
        response.json({msg: "Saliste correctamente"});
    } catch (error){
        response.status(400);
        response.json(error);
    }

}

module.exports.get_all = (req, res) => {
    Usuario.find()
        .then(usuarios => res.json({ message: usuarios }))
        .catch(err => res.status(400).json({ message: err }));
}

module.exports.deleteUser = async (request, response) => {
    try {
        const usuario = await Usuario.deleteOne({ _id: request.params.id })
        response.json(usuario);
    } catch (error) {
        response.status(400);
        response.json(error);
    }
}