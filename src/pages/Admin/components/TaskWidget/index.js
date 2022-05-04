import React from 'react';
import { Accordion } from 'react-bootstrap';
import ItemWidget from '../ItemWidget';

const TaskWidget = ({ items }) => {

  const status = [
    {title: 'Not started', prop: 'not-started'},
    {title: 'In progress', prop: 'in-progress'},
    {title: 'Complete', prop: 'complete'}
  ]

  return (
    <Accordion defaultActiveKey={0}>
      {status.map((obj, i) =>       
        <Accordion.Item eventKey={i} key={i}>
          <Accordion.Header>{obj.title}</Accordion.Header>
          <Accordion.Body>
            {items.filter(e => e.status === obj.prop).slice(0,2).map(e => <ItemWidget key={e.id} item={e} />)}
          </Accordion.Body>
        </Accordion.Item>
      )}
    </Accordion>
  )
}

export default TaskWidget;
