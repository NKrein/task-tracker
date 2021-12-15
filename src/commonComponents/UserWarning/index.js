import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Button, Col, Container, Row } from 'react-bootstrap';


const UserWarning = () => {

  const { currentUser, logOut } = useContext(AuthContext);

  return (
    <Container>
      <Row>
        <Col sm={12}>
          <h3>Está logueado como {currentUser.email}, para continuar debe cerrar sesión.</h3>
        </Col>
        <Col sm={12}>
          <Button type='button' variant="outline-warning" onClick={() => logOut()} >Continuar</Button>        
        </Col>
        <Col sm={12}>
          <Link to='/admin/dashboard'><Button type='button' variant="outline-dark">Volver al Dashboard</Button></Link>        
        </Col>
      </Row>
    </Container>
  )
}

export default UserWarning;
