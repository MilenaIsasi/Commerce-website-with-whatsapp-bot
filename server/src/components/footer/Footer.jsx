import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import './style/footer.css'

export default function Footer() {
  return (
    <>
    <MDBFooter className='bg-dark text-center text-white' id='footer'>
      <div className='politicas'>
        <MDBContainer className='p-4 pb-0'> 
          <p > Pizzeria Dojo</p>
          <Link className='linkstylo'> Acerca de </Link> 
        </MDBContainer>
        <MDBContainer className='p-4 pb-0'> 
          <p>Contacto</p>
          <Link className='linkstylo'> Comunicate con Nosotros! </Link> 
        </MDBContainer> 

      </div>
      
      <div>
      <MDBContainer className='p-4 pb-0'>
        <section className='mb-4'>
        <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='whatsapp' />
          </MDBBtn>
          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='facebook-f' />
          </MDBBtn>
          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='instagram' />
          </MDBBtn>
        </section>
      </MDBContainer>
      <MDBContainer className='p-0 pb-0'>
      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2022 Copyright: 
         @isasimilena28@gmail.com // @ruli@gmail.com
      </div>
      </MDBContainer>
      </div>
    </MDBFooter>
    </>
  );
}