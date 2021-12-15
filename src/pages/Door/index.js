import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ErrorPage from '../../commonComponents/ErrorPage';
import { AuthContext } from '../../context/AuthContext';

const Door = () => {

  const {usr} = useParams();
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState();

useEffect(() => {
  // search a user with {usr} userName in Auth Firebase DB, and set {user} to show info about it
  // eslint-disable-next-line
}, [usr])
  

  return (
    user?
      <div>
        <h2>Puerta principal de {user.name}</h2>
        <p>¿Quieres las llaves?</p>
        <p>La encontrarás aquí abajo</p>
      </div>
    :
      <ErrorPage />
  )
}

export default Door;
