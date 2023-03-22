import axios from "axios";
import { useFormik } from "formik";
import React from "react";
// import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductosForm = () => {
  
//   const navigate = useNavigate();
  const { handleSubmit, handleChange } = useFormik({
    initialValues: {
      name: "",
      img: "",
      prices: "",
      category: "",
      description:"",
      varients:"",
    },
    onSubmit: (values) => {
        const resp = axios.post(
            "http://localhost:8000/getpizzas",
            values,
          );
          console.log(resp);
          if (resp.data === 200) {
            console.log(resp);
          } else {
           console.log(resp)
          }
        },
      });

  return (
    <>
            <div>
            <ToastContainer position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"/>
        </div>
      <form onSubmit={handleSubmit}>
          <input
            className="form-control item"
            id="name"
            type="string"
            placeholder="Nombre de la Pizza"
            name="name"
            onChange={handleChange}
          />
        <input
            className="form-control item"
            id="image"
            type="string"
            placeholder="Url de la pizza"
            name="image"
            onChange={handleChange} />
          <input
            className="form-control item"
            id="prices"
            type="array"
            placeholder="prices"
            name="prices"
            onChange={handleChange}
          />
        <input
            className="form-control item"
            id="description"
            type="string"
            placeholder="description"
            name="description"
            onChange={handleChange}
            />
             <input
            className="form-control item"
            id="varients"
            type="string"
            placeholder="varients"
            name="varients"
            onChange={handleChange}
            />

          <button type="submit" className="btn btn-block create-account" >
            Crear cuenta
          </button>
      </form>
    </>
  );
};

export default ProductosForm;
