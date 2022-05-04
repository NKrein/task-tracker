import React, { useContext } from 'react';
import { Alert, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';
import './style.css';

const ItemWidget = ({ item }) => {

  const { timeAgo } = useContext(AuthContext);

  return (
    <Link to={`/admin/view/${item.id}`} className='itemWidgetCard'>
      <Alert variant={item.status === 'complete' ? 'success' : item.status === 'in-progress' ? 'warning' : 'danger'}>
        <Container fluid>
          <Row>
            <Col xs={6} md={4}>
              {item.name}
            </Col>
            <Col xs={6} md={4}>
              <p>{item.type}</p>
            </Col>
            <Col xs={6} md={4}>
              <p>{timeAgo(item.modified)} ago</p>
            </Col>
          </Row>
        </Container>
      </Alert>
    </Link>
  )
}

export default ItemWidget;
