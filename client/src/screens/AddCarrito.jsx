import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContex";
import "./style/carrito.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AddCarrito = () => {
  const navigate = useNavigate();
  const [valid, setValid]=useState(false);
  const { products, setProducts } = useContext(CartContext);
  const [total, setTotal] = useState([]);

  const notify = () => toast.success(`Comprado con exito`, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });;

  const comprarPizzas = () => {
    setTotal(0);
    notify();
  } 

  const handleRemoveFromCart = (i) => {
    const totalRemove = products[i].price
    const prod = products.filter((product) => product !== products[i]);
    setProducts(prod);
    setTotal(total - totalRemove)
    localStorage.removeItem("cart");
    localStorage.setItem("cart", JSON.stringify(prod));

  };

  const totalPizza = () => {
    let reduce = products.reduce(
      (acumulador, actual) => acumulador + actual.price,
      0
    );
    setTotal(reduce);
    console.log(total);
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
  totalPizza();

}, [])

  return (
    <div>
      <div>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
      <div className="col-md-8 cart">
        <div className="title">
          <div className="row">
            <div className="col">
              <h4>
                <b>Mis Pedidos</b>
              </h4>
            </div>
            <div className="col align-self-center text-right text-muted"></div>
          </div>
        </div>
        <div className="table-responsive">
          <div className="col-md-12">
            {products.length ? (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" className="border-0 bg-light">
                      <div className="p-2 px-3 text-uppercase">Producto</div>
                    </th>
                    <th scope="col" className="border-0 bg-light">
                      <div className="py-2 text-uppercase">Cantidad</div>
                    </th>
                    <th scope="col" className="border-0 bg-light">
                      <div className="py-2 text-uppercase">Tamaño</div>
                    </th>
                    <th scope="col" className="border-0 bg-light">
                      <div className="py-2 text-uppercase">Price</div>
                    </th>
                    <th scope="col" className="border-0 bg-light">
                      <div className="py-2 text-uppercase">Remove</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((product, i) => (
                    <tr key={i}>
                      <td className="border-0 align-middle">{product.name}</td>
                      <td className="border-0 align-middle">
                        {product.quantify}
                      </td>
                      <td className="border-0 align-middle">
                        {product.varient}
                      </td>
                      <td className="border-0 align-middle">{product.price}</td>

                      <td>
                        <button
                          className="botondelete"
                          onClick={() => handleRemoveFromCart(i)}
                        >
                          <i className="bi bi-trash3" id="delete"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No existen items en el carrito</p>
            )}
            {products.length ? <h3>Total: {total + " Gs"}</h3> : null}
            {products.length ? (
              <button onClick={comprarPizzas}>Procesar compra</button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCarrito;
