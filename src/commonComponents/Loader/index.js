import React from 'react';
import loader from '../../images/loader.png';

const Loader = () => {
  return (
    <img src={loader} alt="Cargando.." className='loader-spin' />
  )
}

export default Loader;
