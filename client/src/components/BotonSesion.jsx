import React, { useState } from 'react'
import Cookies from 'universal-cookie';

const BotonSesion = () => {

    const [sesion, setSesion] = useState(false);

const handleLogout = () => {
    console.log(Cookies.get('myCater')); // Pacman
}

const handleLogin = () => {
    console.log(Cookies.get('myCater')); // Pacman
}


  return (
    <>
        {sesion
        ? <button onClick={handleLogout}>Cerrar sesión</button>
        : <button onClick={handleLogin}>Iniciar sesión</button>
      }
    </>
  )
}

export default BotonSesion