import React , {useContext, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import {CartContext} from '../context/CartContex';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style/catalogo.css'

export const Pizza = ({pizza}) => {
    const [quantify, setQuantify ] = useState(1);
    const [varient, setVarient ] = useState('personal');

    const { products, setProducts } = useContext( CartContext );

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const notify = () => toast.success(`🍕 Se ha agregado ${pizza.name} al carrito!`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });;

    const handleAddToCart = () => {
        notify()
        const pizzaCart = {
            name: pizza.name,
            varient: varient,
            quantify: quantify,
            price: pizza.prices[0][varient] * quantify,
        };
        
        const updatedProducts = products.map((product) => {
            if (product.name === pizzaCart.name) {
            return {
                ...product,
                quantify: product.quantify + pizzaCart.quantify,
                
            };
            } else {
            return product;
            }
        });
        
        const index = updatedProducts.findIndex((product) => product.name === pizzaCart.name);
        if (index === -1) {
            updatedProducts.push(pizzaCart);
        }
        
        setProducts(updatedProducts);
        localStorage.setItem('cart', JSON.stringify(updatedProducts));
    }

    return (
        
        <>
        
        <div>
            <ToastContainer position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"/>
        </div>
            <div style={{ margin: '50px' }} className='shadow-lg p-3 mb-5 rounded' id='fondo'  >
                <div onClick={handleShow}>
                    <h1 className='nombredepizza'>{pizza.name}</h1>
                    <img src={pizza.image} className="img-fluid" style={{height:'250px', width:'200px'}} alt='imagen de la pizza correspondiente'/>
                </div>

            <div className="flex-container">
                <div className='w-100 m-1'>
                    <p>Tamaño</p>
                    <select className="form-select" value={varient} onChange={(e)=>{setVarient(e.target.value)}}>
                    {pizza.varients.map(varient=>{
                        return <option key={ varient } value={varient}>{varient}</option>
                    })}

                    </select>
                </div >
                <div className='w-100 m-1'>
                    <p>Cantidad</p>
                    <select className="form-select" value={quantify} onChange={(e)=>{setQuantify(e.target.value)}}>
                        {[...Array(10).keys()].map((x , i) =>{
                            return <option key={ i } value={i+1}>{i+1}</option>
                        })}
                    </select>
                </div>
            </div>
            <div className='flex-container'>
                <div className='m-1 w-100'>
                    <h2 className='mt-1'>Precio : {pizza.prices[0][varient] * quantify } Gs.</h2>
                </div>
                <div className='m-1 w-100'></div>
                    <button type="button"  className='btn' onClick={ handleAddToCart } id='botonagregar'>AGREGAR</button>
                </div>
            </div>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{pizza.name}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <img src={pizza.image} className='img-fluid' style={{height:'400px'}}alt='Imagen de Pizza '/>
                <p>{pizza.description}</p>
            </Modal.Body>

            <Modal.Footer>
                <button className='btn' onClick={handleClose}>CERRAR</button>
            </Modal.Footer>
        </Modal>
        </>
    )
}
