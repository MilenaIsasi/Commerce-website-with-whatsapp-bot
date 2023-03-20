import React from 'react';
import useGetUsuarios from './customHooks/useGetUsuarios';
import MUIDataTable from "mui-datatables";
import { Link, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from 'axios';

const AdministrarUsuarios = () => {

  const data = useGetUsuarios();
  const navigate = useNavigate();

  const darkTheme = createTheme({
    palette: {
        mode:'dark'
    }
  })

  const deleteUser = (id) => {
    try {
      axios.delete(`http://localhost:8000/api/usuario/${id}`)
   } catch {
      alert("no se ha podido eliminar")
   }
   navigate('/cpanel/adm/users')
  }

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
            </div>
          );
        }}}];

        const options = {
            selectableRows:'none',
            };

return (
    <>
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
                      <Link to='/data/new' className='btn btn-primary m-2'>Agregar nuevo</Link>
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
    </>
);
};

export default AdministrarUsuarios