import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContex";
import "./style/carrito.css";
import "./style/email.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

import emailjs from '@emailjs/browser';
import './style/pagotarjeta.css'



const AddCarrito = () => {
  const navigate = useNavigate();
  const [valid, setValid]=useState(false);
  const { products, setProducts } = useContext(CartContext);
  const [total, setTotal] = useState([]);
  const [show, setShow] = useState(false);
  const [pizza, setpizza] = useState("");


//     ENVIAR AL CORREO!!!! 
  const [pedido, setPedido] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [indicaciones, setIndicaciones] = useState('')


    function gestorDefunciones(e){
      sendEmail(e)
      handleClose()
    }

    function sendEmail(e){
      e.preventDefault();

      if( email === ''){
        alert('DEBE COMPLETAR TODOS LOS CAMPOS');
        return;
      }

      const templatePrams = {
        from_name: name,
        from_pedido: products[0].name + ' , '+ products[1].name , 
        from_email: email,
        from_indicaciones: indicaciones,
      }

      //CONECTO CON EL EMAIL.JS 
      emailjs.send("service_s8eyv1f", "template_jxmypc8", templatePrams, "ZsysG7YaPbzn_ruoe")
      .then((response) => {
        console.log("EMAIL ENVIADO", response.status, response.text)
        setEmail('')
        setPedido('')
        setIndicaciones('')
        setName('')
        limpiarCarrito('')

      }, (err) =>{
        console.log("ERROR", err)
      })
    }




  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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


  
  const limpiarCarrito = () => {
    const totalRemove = 0
    setProducts([]);
    setTotal(total * totalRemove)
    localStorage.removeItem("cart");
    localStorage.setItem("cart", JSON.stringify([]));
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
    <div className="container-carrito">
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
      <div className="col-md-8 cart p-5" id="contenedor" >
        <div className="title">
          <div className="row">
            <div className="col">
              <h4 className="carritoletra">
                Mis Pedidos
              </h4>
            </div>
            <div className="col align-self-center text-right text-muted"></div>
          </div>
        </div>
        <div className="table-responsive" >
          <div className="col-md-12">
            {products.length ? (
              <table className="table" id="tabla">
                <thead id="tabla2">
                  <tr>
                    <th scope="col" className="border-0">
                      <div className="p-2 px-3 text-uppercase">Producto</div>
                    </th>
                    <th scope="col" className="border-0">
                      <div className="py-2 text-uppercase">Cantidad</div>
                    </th>
                    <th scope="col" className="border-0">
                      <div className="py-2 text-uppercase">Tamaño</div>
                    </th>
                    <th scope="col" className="border-0">
                      <div className="py-2 text-uppercase">Precio</div>
                    </th>
                    <th scope="col" className="border-0">
                      <div className="py-2 text-uppercase">Acciones</div>
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
              <p className="carritoletra">No existen items en el carrito</p>
            )}
            {products.length ? <h3 className="carritoletra">Total: {total + " Gs"}</h3> : null}
            {products.length ? (
              <button onClick={handleShow} className="btn mt-3" >Procesar compra</button>
            ) : null}
            <button onClick={limpiarCarrito} className="procesarcompra" >Procesar compra</button>
          </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Titulo</Modal.Title>
          </Modal.Header>

          <Modal.Body>
              <div className="container" style={{display: "flex", justifyContent: "center"}}>
                <form className="form" onSubmit={gestorDefunciones}>      
                  <div>
                    <h2> Resumen de Pedido: </h2>
                    {/* <h2>{ products[0].name + ' , '+ products[1].name }  </h2> */}
                  </div>

                  
                  <input 
                  name="name" 
                  type="text" 
                  className="feedback-input" 
                  placeholder="Escriba su Nombre"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  />
                  <input 
                  name="email" 
                  type="text" 
                  className="feedback-input" 
                  placeholder="Escriba su correo"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  />
                  <input 
                  name="indicaciones" 
                  type="text" 
                  className="feedback-input" 
                  placeholder="Indicaciones para entrega...Si abonara en Efectivo, especifique"
                  onChange={(e) => setIndicaciones(e.target.value)}
                  id="indicaciones"
                  value={indicaciones}
                  />
                  
                  <h2> Datos de Pago </h2>
                  
                  <div className="row justify-content-center">
                    <div className="card">
                      <div className="row">
                          <div className="contenedor_de_imagenestarjeta" >
                              <div className="row d-flex px-3 radio">
                                  <img className="imagendelogotarjeta" src="https://i.imgur.com/WIAP9Ku.jpg" alt='img de mastercard'/>
                                  <p className="my-auto">Credit Card</p>
                              </div>
                              <div className="row d-flex px-3 radio">
                                  <img className="imagendelogotarjeta" src="https://i.imgur.com/OdxcctP.jpg"  alt='img de visa'/>
                                  <p className="my-auto">Debit Card</p>
                              </div>
                              <div className="row d-flex px-3 radio">
                                  <img className="imagendelogotarjeta" src="https://i.imgur.com/cMk1MtK.jpg"  alt='img de paypal'/>
                                  <p className="my-auto">PayPal</p>
                              </div>
                          </div>
                      </div>
                    </div>
                    <div>
                      <input type="text" className="feedback-input" placeholder="Titular"/>
                      <input type="number" className="feedback-input" placeholder="Numero de Tarjeta"/>
                      <input type="date" className="feedback-input" placeholder="Fecha de Vencimiento"/>
                      <input type="password" className="feedback-input" placeholder="Codigo"/>
                    </div> 
                  </div>
                  <input className="btn-block btn-blue" type="submit" value="SUBMIT" onClick={handleClose}/>
                  <div className="mt-1 ">
                    <h2 className="total_a_pagar"> Total a Pagar: {total} Gs.</h2>
                  </div>
                </form>
              </div>
          </Modal.Body>

          <Modal.Footer>
  
            <button className="btn" onClick={handleClose}>
              CERRAR
            </button>

          </Modal.Footer>
      </Modal>

        </div>
      </div>
    </div>
  );
};

export default AddCarrito;
