import axios from "axios";
import { useState, useEffect } from 'react';

function useGetUsuarios() {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      axios.get("http://localhost:8000/api/usuarios")
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

export default useGetUsuarios;