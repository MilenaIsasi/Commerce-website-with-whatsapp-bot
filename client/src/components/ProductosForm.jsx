import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2'

const ProductosForm = () => {
  const navigate = useNavigate();

  const backToHome = () => {
    navigate("/cpanel/adm/products");
  };

  const { handleSubmit, handleChange, resetForm } = useFormik({
    initialValues: {
      name: "",
      image: "",
      prices: [
        {
          personal: 45000,
          mediano: 60000,
          grande: 70000,
        },
      ],
      category: "",
      description: "",
      varients: ["personal", "mediano", "grande"],
    },
    onSubmit: (values, actions) => {
      axios.post("http://localhost:8000/getpizzas", values)
        .then((resp) => {
          console.log(resp);
          if (resp.status === 200) {
            Swal.fire({
              icon: 'success',
              title: 'GENIAL!!!',
              text: `Se ha agregaddo ${resp.data.name} Correctamente!`,
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
            />
            <input
              className="form-control item mt-4"
              id="image"
              type="text"
              placeholder="Url de la pizza"
              name="image"
              onChange={handleChange}
            />
            <select
              className="form-control item mt-4"
              id="category"
              name="category"
              onChange={handleChange}
            >
              <option value="">Selecciona una opción</option>
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
            />

            <button type="submit" className="btn btn-block create-account mt-4">
              Agregar Producto
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

export default ProductosForm;
