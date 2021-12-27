import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './style.css';

const Footer = () => {
  return (
    <footer>
      <p>Copyright © 2022 Task-tracker | <Link to={{ pathname: 'https://github.com/NKrein' }} className='currentLink' target="_blank">By NKrein</Link></p>
    </footer>
  )
}

export default Footer;