import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import useGetUsuarios from '../customHooks/useGetUsuarios';

const PizzaDetalle = () => {
    const autorizacion = useGetUsuarios();
    const estilo = {
        display: 'flex', alignItems: 'center', justifyContent:'center'
    }
    const { id } = useParams()
    const [pizza, setPizza] = useState({})

    useEffect(() => {

        const getData = async () => {
            const respuesta = await axios.get(`http://localhost:8000/api/pizza/${id}`);
            setPizza(respuesta.data);
        }

        getData();

    }, [id])

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div className="card">
            <div className="card-header" style={estilo}>
                Detalle de la Pizza
            </div>
            <div className="card-body">
                <h5 className="card-title" style={estilo}>Título: {pizza.name}</h5>
                <h2 className="card-text mt-4" style={estilo}>Imagen:</h2>
                <div style={estilo}>
                    <img style={{maxHeight: "300px"}} src={pizza.image} alt='imagen de la pizza' />
                </div>
                <h2 className="card-text mt-4" style={estilo}>Categoria: {pizza.category}</h2>
                <p className="card-text mt-4" style={{maxWidth:"600px"}}>Descripción: {pizza.description}</p>
                <Link style={estilo} className="btn btn-primary" to="/cpanel/adm/products" >Volver</Link>
            </div>
        </div>
        </div>
    )
}

export default PizzaDetalle