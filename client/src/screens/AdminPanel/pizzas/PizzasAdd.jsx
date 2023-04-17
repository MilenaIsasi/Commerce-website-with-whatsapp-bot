import React from 'react'
import PizzaForm from '../../../components/PizzaForm'
import axios from 'axios';
import Swal from 'sweetalert2'
import useGetUsuarios from '../customHooks/useGetUsuarios';

const PizzasAdd = () => {
  const autorizacion = useGetUsuarios();
  const initialValues = {
    name: "",
    image: "",
    prices: [0],
    category: "",
    description: "",
    varients: ["entero", "mitad"],
  }

  const crearPizza = async(values, actions) => {

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
        <h1 style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:"center", color: 'white'}}>Agregar Pizza</h1>
        <hr />
        <div className="row" style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:"center"}}>
            <div className="col-lg-4 col-sm-12 col-md-6">
                <PizzaForm 
                  initialValues={initialValues}
                  botonTexto="Agregar"
                  onSubmit={crearPizza}
                />
            </div>
        </div>
    </>
  )
}

export default PizzasAdd