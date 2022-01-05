import React, { useContext, useEffect, useState } from 'react';
import { Alert, Modal } from 'react-bootstrap';
import {Navigate, useNavigate, useParams } from 'react-router-dom';
import ItemDetail from '../../../commonComponents/ItemDetail';
import Loader from '../../../commonComponents/Loader';
import TaskForm from '../../../commonComponents/TaskForm';
import { AuthContext } from '../../../context/AuthContext';
import { getFirestore } from '../../../services';

const ItemDetailContainer = () => {

  const { currentUser, timeNow } = useContext(AuthContext);
  const { itemId } = useParams();
  const [item, setItem] = useState({});
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  //Update
  const [checklist, setChecklist] = useState({});
  const [status, setStatus] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);
  //Modal
  const [edit, setEdit] = useState(false);
  const [formInfo, setFormInfo] = useState({});
  //Delete
  const [deleteItem, setDeleteItem] = useState(false);
  const navigate = useNavigate();

  const handleStatus = (e) => {
    setStatus(e.target.value);
  }

  const handleChange = (e) => {
    setChecklist({
      ...checklist,
      [e.target.name]: e.target.checked,
    });
  }

  const handleFormChange = (e) => {
    setFormInfo({
      ...formInfo,
      [e.target.name]: e.target.value,
    });
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setEdit(false);
    setLoading(true);
    const item = getFirestore().collection(`${currentUser.uid}`).doc(itemId);
    item.update({ ...formInfo })
      .then(() => {
        setSuccess('Task info updated!');
        setIsUpdated(!isUpdated);
      })
      .catch(() => { setErr('Task update failed. Try later!') })
      .finally(() => { setLoading(false) });
  }

  const handleDelete = () => {
    const item = getFirestore().collection(`${currentUser.uid}`).doc(itemId);
    item.delete()
      .then(() => {
        setSuccess('Task deleted.');
        navigate(-1);
      })
      .catch(() => { setErr('Task delete failed. Try later!') })
      .finally(() => { setLoading(false) });

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const item = getFirestore().collection(`${currentUser.uid}`).doc(itemId);
    item.update({ checklist: { ...checklist }, modified: timeNow() })
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
      item.update({ status: status, modified: timeNow() })
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
        {Object.keys(item).length !== 0 && !loading ?
          <ItemDetail
            item={item}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleStatus={handleStatus}
            handleEdit={() => setEdit(true)}
            setDeleteItem={setDeleteItem}
            deleteItem={deleteItem}
            handleDelete={handleDelete}
          />
          : <Loader />
        }
        <Modal
          show={edit}
          onHide={() => setEdit(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            <TaskForm title='Edit task' objEdit={item} handleChange={handleFormChange} handleSubmit={handleFormSubmit} />
          </Modal.Body>
        </Modal>
      </>
    )
  } else {
    return <Navigate to='/admin' />
  }
}

export default ItemDetailContainer;
