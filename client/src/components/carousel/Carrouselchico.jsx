import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import imagen from '../../img/sinfondo/pizzasinfondo.png'
import imagen2 from '../../img/sinfondo/img2.png'
import imagen3 from '../../img/sinfondo/img3.png'
import './style/carrousel.css'

export const Carrouselchico = () => {

    const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div >


    <Carousel 
      responsive={responsive}
      swipeable={true}
      draggable={true}
      infinite={true}
      autoPlaySpeed={2000}
      containerClass="carousel-container"
      itemClass="carousel-item-padding-15-px"
      centerMode={true}
      focusOnSelect={true}
      autoPlay={true}
      className="contenido"
      
    >
      <div >
        <img className="imagen" src={imagen} alt="ejemplo" />
      </div>
      <div>
        <img className="imagen" src={imagen2} alt="ejemplo" />
      </div>
      <div>
        <img className="imagen" src={imagen3} alt="ejemplo" />
      </div>
      <div>
        <img className="imagen" src={imagen} alt="ejemplo" />
      </div>
    </Carousel>
    </div>
  );
}



