import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { Navigate } from 'react-router-dom';

const SettingsContainer = () => {

  const { currentUser } = useContext(AuthContext);

  return (
    <>
    {currentUser?
      <div>
        Config Page
      </div>
    :
      <Navigate to='/admin' />
    }
    </>
  )
}

export default SettingsContainer;
