import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
const ProductDetails = () => {
    const { id } = useParams()
    const [data, setData] = useState({})

    useEffect(() => {

        const getData = async () => {
            const respuesta = await axios.get(`${process.env.REACT_APP_API_URL}/data/${id}`);
            setData(respuesta.data);
        }
        getData();
    }, [id])

    return (
        <div className='container'>
            <div className='card text-center mt-5 '>
                <div className='card-header bg-black text-white'>
                    <h1>Detalles</h1>
                </div>
                <div className='card-body'>
                    <h3 className='card-title'>Detalles {data.categoria} </h3>
                    <div className="container-items-detalles mb-2">
                        <h5 className="card-text">Agencia: {data.agencia}</h5>
                        <h5 className="card-text">Tipo de dato: {data.debeHaber} </h5>
                        <h5 className="card-text">Monto: {data.monto} </h5>
                        <h5 className="card-text">Descripción: {data.descripcion} </h5>
                    </div>
                    <div className="card-footer bg-black text-white" >
                        <p className="card-text">Fecha: {data.fecha}</p>
                        <div>
                            <Link className='btn btn-primary' to='/data'>Volver <i className="bi bi-house-up-fill"></i></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails