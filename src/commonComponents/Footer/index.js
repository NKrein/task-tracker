import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './style.css';

const Footer = () => {
  return (
    <footer>
      <p>Todos los derechos reservados | Copyright © 2022 Task-tracker | <Link to={{ pathname: 'https://github.com/NKrein' }} className='currentLink' target="_blank">Desarrollo por NKrein</Link></p>
    </footer>
  )
}

export default Footer;