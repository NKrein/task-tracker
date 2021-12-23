import React, { useContext, useState } from 'react'
import { Alert } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import TaskForm from '../../../commonComponents/TaskForm'
import { AuthContext } from '../../../context/AuthContext';
import { getFirestore } from '../../../services';

const TaskFormContainer = () => {

  const { currentUser, timeNow } = useContext(AuthContext);

  const defaultDataForm = {
    status: 'not-started',
    checklist: {
      development: false,
      test: false,
      bugs: false,
      retest: false,
      deployment: false,
      repository: false
    }
  };

  const [dataForm, setDataForm] = useState(defaultDataForm);
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
    const date = timeNow;
    db.collection(`${currentUser.uid}`).add({...dataForm, date})
      .then((docRef) => {
        setErr('');
        setSuccess(`Task saved successfully with id: ${docRef.id}`);
        setTaskId(docRef.id)
      })
      .catch((error) => {
        setErr(`Ups, something is going wrong.`);
        console.log('Error ->', error);
      })
      .finally(() => setLoading(false));
  }

  if (currentUser) {
    return (
      <>
        {success && <Alert variant='success' onClose={() => setSuccess('')} dismissible>{success}</Alert>}
        {err && <Alert variant='danger' onClose={() => setErr('')} dismissible>{err}</Alert>}
        <TaskForm handleChange={handleChange} handleSubmit={handleSubmit} title='New Task' disabledButton={loading} />
        {taskId && <Navigate to={`/admin/view/${taskId}`} />}
      </>
    )  
  } else {
    return <Navigate to='/admin' />
  }
}

export default TaskFormContainer
