import React from 'react';
import Range from '../components/Range';
import Link from 'next/link';

const Exercise1 = () => (
  <div className='container-ranges'>
    <div className='container-ranges-main'>
        <h1 className='container-ranges-title'>Normal Rango</h1>
        <Range mode="normal" />
        <Link className='container-ranges-link' href="/">Volver</Link>
    </div>
  </div>
);

export default Exercise1;
