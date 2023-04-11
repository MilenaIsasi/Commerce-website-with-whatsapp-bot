import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2'

const EditarProductos = () => {
  const navigate = useNavigate();

  const backToHome = () => {
    navigate("/cpanel/adm/products");
  };

  const { id } = useParams();
  const [producto, setProducto] = useState("");

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/pizza/${id}`);
        console.log(response.data);
        setProducto({
          name: response.data.name,
          image: response.data.image,
          category: response.data.category,
          description: response.data.description,
        });
        console.log(producto)
      } catch (error) {
        console.error("Error al obtener la pizza:", error);
      }
    };
    obtenerProducto();
  }, [id]);


  const actualizarProducto = async(values, actions) => {

    try {
        const respuesta = await axios.put(`http://localhost:8000/api/pizza/${id}`, values);
        console.log(respuesta);
        if (respuesta.status === 200){
            Swal.fire({
                icon: 'success',
                title: 'GENIAL!!!',
                text: `Se ha actualizado ${respuesta.data.name} perfectamente!`,
            });

            navigate('/personas');
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


  const { handleSubmit, handleChange } = useFormik({

    onSubmit: (values, actions) => {
      axios.post("http://localhost:8000/getpizzas", values)
        .then((resp) => {
          console.log(resp);
          if (resp.status === 200) {
            Swal.fire({
              icon: 'success',
              title: 'GENIAL!!!',
              text: `Se ha agregado ${resp.data.name} Correctamente!`,
          });
          navigate('/cpanel/adm');
          } else {
            console.log("Error al agregar el producto");
          }
        })
        .catch((error) => console.log(error));
    },
    
  });

  return (
    <>
      <div>
        <div className="container" style={{ width: "250px", height: "auto" }}>
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <h1 className="container mb-4" style={{ color: "white" }}>
              Agregar un nuevo producto
            </h1>
            <input
              className="form-control item mt-4"
              id="name"
              type="text"
              placeholder="Nombre de la Pizza"
              name="name"
              onChange={handleChange}
              value={producto.name}
            />
            <input
              className="form-control item mt-4"
              id="image"
              type="text"
              placeholder="Url de la pizza"
              name="image"
              onChange={handleChange}
              value={producto.image}
            />
            <select
              className="form-control item mt-4"
              id="category"
              name="category"
              onChange={handleChange}
            >
              <option value={producto.category}>{producto.category}</option>
              <option value="vegetariano">Vegetariano</option>
              <option value="no vegetariano">No vegetariano</option>
            </select>
            <input
              className="form-control item mt-4"
              id="description"
              type="text"
              placeholder="description"
              name="description"
              onChange={handleChange}
              value={producto.description}
            />

            <button onSubmit={actualizarProducto} className="btn btn-block create-account mt-4">
              Editar Producto
            </button>
            <button className="btn mt-4 mx-2" onClick={backToHome}>
              Volver
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditarProductos;
