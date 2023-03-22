import axios from "axios";
import { useState, useEffect } from 'react';

function useGetProductos() {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      axios.get('http://localhost:8000/api/getallproductos')
        .then(response => {
          setData(response.data);
          console.log(data)
        })
        .catch(error => {
          console.log(error);
        });
    }, []);
  
    return data;
  }

export default useGetProductos;