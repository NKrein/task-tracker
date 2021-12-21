import React, { useContext } from 'react';
import { Navbar, Nav, NavDropdown, Button, Container, Alert } from 'react-bootstrap';
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
              <NavLink to='/admin/new' className={({ isActive }) => 'link' + (isActive ? ' currentLink' : '')}>New</NavLink>
              <NavLink to='/admin/dashboard' className={({ isActive }) => 'link' + (isActive ? ' currentLink' : '')}>Dashboard</NavLink>
              <NavDropdown title="View Tasks" id="collasible-nav-dropdown">
                <NavDropdown.Item as='span'><Link to='/admin/list/not-started' className='dropdown-link'><Alert variant='danger' >Not started</Alert></Link></NavDropdown.Item>
                <NavDropdown.Item as='span'><Link to='/admin/list/in-progress' className='dropdown-link'><Alert variant='warning' >In progress</Alert></Link></NavDropdown.Item>
                <NavDropdown.Item as='span'><Link to='/admin/list/complete' className='dropdown-link'><Alert variant='success' >Completed</Alert></Link></NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as='span'><Link to='/admin/list/' className='dropdown-link'>View all</Link></NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <NavLink to='/admin/settings' className={({ isActive }) => 'link' + (isActive ? ' currentLink' : '')}>{currentUser.displayName ? currentUser.displayName : currentUser.email}</NavLink>
              <Button variant='dark' onClick={() => logOut()}>Log Out</Button>
            </Nav>
          </Navbar.Collapse>
        </> :
          <Nav>
            <NavLink to='/signup' className={({ isActive }) => 'link' + (isActive ? ' currentLink' : '')}>Sign Up</NavLink>
            <NavLink to='/admin' className={({ isActive }) => 'link' + (isActive ? ' currentLink' : '')}>Log In</NavLink>
          </Nav>
        }
      </Container>
    </Navbar>)
}

export default NavBar;
