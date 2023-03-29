import React from 'react'
import axios from 'axios';
import Swal from 'sweetalert2'
import ProductoForm from '../../../components/ProductosForm';

const ProductosAdd = () => {
  const initialValues = {
    name: '',
    varients: '',
    prices: '', 
    category: '',
    image: '',
    description: '',
  }

  const crearProducto = async(values, actions) => {

    try {
        const respuesta = await axios.post("http://localhost:8000/getpizzas", values);
        console.log(respuesta);
        if (respuesta.status === 200){
            Swal.fire({
                icon: 'success',
                title: 'GENIAL!!!',
                text: `Se ha agregado ${respuesta.data.name} perfectamente!`,
            });

            actions.resetForm(initialValues);
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
        <h1>Agregar Nuevos Productos</h1>
        <hr />
        <div className="row">
            <div className="col-lg-4 col-sm-12 col-md-6">
                <ProductoForm 
                  initialValues={initialValues}
                  botonTexto="Agregar"
                  onSubmit={crearProducto}
                />
            </div>
        </div>
    </>
  )
}

export default ProductosAdd