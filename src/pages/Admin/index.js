import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ErrorPage from '../../commonComponents/ErrorPage';
import DashboardContainer from './containers/DashboardContainer';
import LoginContainer from './containers/LoginContainer';
import SettingsContainer from './containers/SettingsContainer';

const Admin = () => {
  return (
    <Routes>
      <Route path='/' element={<LoginContainer />} />
      <Route path='/dashboard' element={<DashboardContainer />} />
      <Route path='/settings' element={<SettingsContainer />} />
      <Route path='*' element={<ErrorPage />} />
    </Routes>    
  )
}

export default Admin;
