import React from "react";
import { Carrouselchico } from "../components/carousel/Carrouselchico";
import Carrouselgrande from "../components/carousel/Carrouselgrande";
import Footer from "../components/footer/Footer";
import { ListarPizza } from "./ListaPizzas";

function Home() {

  return (
    <div className="container">
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
        <Footer/>
      </div>
    </div>
  );
}

export default Home;
