import React from 'react';
import useGetPizzas from './customHooks/useGetPizzas';
import MUIDataTable from "mui-datatables";
import { Link, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import axios from 'axios';

const AdministrarProductos = () => {

  const data = useGetPizzas();
  const navigate = useNavigate();

  const darkTheme = createTheme({
    palette: {
        mode:'dark'
    }
  })

  const deleteProducto = (id) => {
    try {
      axios.delete(`http://localhost:8000/api/pizzas/${id}`)
   } catch {
      alert("no se ha podido eliminar")
   }
   navigate('/cpanel')
  }
  
  const detalleProducto = (id) => {
    try {
      axios.get(`http://localhost:8000/api/pizza/${id}`)
      console.log(id)
   } catch {
      alert("no se ha podido eliminar")
   }
  }

  const columns = [
    {
      name:"name",
      label:"name",
    },
    // {
    //   name:"varients",
    //   label:"varients"
    // },
    // {
    //   name:"prices",
    //   label:"prices"
    // },
    {
      name:"description",
      label:"description"
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
                <button className='btn btn-danger ms-2' onClick={() => deleteProducto(tableMeta.rowData[2])}>
                <i className="bi bi-trash3"></i>
                </button>
                <button className='btn btn-danger ms-2' onClick={() => detalleProducto(tableMeta.rowData[2])}>
                <i className="bi bi-clipboard2"></i>
                </button>
                <button className='btn btn-danger ms-2' onClick={() => detalleProducto(tableMeta.rowData[2])}>
                <i class="bi bi-pencil"></i>
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
                        <h4>Total productos:</h4>
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

export default AdministrarProductos