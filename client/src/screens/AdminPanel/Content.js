import React from 'react'
import { Link } from 'react-router-dom'
import './styles/content.css'

export default function Content() {
  return (
    <div className='container text-center' style={{width: "250px"}}>
      <div className='contenedor'>
        
        <Link  className="col" to={'users'}>
          <div className="card mt-2" id='columna'>
            <div className="card-body">Ver Usuarios</div>
          </div>
        </Link>
      </div>

      <Link  className="col" to={'products'}>
          <div className="card mt-2" id='columna'>
            <div className="card-body">Ver / Agregar Productos</div>
          </div>
        </Link>

        <Link  className="col" to={'/home'}>
          <div className="card mt-2" id='columna'>
            <div className="card-body">Volver a la pagina de inicio</div>
          </div>
        </Link>
    </div>
  );
}
