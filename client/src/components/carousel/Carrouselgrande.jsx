import React from 'react'
import img1 from '../../img/imgpizza1.jpg'
import img2 from '../../img/1.jpg'
import img3 from '../../img/3.jpg'
import img4 from '../../img/4.jpg'
import './style/grande.css'

const Carrouselgrande = () => {
  return (
    <>
    <div >
        <div id="carouselExampleRide" className="carousel slide" data-bs-ride="true">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={img1} className="d-block w-100" id='tamanho_img1' alt="Imagen de pizza"/>
            </div>
            <div className="carousel-item">
              <img src={img2} className="d-block w-100" id='tamanho_img2' alt="Imagen de pizza"/>
            </div>
            <div className="carousel-item">
              <img src={img3} className="d-block w-100" id='tamanho_img3' alt="Imagen de pizza"/>
            </div>
            <div className="carousel-item">
              <img src={img4} className="d-block w-100" id='tamanho_img4' alt="Imagen de pizza"/>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
    </div>

            </>
  )
}

export default Carrouselgrande