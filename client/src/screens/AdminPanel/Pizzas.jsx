import React from 'react';
import useGetPizzas from './customHooks/useGetPizzas';
import MUIDataTable from "mui-datatables";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from 'axios';
import Swal from 'sweetalert2'
import useGetUsuarios from './customHooks/useGetUsuarios';

const Pizzas = () => {

  const autorizacion = useGetUsuarios();
  const data = useGetPizzas();
  const navigate = useNavigate();
  const { id } = useParams()

  const darkTheme = createTheme({
    palette: {
        mode:'dark'
    }
  })

  const editProducto = (id) => {
    console.log(id)
    navigate(`editar/${id}`);
  };

  const verProducto = (id) => {
    console.log(id)
    navigate(`pizza/${id}`)
  }

  const deleteProducto = (id) => {
    Swal.fire({
      title: 'Estas seguro?',
      text: "No puedes revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8000/api/pizzas/${id}`)
          .then(() => {
            Swal.fire(
              'Eliminado!',
              'El producto ha sido eliminado exitosamente.',
              'success'
            ).then(() => {
              window.location.reload();
            });
          })
          .catch((error) => {
            alert('No se ha podido eliminar');
          });
      }
    });
  };
  
  


  const columns = [
    {
      name:"name",
      label:"name",
    },
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
                <button className='btn btn-danger mt-2 mx-2' onClick={() => deleteProducto(tableMeta.rowData[2])}>
                <i className="bi bi-trash3"></i>
                </button>
                <button className='btn btn-danger mt-2 mx-2' onClick={() => editProducto(tableMeta.rowData[2])}>
                <i className="bi bi-pencil"></i>
                </button>
                <button className='btn btn-danger mt-2 mx-2' onClick={() => verProducto(tableMeta.rowData[2])}>
                <i className="bi bi-eye"></i>
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
                      <Link to='/cpanel/adm/agregar' className='btn btn-primary'>Agregar</Link>
                      <Link to='/cpanel/adm' className='btn btn-primary mx-2'>Volver</Link>
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

export default Pizzas