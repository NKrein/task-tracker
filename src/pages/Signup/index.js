import React, { useContext, useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import UserForm from '../../commonComponents/UserForm';
import UserWarning from '../../commonComponents/UserWarning';
import { AuthContext } from '../../context/AuthContext';

const SignupContainer = () => {

  const [dataForm, setDataForm] = useState({});
  const [success, setSuccess] = useState();
  const [error, setError] = useState();
  const { signUp, currentUser, userUpdate, emailVerification } = useContext(AuthContext);

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
      userUpdate(dataForm.name).then( () => setSuccess('Profile updated.')).catch((err) => {
        setError('Error changing profile name');
        console.log('Error changing profile name ->', err)
      });
      emailVerification().then(() => setSuccess('Everything is fine. Now verify your email.')).catch((err) => {
        setError('Error sending email verification.');
        console.log('Error sending email verification ->', err)
      })
      setSuccess('Successful!');
    }).catch( err => {
      setError(`Error to sign up. (${err.message})`);
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
        <UserForm handleChange={handleChange} handleSubmit={handleSubmit} title='Sign Up' signUp isInvalid={isInvalid()} />
      }
    </>
  )
}

export default SignupContainer;
