import React, { useContext } from 'react';
import { Alert, Button, Col, Container, Form, FloatingLabel, Row } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import './style.css';


const ItemDetail = ({ item, handleChange, handleSubmit, handleStatus, handleEdit, setDeleteItem, deleteItem, handleDelete }) => {

  const { timeAgo } = useContext(AuthContext);

  return (
    <Container>
      <Row className='infoContainer'>
        <Col xs={12} md={6} className='infoSide'>
          <p>{item.name}</p>
          <p>{item.country}</p>
          <p>{item.type}</p>
          <a href={item.link} target="_blank" rel="noopener noreferrer">Link</a>
          <p>Last changes {timeAgo(item.modified)} ago.</p>
          <Alert variant={item.status === 'complete' ? 'success' : item.status === 'in-progress' ? 'warning' : 'danger'}>
            {item.status}
          </Alert>
          <FloatingLabel controlId="floatingSelect" label="Mark as" className="mb-3" required>
            <Form.Select name="status" aria-label="Floating label select example" defaultValue={item.status} onChange={handleStatus}>
              <option value="not-started">Not Started</option>
              <option value="in-progress">In Progress</option>
              <option value="complete">Complete</option>
            </Form.Select>
          </FloatingLabel>
          <div className='button-box'>
            <Button variant="outline-success" onClick={handleEdit}>Edit</Button>
            {deleteItem ?
              <div>
                <p>Are you sure?</p>
                <Button variant="outline-warning" onClick={() => setDeleteItem(false)}>Not</Button>
                <Button variant="outline-warning" onClick={() => handleDelete()}>Yes</Button>
              </div>
              :
              <Button variant="outline-danger" onClick={() => setDeleteItem(true)}>Delete</Button>
            }
          </div>
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
