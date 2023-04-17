import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2'
import useGetUsuarios from '../customHooks/useGetUsuarios';
import EditUserForm from './EditUserForm';

const UsuarioEditar = () => {
    const autorizacion = useGetUsuarios();
    const navigate = useNavigate();
    const initialValues = {
        name: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword:"",
        rol:""
      }

    const { id } = useParams()
    const [usuario, setUsuario] = useState(initialValues)

    useEffect(() => {

        const getData = async () => {
            const respuesta = await axios.get(`http://localhost:8000/api/usuarios/${id}`);
            setUsuario(respuesta.data);
        }

        getData();

    }, [id])

    const actualizarUsuario = async(values, actions) => {

        try {
            const respuesta = await axios.put(`http://localhost:8000/api/usuario/${id}`, values);
            console.log(respuesta);
            if (respuesta.status === 200){

                Swal.fire({
                    icon: 'success',
                    title: 'GENIAL!!!',
                    text: `Se ha actualizado ${respuesta.data.name} perfectamente!`,
                });

                navigate('/cpanel/adm/users');
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
            <h1>Editar Usuario</h1>
            <hr />
            <div className="row">
                <div className="col-lg-4 col-sm-12 col-md-6">
                    <EditUserForm 
                        initialValues={usuario}
                        botonTexto="Actualizar"
                        onSubmit={actualizarUsuario}
                    />
                </div>
            </div>
        </>
    )
}

export default UsuarioEditar