import React from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';


const PizzaErrores = Yup.object().shape({
    name: Yup.string()
        .required('Requerido'),
    image: Yup.string()
        .required('La imagen es requerida.'),
    category: Yup.string()
        .required('La categoria es requerida.'),
    description: Yup.string()
        .required('La descripción es requerida.'),
});

const PersonaForm = ({initialValues, botonTexto, onSubmit}) => {

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={PizzaErrores}
    >
      {({ errors, touched, isValid, dirty }) => (
        <Form style={{backgroundColor:"grey", padding:"15px", border: "5px solid"}}>
          <Field name="name" className="form-control" placeholder="Título" />
          {touched.name && errors.name && (
            <div className="ms-3 mt-1 text-danger">{errors.name}</div>
          )}
          <Field
            name="image"
            className="form-control mt-2"
            placeholder="Imagen"
          />
          {touched.image && errors.image && (
            <div className="ms-3 mt-1 text-danger">{errors.image}</div>
          )}

          <Field
            name="category"
            as="select"
            className="form-control mt-2"
            placeholder="Categoria"
          >
            <option value="">Selecciona una categoria</option>
            <option value="vegetariano">Vegetariano</option>
            <option value="no vegetariano">No Vegetariano</option>
          </Field>

          {touched.category && errors.category && (
            <div className="ms-3 mt-1 text-danger">{errors.category}</div>
          )}

          <div className='m-2' style={{display : "flex", justifyContent:"center", alignItems: "center"}}>
            <label style={{color : "white"}}>Precio de Pizza entera:</label>
            <Field
              name={`prices[0].entero`}
              className="form-control mt-2"
              placeholder="Precio entero"
              type="number"
            />
          </div>
          <div className='m-2' style={{display : "flex", justifyContent:"center", alignItems: "center"}}>
          <label style={{color : "white"}}>Precio de Pizza mitad:</label>
          <Field
            name={`prices[0].mitad`}
            className="form-control mt-2"
            placeholder="Precio mitad"
            type="number"
          />
          </div>

          <Field
            name="description"
            className="form-control mt-2"
            placeholder="Descripción"
            as="textarea"
          />
          {touched.description && errors.description && (
            <div className="ms-3 mt-1 text-danger">{errors.description}</div>
          )}
          <button
            className="btn btn-primary mt-5"
            disabled={!(isValid && dirty)}
          >
            {botonTexto} Pizza
          </button>
          <Link className="btn mt-5 mx-2" to={"/cpanel/adm/products"}>
            Volver
          </Link>
        </Form>
      )}
    </Formik>
  );
}

export default PersonaForm