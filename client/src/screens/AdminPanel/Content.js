import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './styles/content.css'
import axios from 'axios';
import useGetUsuarios from './customHooks/useGetUsuarios';

export default function Content() {
  const autorizacion = useGetUsuarios();
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

        <Link  className="col" to={'/'}>
          <div className="card mt-2" id='columna'>
            <div className="card-body">Volver a la pagina de inicio</div>
          </div>
        </Link>
    </div>
  );
}
