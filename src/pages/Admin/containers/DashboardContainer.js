import React, { useContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import TaskWidget from '../components/TaskWidget';
import { getFirestore } from '../../../services';
import { Alert } from 'react-bootstrap';

const DashboardContainer = () => {

  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [err, setErr] = useState('');
  const [warn, setWarn] = useState('');

  // Getting al items
  useEffect(() => {
    setLoading(true);
    const db = getFirestore();
    const itemCollection = db.collection(`${currentUser.uid}`).orderBy('date', 'desc');

    itemCollection.get().then((querySnapshot) => {
      if (querySnapshot.size === 0) {
        setWarn(`No results`);
      } else {
        setWarn('');
        setItems(querySnapshot.docs.map(doc => { return { id: doc.id, ...doc.data() } }));
      }
    })
      .catch(error => {
        console.log('error', error);
        setErr('Error al traer datos');
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);

  console.log(items)

  return (
    <>
      {currentUser ?
        <div>
          {err && <Alert variant='danger' onClose={() => setErr('')} dismissible>{err}</Alert>}
          {warn && <Alert variant='warning' onClose={() => setWarn('')} dismissible>{warn}</Alert>}
          <h2>Hi {currentUser.displayName.split(' ', 1)}!</h2>
          <TaskWidget items={items} />
        </div>
        :
        <Navigate to='/admin' />
      }
    </>
  )
}

export default DashboardContainer;
