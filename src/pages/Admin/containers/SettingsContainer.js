import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Col, Container, Row, Image, Button, Form, FloatingLabel, Alert } from 'react-bootstrap';

const SettingsContainer = () => {

  const { currentUser, resetPassword } = useContext(AuthContext);
  const [userEmail, setUserEmail] = useState('');
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUserEmail(e.target.value);
  }

  const changePassword = () => {
    if (userEmail === currentUser.email) {
      setLoading(true);
      setErr('');
      resetPassword(currentUser.email).then(() => {
        setSuccess('Password change link has been sent. Check your email!');
      }).catch(() => setErr('Error to reset password.')).finally(() => setLoading(false));
    } else {
      setErr('Email does not match.');
    }
  }

  return (
    <>
      {currentUser ?
        <Container>
          <Row>
            <Col xs={{ span: 4, offset: 4 }}>
              <Image src={currentUser.photoURL} rounded width={100} />
            </Col>
            <Col md={12}>
              <h2>{currentUser.displayName}</h2>
              <p>Creation date: {currentUser.metadata.creationTime}</p>
              <p>Last sign in: {currentUser.metadata.lastSignInTime}</p>
              <p>Email verification: {currentUser.emailVerified ? 'Yes.' : 'Not yet.'}</p>
            </Col>
            <Col xs={12} md={{ span: 4, offset: 4 }}>
              <h2>Options</h2>
              {currentUser.emailVerified ?
                <div>
                  <p>For change your password, please enter your email.</p>
                  {err && <Alert variant='danger' onClose={() => setErr('')} dismissible>{err}</Alert>}
                  {success && <Alert variant='success' onClose={() => setSuccess('')} dismissible>{success}</Alert>}
                  <FloatingLabel controlId="floatingInput" label="Email" className="mb-3">
                    <Form.Control type="email" name="email" placeholder="name@example.com" onChange={handleChange} required />
                  </FloatingLabel>

                  <Button variant='outline-success' onClick={changePassword} disabled={loading}>Change password</Button>
                </div>
                :
                <p>Please, verify your email to see more options.</p>
              }
            </Col>
          </Row>
        </Container>
        :
        <Navigate to='/admin' />
      }
    </>
  )
}

export default SettingsContainer;
