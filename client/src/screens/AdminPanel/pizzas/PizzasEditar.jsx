import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PizzaForm from '../../../components/PizzaForm'
import axios from 'axios';
import Swal from 'sweetalert2'

const PizzaEditar = () => {
    const navigate = useNavigate();
    const initialValues = {
        name: "",
        image: "",
        prices: [0],
        category: "",
        description: "",
        varients: ["entero", "mitad"],
      }

    const { id } = useParams()
    const [pizza, setPizza] = useState(initialValues)

    useEffect(() => {

        const getData = async () => {
            const respuesta = await axios.get(`http://localhost:8000/api/pizza/${id}`);
            setPizza(respuesta.data);
        }

        getData();

    }, [id])

    const actualizarPizza = async(values, actions) => {

        try {
            const respuesta = await axios.put(`http://localhost:8000/api/pizza/${id}`, values);
            console.log(respuesta);
            if (respuesta.status === 200){
                Swal.fire({
                    icon: 'success',
                    title: 'GENIAL!!!',
                    text: `Se ha actualizado ${respuesta.data.nombre} perfectamente!`,
                });

                navigate('/cpanel/adm/products');
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Ops que mal!!!',
                text: `Error: ${error?.response?.data?.message || error.message}`,
            })
        }
      }

    return (
        <>
            <h1>Editar Pizza</h1>
            <hr />
            <div className="row">
                <div className="col-lg-4 col-sm-12 col-md-6">
                    <PizzaForm 
                        initialValues={pizza}
                        botonTexto="Actualizar"
                        onSubmit={actualizarPizza}
                    />
                </div>
            </div>
        </>
    )
}

export default PizzaEditar