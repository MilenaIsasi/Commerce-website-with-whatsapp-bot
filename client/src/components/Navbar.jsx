import React from "react";
// import {useSelector, } from 'react-redux'
import { Link } from 'react-router-dom'
import Salir from "./Salir";
import './style/navbar.style.css'

export const Navbar = () => {
  // const cartstate = useSelector (state=>state.cartReducer)

  return (
    <div>
      <nav className="navbar navbar-expand-lg d-flex shadow-lg p-3 mb-5 bg-white rounded">
          <Link  className="navbar-brand" to='/home' style={{ color: '#00000 !important', textDecoration: 'none' }}>
          🍕 PIZZERIA CODING DOJO
          </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ">
            <li className="nav-item">
              <Link className='nav-link' to='/add'>
              <i className="bi bi-cart4" id="carrito"></i>
              </Link> 
            </li>
            <li className="nav-item">
              <Salir/>
            </li>

          </ul>
        </div>
      </nav>
    </div>
  );
};
