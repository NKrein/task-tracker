import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Col, Container, Row, Image } from 'react-bootstrap';

const SettingsContainer = () => {

  const { currentUser } = useContext(AuthContext);

  console.log(currentUser)

  return (
    <>
      {currentUser ?
        <Container>
          <Row>
            <Col xs={{ span: 4, offset: 4 }}>
              <Image src={currentUser.photoURL} rounded width={100}/>
            </Col>
            <Col md={12}>
              <h2>{currentUser.displayName}</h2>
              <p>Creation date: {currentUser.metadata.creationTime}</p>
              <p>Last sign in: {currentUser.metadata.lastSignInTime}</p>
              <p>Email verification: {currentUser.emailVerified? 'Yes.' : 'Not yet.'}</p>
            </Col>
            <Col md={12}>
              <h2>Options</h2>
              
            </Col>
          </Row>
          Config Page
        </Container>
        :
        <Navigate to='/admin' />
      }
    </>
  )
}

export default SettingsContainer;
