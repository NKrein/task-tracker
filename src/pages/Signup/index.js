import React, { useContext, useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import UserForm from '../../commonComponents/UserForm';
import UserWarning from '../../commonComponents/UserWarning';
import { AuthContext } from '../../context/AuthContext';

const SignupContainer = () => {

  const [dataForm, setDataForm] = useState({});
  const [success, setSuccess] = useState();
  const [error, setError] = useState();
  const { signUp, currentUser, userUpdate } = useContext(AuthContext);

  const handleChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(dataForm.email, dataForm.password).then( () => {
      setError('');
      userUpdate(dataForm.name).then( () => setSuccess('Todo listo. Verifica tu email.')).catch((err) => {
        setError('Error al cargar Nombre de usuario');
        console.log('Error al cargar Nombre de usuario ->', err)
      });
      setSuccess('Éxito!');
    }).catch( err => {
      setError(`Error al registrar usuario. (${err.message})`);
    })
  }

  const isInvalid = () => {
    return (dataForm.password === dataForm.repassword) ? false : true;
  }

  return (
    <>
      {success && <Alert variant='success'>{success}</Alert>}
      {error && <Alert variant='warning'>{error}</Alert>}
      {currentUser?
        <UserWarning /> :
        <UserForm handleChange={handleChange} handleSubmit={handleSubmit} title='Registrarse' signUp isInvalid={isInvalid()} />
      }
    </>
  )
}

export default SignupContainer;
