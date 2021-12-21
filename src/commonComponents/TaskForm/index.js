import React from 'react';
import { Col, Container, Row, Form, FloatingLabel, Button } from 'react-bootstrap';


const TaskForm = ({ handleSubmit, handleChange, title = 'Item Form', disabledButton }) => {
  return (
    <Container>
      <Row>
        <Col xs={12} md={12}>
          <h2>{title}</h2>
        </Col>
        <Col xs={12} md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit}>
            <FloatingLabel controlId="floatingName" label="Name" className="mb-3">
              <Form.Control type="text" name="name" placeholder="Name" onChange={handleChange} required />
            </FloatingLabel>
            <FloatingLabel controlId="floatingLink" label="Link" className="mb-3">
              <Form.Control type="text" name="link" placeholder="Link" onChange={handleChange} required />
            </FloatingLabel>
            <FloatingLabel controlId="floatingCountry" label="Country" className="mb-3">
              <Form.Control type="text" name="country" placeholder="Country" onChange={handleChange} required />
            </FloatingLabel>
            <FloatingLabel controlId="floatingType" label="Type" className="mb-3">
              <Form.Control type="text" name="type" placeholder="Type" onChange={handleChange} required />
            </FloatingLabel>
            <FloatingLabel controlId="floatingSelect" label="Status" className="mb-3" required>
              <Form.Select name="status" aria-label="Floating label select example" onChange={handleChange}>
                <option value="not-started">Not Started</option>
                <option value="in-progress">In Progress</option>
                <option value="complete">Complete</option>
              </Form.Select>
            </FloatingLabel>
            <Button type='submit' variant="outline-dark" disabled={disabledButton}>Confirm</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default TaskForm;
