import React, { useEffect, useState } from "react";
import { Carrouselchico } from "../components/carousel/Carrouselchico";
import Carrouselgrande from "../components/carousel/Carrouselgrande";
import Footer from "../components/footer/Footer";
import { ListarPizza } from "./ListaPizzas";
import './style/home.css'

function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [])
  
  return (
    <>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <div id="contenedor">
          <div>
            <div>
              <Carrouselgrande />
            </div>
            <div>
              <Carrouselchico />
            </div>
            <section>
              <ListarPizza />
            </section>
            <div>
              <Footer />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
