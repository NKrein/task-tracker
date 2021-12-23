import React, { useContext, useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { Navigate, useParams } from 'react-router-dom';
import ItemDetail from '../../../commonComponents/ItemDetail';
import Loader from '../../../commonComponents/Loader';
import { AuthContext } from '../../../context/AuthContext';
import { getFirestore } from '../../../services';

const ItemDetailContainer = () => {

  const { currentUser } = useContext(AuthContext);
  const { itemId } = useParams();
  const [item, setItem] = useState({});
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false);
  const [checklist, setChecklist] = useState({});
  const [status, setStatus] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);


  const handleStatus = (e) => {
    setStatus(e.target.value);
  }

  const handleChange = (e) => {
    setChecklist({
      ...checklist,
      [e.target.name]: e.target.checked,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const item = getFirestore().collection(`${currentUser.uid}`).doc(itemId);
    item.update({ checklist: { ...checklist } })
      .then(() => {
        setSuccess('Checklist updated!');
        setIsUpdated(!isUpdated);
      })
      .catch(() => { setErr('Checklist update failed. Try later!') })
      .finally(() => { setLoading(false) });
  }

  useEffect(() => {
    setLoading(true);
    const db = getFirestore();
    const getItem = db.collection(`${currentUser.uid}`).doc(itemId);
    getItem.get().then((docRef) => {
      if (docRef.data()) {
        setItem({ id: docRef.id, ...docRef.data() });
        setChecklist(docRef.data().checklist);
      } else {
        setErr('Id item does not match');
      }
    }).catch(error => {
      console.log('Error to get item->', error);
      setErr('Error to get Item');
    }).finally(() => setLoading(false));
  }, [itemId, isUpdated]);

  useEffect(() => {
    if (status) {
      setLoading(true);
      const item = getFirestore().collection(`${currentUser.uid}`).doc(itemId);
      item.update({ status: status })
      .then(() => {
        setSuccess('Status updated!');
        setIsUpdated(!isUpdated);
      })
      .catch(() => { setErr('Status update failed. Try later!') })
      .finally(() => { setLoading(false) });
    }
  }, [status]);

  if (currentUser) {
    return (
      <>
        {err && <Alert variant='danger' onClose={() => setErr('')} dismissible>{err}</Alert>}
        {success && <Alert variant='success' onClose={() => setSuccess('')} dismissible>{success}</Alert>}
        {item && !loading ? <ItemDetail item={item} handleChange={handleChange} handleSubmit={handleSubmit} handleStatus={handleStatus} /> : <Loader />}
      </>
    )
  } else {
    return <Navigate to='/admin' />
  }
}

export default ItemDetailContainer;
