import nodemailer from 'nodemailer';

import React from 'react'

const BotonMail = async () => {

  const enviarEmail = async () => {
    
    const config = {
        host : 'smtp.gmail.com',
        port : 587,
        auth : {
            user : 'pizzabot.py@gmail.com',
            pass : 'ryqfpwdrvwcxnfmb'
        }
    }

const mensaje = {
    from: 'pizzabot-py@gmail.com',
    to : 'pizzabot-py@gmail.com',
    subjetct : 'Correo de puerbas',
    text: 'Envio de correo desde node con nodemailer'
}

const transport = nodemailer.createTransport(config);

const info = await transport.sendMail(mensaje);

console.log(info);
}

  return (
    <button onClick={enviarEmail}>BotonMail</button>
  )
}

export default BotonMail