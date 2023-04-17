require ('dotenv').config()
const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const puerto = process.env.PUERTO; 


const app = express();


require('./config/mongoose.config');
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000', exposedHeaders:['set-cookie']}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./routes/pizzeria.routes')(app) 
require('./routes/usuario.routes')(app) 
require('./routes/productos.routes')(app) 

app.listen(puerto, () => {
    console.log("Listening at Port " + puerto);
});