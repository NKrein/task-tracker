import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ErrorPage from '../../commonComponents/ErrorPage';
import DashboardContainer from './containers/DashboardContainer';
import ItemDetailContainer from './containers/ItemDetailContainer';
import ItemListContainer from './containers/ItemListContainer';
import LoginContainer from './containers/LoginContainer';
import SettingsContainer from './containers/SettingsContainer';
import TaskFormContainer from './containers/TaskFormContainer';

const Admin = () => {
  return (
    <Routes>
      <Route path='/' element={<LoginContainer />} />
      <Route path='/dashboard' element={<DashboardContainer />} />
      <Route path='/settings' element={<SettingsContainer />} />
      <Route path='/list/:stage' element={<ItemListContainer />} />
      <Route path='/list/' element={<ItemListContainer />} />
      <Route path='/new' element={<TaskFormContainer />} />
      <Route path='/view/:itemId' element={<ItemDetailContainer />} />
      <Route path='*' element={<ErrorPage />} />
    </Routes>    
  )
}

export default Admin;
