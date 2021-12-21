import React, { useContext, useState } from 'react'
import { Alert } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import TaskForm from '../../../commonComponents/TaskForm'
import { AuthContext } from '../../../context/AuthContext';
import { getFirestore } from '../../../services';

const TaskFormContainer = () => {

  const { currentUser } = useContext(AuthContext);

  const [dataForm, setDataForm] = useState({ status: 'not-started' });
  const [taskId, setTaskId] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [err, setErr] = useState('');

  const handleChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    const db = getFirestore()
    db.collection(`${currentUser.uid}`).add(dataForm)
      .then((docRef) => {
        setErr('');
        setSuccess(`Task saved successfully with id: ${docRef.id}`);
        setTaskId(docRef.id)
      })
      .catch((error) => {
        setErr(`Ups, something is going wrong. (${error})`);
      })
      .finally(() => setLoading(false));
  }


  return (
    <>
      {success && <Alert variant='success' onClose={() => setSuccess('')} dismissible>{success}</Alert>}
      {err && <Alert variant='danger' onClose={() => setErr('')} dismissible>{err}</Alert>}
      <TaskForm handleChange={handleChange} handleSubmit={handleSubmit} title='New Task' disabledButton={loading} />
      {taskId && <Navigate to={`/admin/task/${taskId}`} />}
    </>
  )
}

export default TaskFormContainer
