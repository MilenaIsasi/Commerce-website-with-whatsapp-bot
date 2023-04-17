import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

const UserErrores = Yup.object().shape({
  name: Yup.string(),
  lastname: Yup.string()
});

const EditUserForm = ({ initialValues, botonTexto, onSubmit }) => {
  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={UserErrores}
    >
      {({ errors, touched, isValid, dirty }) => (
        <Form
          style={{
            backgroundColor: "grey",
            padding: "15px",
            border: "5px solid",
          }}
        >
          <Field name="name" className="form-control" placeholder="Título" />
          {touched.name && errors.name && (
            <div className="ms-3 mt-1 text-danger">{errors.name}</div>
          )}

          <Field
            name="lastName"
            className="form-control"
            placeholder="Título"
          />
          {touched.lastName && errors.lastName && (
            <div className="ms-3 mt-1 text-danger">{errors.lastName}</div>
          )}

          <Field
            name="rol"
            as="select"
            className="form-control mt-2"
            placeholder="Rol"
          >
            <option value="">Selecciona una categoria</option>
            <option value="cliente">Cliente</option>
            <option value="admin">Admin</option>
          </Field>

          <button
            className="btn btn-primary mt-5"
            disabled={!(isValid && dirty)}
          >
            {botonTexto} User
          </button>
          <Link className="btn mt-5 mx-2" to={"/cpanel/adm/users"}>
            Volver
          </Link>
        </Form>
      )}
    </Formik>
  );
};

export default EditUserForm;
