import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import UserForm from '../../../commonComponents/UserForm';
import { AuthContext } from '../../../context/AuthContext';

const LoginContainer = () => {

  const [dataForm, setDataForm] = useState({});

  const { currentUser, logIn } = useContext(AuthContext);

  const handleChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    logIn(dataForm.email, dataForm.password);
  }


  return (
    <>
      {currentUser ?
        <Navigate to='/admin/dashboard' />
        :
        <UserForm handleChange={handleChange} handleSubmit={handleSubmit} title='Log in' />
      }  
    </>
  )
}

export default LoginContainer;
