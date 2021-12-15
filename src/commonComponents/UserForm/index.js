import React from 'react';
import { Col, Container, Row, Form, FloatingLabel, Button } from 'react-bootstrap';

const UserForm = ({ handleSubmit, handleChange, repassword = false, title = 'Sign', isInvalid = false }) => {
  return (
    <Container>
      <Row>
        <Col xs={12} md={12}>
          <h2>{title}</h2>
        </Col>
        <Col xs={12} md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit}>
            <FloatingLabel controlId="floatingInput" label="Email" className="mb-3">
              <Form.Control type="email" name="email" placeholder="name@example.com" onChange={handleChange} required/>
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Contraseña" className="mb-3">
              <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} required/>
            </FloatingLabel>
            {repassword &&
              <FloatingLabel controlId="floatingrePassword" label="Confirme contraseña" className="mb-3">
                <Form.Control type="password" name="repassword" placeholder="Password" onChange={handleChange} required isInvalid={isInvalid}/>
                <Form.Control.Feedback type="invalid">No coinciden las contraseñas</Form.Control.Feedback>
              </FloatingLabel>
            }
            <Button type='submit' variant="outline-dark" disabled={isInvalid}>{title}</Button>
          </Form>
          <hr />
          <p>O inicie sesión con Google</p>
        </Col>
      </Row>
    </Container>
  )
}

export default UserForm;
