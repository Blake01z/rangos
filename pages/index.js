import React from 'react'; // Asegúrate de que React está importado aquí
import Link from 'next/link';

const Home = () => (
  <div className='container-navigation'>
    <div className='container-navigation-main'>
        <h1 className='container-navigation-title'>Prueba de Rangos</h1>
        <div className='container-navigation-links'>
        <Link className='link' href="/exercise1">Rango Normal</Link>
        <Link className='link' href="/exercise2">Rango con valores Fijos</Link>
        </div>
    </div>
  </div>
);

export default Home;
