import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

const DashboardContainer = () => {

  const { currentUser } = useContext(AuthContext);

  return (
    <>
    {currentUser?
      <div>
        Dashboard
      </div>
    :
      <Navigate to='/admin' />
    }
    </>
  )
}

export default DashboardContainer;
