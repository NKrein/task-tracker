import React from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import './style.css';


const ItemDetail = ({ item, handleChange, handleSubmit }) => {
  return (
    <Container>
      <Row className='infoContainer'>
        <Col xs={12} md={6} className='infoSide'>
          <p>{item.name}</p>
          <p>{item.country}</p>
          <p>{item.type}</p>
          <a href={item.link} target="_blank" rel="noopener noreferrer">Link</a>
          <Alert variant={item.status === 'complete' ? 'success' : item.status === 'in-progress' ? 'warning' : 'danger'}>
            {item.status}
          </Alert>
        </Col>
        <Col as='form' xs={12} md={6} className='checkSide' onSubmit={handleSubmit}>
          {item.checklist &&
            <>
              <Form.Check
                type="switch"
                id="switch-development"
                label="Development"
                name="development"
                defaultChecked={item.checklist.development}
                onChange={handleChange}
              />
              <Form.Check
                type="switch"
                id="switch-test"
                label="Ready for testing"
                name="test"
                defaultChecked={item.checklist.test}
                onChange={handleChange}
              />
              <Form.Check
                type="switch"
                id="switch-bugs"
                label="Bugs"
                name="bugs"
                defaultChecked={item.checklist.bugs}
                onChange={handleChange}
              />
              <Form.Check
                type="switch"
                id="switch-retest"
                label="Retest"
                name="retest"
                defaultChecked={item.checklist.retest}
                onChange={handleChange}
              />
              <Form.Check
                type="switch"
                id="switch-deployment"
                label="Deployment"
                name="deployment"
                defaultChecked={item.checklist.deployment}
                onChange={handleChange}
              />
              <Form.Check
                type="switch"
                id="switch-repository"
                label="Repository"
                name="repository"
                defaultChecked={item.checklist.repository}
                onChange={handleChange}
              />
            </> 
          }
          <Button type='submit' variant='success'>Save</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default ItemDetail;