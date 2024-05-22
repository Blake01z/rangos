import React from 'react';
import Range from '../components/Range';
import Link from 'next/link';

const Exercise2 = () => (
  <div className='container-ranges'>
    <div className='container-ranges-main'>
        <h1 className='container-ranges-title'>Rango valores fijos</h1>
        <Range mode="fixed" />
        <Link className='container-ranges-link' href="/">Volver</Link>
    </div>
  </div>
);

export default Exercise2;
