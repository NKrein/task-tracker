import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Button } from 'react-bootstrap';
import './style.css';


const UserWarning = () => {

  const { currentUser, logOut } = useContext(AuthContext);

  return (
    <div className='userPanel'>
      <h3>You are in, now as {currentUser.displayName}. What would you like to do?</h3>
      <Button type='button' variant="outline-warning" onClick={() => logOut()} >Log Out</Button>
      <Link to='/admin/dashboard'><Button type='button' variant="outline-dark">Go to Dashboard</Button></Link>
    </div>
  )
}

export default UserWarning;
