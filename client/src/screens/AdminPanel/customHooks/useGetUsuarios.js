import axios from "axios";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function useGetUsuarios() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8000/api/usuarios")
            .then(response => {
                setData(response.data);
                console.log(data)
            })
            .catch(error => {
                console.log(error);
                if (error.response && error.response.status === 401) {
                    navigate('/');
                }
            });
    }, [navigate]);

    return data;
}

export default useGetUsuarios;
