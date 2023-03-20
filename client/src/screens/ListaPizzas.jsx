import React, { useEffect, useState } from 'react'
import { Pizza } from '../components/Pizza'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './style/home.css'; 
import fondo from '../img/fondo.jpg'

axios.defaults.withCredentials = true;

export const ListarPizza = () => {
    const navigate = useNavigate();
    const [valid, setValid]=useState(false);
    const [pizzas, setPizzas] = useState([])

    const cargarPizzas = async () => {
        const resp = await axios.get('http://localhost:8000/getpizzas')
        console.log(resp)
        setPizzas(resp.data)
    }

useEffect(() => {
    axios.get("http://localhost:8000/getpizzas", { withCredentials: true })
    .then(() => {
        console.log("OK");
        setValid(true);
    })
    .catch((error) => {
        console.log(error);
        navigate("/");
    });
    cargarPizzas();
}, []);

    return (
        <div>
            <div className='row'>
                <div className='catalogoiniciofondo'>
                    <p className='catalogoinicio' > CATALOGO </p>
                </div>
                {pizzas.map((pizza) =>{
                    return <div className='col-md-4' key={ pizza._id }>
                        <div >
                            <Pizza pizza={pizza}/>
                        </div>
                    </div>
                }
                    )}
            </div>
        </div>
        )
}
