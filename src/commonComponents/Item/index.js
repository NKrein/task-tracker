import React, { useContext } from 'react';
import { Alert, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './style.css';

const Item = ({ item }) => {

  const { timeAgo } = useContext(AuthContext);

  return (
    <Link to={`/admin/view/${item.id}`} className='itemCard'>
      <Container fluid>
        <Row>
          <Col xs={12}>
            <p>{item.name}</p>
          </Col>
          <Col xs={12}>
            <hr />
          </Col>
          <Col xs={6} md={4}>
            <Alert variant={item.status === 'complete' ? 'success' : item.status === 'in-progress' ? 'warning' : 'danger'}>
              {item.status}
            </Alert>
          </Col>
          <Col xs={6} md={4}>
            <p>{item.type}</p>
          </Col>
          <Col xs={6} md={4}>
            <p>Hace {timeAgo(item.date)}</p>
          </Col>
        </Row>
      </Container>
    </Link>
  )
}

export default Item;
