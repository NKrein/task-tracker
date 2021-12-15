import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Admin from './pages/Admin';
import Door from './pages/Door';
import Home from './pages/Home';
import AuthContextProvider from './context/AuthContext';
import Signup from './pages/Signup';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <BrowserRouter>
          <h1>Nav</h1>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/:usr' element={<Door />} />
            <Route path='/admin/*' element={<Admin />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
