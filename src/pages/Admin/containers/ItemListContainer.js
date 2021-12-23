import React, { useContext, useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Item from '../../../commonComponents/Item';
import Loader from '../../../commonComponents/Loader';
import { AuthContext } from '../../../context/AuthContext';
import { getFirestore } from '../../../services';

const ItemListContainer = () => {

  const { currentUser } = useContext(AuthContext);
  const { stage } = useParams();
  const [ loading, setLoading ] = useState(false);
  const [ items, setItems ] = useState([]);
  const [ err, setErr ] = useState('');
  const [ warn, setWarn ] = useState('');

  useEffect(()=>{
      setLoading(true);
      const db = getFirestore();
      const itemCollection = stage? db.collection(`${currentUser.uid}`).where('status', '==', `${stage}`).orderBy('date', 'desc') : db.collection(`${currentUser.uid}`).orderBy('date', 'desc');
  
      itemCollection.get().then((querySnapshot) => {
        if (querySnapshot.size === 0){
          setWarn(`No results`);
        } else {
          setItems(querySnapshot.docs.map(doc => { return { id: doc.id, ...doc.data()} }));
        }
      })
      .catch(error => {
        console.log('error', error);
        setErr('Error al traer datos');
      })
      .finally(() => {
        setLoading(false);
      })  
  }, [stage]);

  if (currentUser) {
    return (
      <>
        {err && <Alert variant='danger' onClose={() => setErr('')} dismissible>{err}</Alert>}
        {warn && <Alert variant='danger' onClose={() => setWarn('')} dismissible>{warn}</Alert>}
        {items.length && !loading ? items.map(element => <Item key={element.id} item={element} />) : <Loader />}
      </>
    )  
  } else {
    return <Navigate to='/admin' />
  }
}

export default ItemListContainer;
