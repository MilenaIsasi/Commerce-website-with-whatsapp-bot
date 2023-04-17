import React, { useEffect, useState } from 'react';
import useGetUsuarios from './customHooks/useGetUsuarios';
import MUIDataTable from "mui-datatables";
import { Link, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from 'axios';
import CargaAuth from '../../components/CargaAuth';
import Swal from "sweetalert2";

const AdministrarUsuarios = () => {

  const [cargando, setCargando] = useState(true)
  const navigate = useNavigate();
  const data = useGetUsuarios();

  useEffect(() => {
    if (data && data.length > 0) {
        setCargando(false);
    }
}, [data]);

const editProducto = (id) => {
  console.log(id)
  navigate(`editar/${id}`);
};

  const darkTheme = createTheme({
    palette: { 
        mode:'dark'
    }
  })

  const deleteUser = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, bórralo!",
      cancelButtonText: "Cancelar",
    });
  
    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8000/api/usuario/${id}`);
        await Swal.fire("Eliminado!", "El usuario ha sido eliminado.", "success");
        window.location.reload();
      } catch (error) {
        console.error(error);
        await Swal.fire("Error!", "No se ha podido eliminar.", "error");
      }
    }
  };

  const columns = [
    {
      name:"name",
      label:"name",
    },
    {
      name:"email",
      label:"email"
    },
    {
      name: "_id",
      label: 'ACCIONES',
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>
                <button className='btn btn-danger ms-2' onClick={() => deleteUser(tableMeta.rowData[2])}>
                <i className="bi bi-trash3"></i>
                </button>
                <button className='btn btn-danger ms-2' onClick={() => editProducto(tableMeta.rowData[2])}>
                <i className="bi bi-pencil"></i>
                </button>
            </div>
          );
        }}}];

        const options = {
            selectableRows:'none',
            };

return (
    <>
                {cargando ? (
                <CargaAuth />
            ) : (
        <div className='container'>
          <div className=''>
            <div>
            </div>
            <section>
              <div className="card">
                <div className="card-body ">
                  <div className="d-flex justify-content-between p-md-1">
                    <div className="d-flex flex-row">
                      <div>
                        <h4>Total usuarios:</h4>
                        <p className="mb-0 fs-1">{data.length}</p>
                      </div>
                    </div>
                    <div className="align-self-center">
                      <Link to='/cpanel/adm' className='btn btn-primary m-2'>Volver</Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div>
            <ThemeProvider theme={darkTheme}>
              <MUIDataTable
                title={"PIZZA DOJO"}
                data={data}
                columns={columns}
                options={options}
              />
            </ThemeProvider>
          </div>
        </div>
        )}
    </>
);
};

export default AdministrarUsuarios