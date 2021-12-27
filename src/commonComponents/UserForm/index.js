import React, { useContext } from 'react';
import { Col, Container, Row, Form, FloatingLabel, Button } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import googleIcon from '../../images/google.png';

const UserForm = ({ handleSubmit, handleChange, signUp = false, title = 'Sign', isInvalid = false }) => {

  const { googleLogIn } = useContext(AuthContext);

  return (
    <Container>
      <Row>
        <Col xs={12} md={12}>
          <h2>{title}</h2>
        </Col>
        <Col xs={12} md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit}>
            {signUp &&
              <FloatingLabel controlId="floatingName" label="Name" className="mb-3">
                <Form.Control type="text" name="name" placeholder="Name" onChange={handleChange} required />
              </FloatingLabel>
            }
            <FloatingLabel controlId="floatingInput" label="Email" className="mb-3">
              <Form.Control type="email" name="email" placeholder="name@example.com" onChange={handleChange} required />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
              <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} required />
            </FloatingLabel>
            {signUp &&
              <FloatingLabel controlId="floatingrePassword" label="Confirm password" className="mb-3">
                <Form.Control type="password" name="repassword" placeholder="Password" onChange={handleChange} required isInvalid={isInvalid} />
                <Form.Control.Feedback type="invalid">passwords don't match</Form.Control.Feedback>
              </FloatingLabel>
            }
            <Button type='submit' variant="outline-dark" disabled={isInvalid}>{title}</Button>
          </Form>
          <hr />
          <Button variant="outline-dark" onClick={googleLogIn}>With Google <img width="30px" src={googleIcon} alt="Inicio google"/></Button>
        </Col>
      </Row>
    </Container>
  )
}

export default UserForm;
