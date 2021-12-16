import React, { useContext } from 'react';
import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './style.css';

const NavBar = () => {

  const { currentUser, logOut } = useContext(AuthContext);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link to='/' className='brandLink'>Task-tracker</Link>
        {currentUser ? <>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavLink to='/admin/dashboard' className={({isActive}) => 'link' + (isActive ? ' currentLink' : '')}>Dashboard</NavLink>
              <NavDropdown title="Ver tareas" id="collasible-nav-dropdown">
                <NavDropdown.Item href='/admin/list/not-started'>Not started</NavDropdown.Item>
                <NavDropdown.Item href='/admin/list/in-progress'>In progress</NavDropdown.Item>
                <NavDropdown.Item href='/admin/list/complete'>Completed</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href='/admin/list'>View all</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <NavLink to='/admin/settings' className={({isActive}) => 'link' + (isActive ? ' currentLink' : '')}>{currentUser.email}</NavLink>
              <Button variant='dark' onClick={() => logOut()}>Cerrar sesión</Button>
            </Nav>
          </Navbar.Collapse>
        </> :
          <Nav>
            <NavLink to='/admin' className={({isActive}) => 'link' + (isActive ? ' currentLink' : '')}>Iniciar Sesión</NavLink>
          </Nav>
        }
      </Container>
    </Navbar>)
}

export default NavBar;
