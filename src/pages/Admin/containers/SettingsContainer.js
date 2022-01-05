import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Col, Container, Row, Image, Button, Form, FloatingLabel, Alert, Modal } from 'react-bootstrap';
import { getFirestore } from '../../../services';
import UserForm from '../../../commonComponents/UserForm';

const SettingsContainer = () => {

  const { currentUser, resetPassword, deleteUser, logIn, setUserCredential, userCredential } = useContext(AuthContext);
  const [userEmail, setUserEmail] = useState('');
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [modal, setModal] = useState(false);
  const [dataForm, setDataForm] = useState(false);


  const handleChange = (e) => {
    setUserEmail(e.target.value);
  }

  const changePassword = () => {
    if (userEmail === currentUser.email) {
      setLoading(true);
      setErr('');
      resetPassword(currentUser.email).then(() => {
        setSuccess('Password change link has been sent. Check your email!');
      }).catch(() => setErr('Error to reset password.')).finally(() => setLoading(false));
    } else {
      setErr('Email does not match.');
    }
  }

  const credentialIsEmpty = () => Object.entries(userCredential).length === 0;

  const handleFormChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value
    });
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(dataForm)
    logIn(dataForm.email, dataForm.password)
    .then(res => setUserCredential(res))
    .catch(err => setErr('Error to authenticate. Try Again.'))
    .finally(() => setModal(false))
  }

  const removeAccount = () => {
    setLoading(true);
    setErr('');
    const db = getFirestore();
    const collection = db.collection(`${currentUser.uid}`)
    collection.onSnapshot(docRef => {
      docRef.forEach(doc => {
        collection.doc(doc.id).delete();
      })
    })
    deleteUser()
      .then(() => setSuccess('See you soon!'))
      .catch(err => {
        setErr('Error to delete account');
        console.log('Error to delete ->', err);
      }).finally(() => setLoading(false))
  }

  return (
    <>
      {currentUser ?
        <Container>
          <Row>
            <Col xs={{ span: 4, offset: 4 }}>
              <Image src={currentUser.photoURL} rounded width={100} />
            </Col>
            <Col md={12}>
              <h2>{currentUser.displayName}</h2>
              <p>Creation date: {currentUser.metadata.creationTime}</p>
              <p>Last sign in: {currentUser.metadata.lastSignInTime}</p>
              <p>Email verification: {currentUser.emailVerified ? 'Yes.' : 'Not yet.'}</p>
            </Col>
            <Col xs={12} md={{ span: 4, offset: 4 }}>
              <h2>Options</h2>
              {currentUser.emailVerified ?
                <div>
                  <p>For change your password, please enter your email.</p>
                  {err && <Alert variant='danger' onClose={() => setErr('')} dismissible>{err}</Alert>}
                  {success && <Alert variant='success' onClose={() => setSuccess('')} dismissible>{success}</Alert>}
                  <FloatingLabel controlId="floatingInputEmail" label="Email" className="mb-3">
                    <Form.Control type="email" name="email" placeholder="name@example.com" onChange={handleChange} required />
                  </FloatingLabel>
                  <div className='button-box'>
                    {!deleteAccount ?
                      <>
                        <Button variant='outline-success' className='mb-3' onClick={changePassword} disabled={loading}>Change password</Button>
                        <Button variant='outline-danger' className='mb-3' onClick={() => setDeleteAccount(true)} disabled={loading}>Delete account</Button>
                      </>
                      :
                      <>
                        <Alert variant='warning' className='mb-3'>
                          {credentialIsEmpty() ? 
                            'You need to reauthenticate for this.' 
                            : 
                            'All your data will be removed, forever. Are you sure?' 
                          }
                        </Alert>
                        <Button variant='outline-danger' className='mb-3' onClick={() => credentialIsEmpty() ? setModal(true) : removeAccount()} disabled={loading}>
                          {credentialIsEmpty() ? 'Ok' : 'Yes, I understand'}
                        </Button>
                        <Button variant='outline-danger' className='mb-3' onClick={() => setDeleteAccount(false)} disabled={loading}>
                          {credentialIsEmpty() ? 'Go back' : 'No'}
                        </Button>
                      </>
                    }
                  </div>
                  <Modal
                    show={modal}
                    onHide={() => setModal(false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                  >
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                      <UserForm title='Reauthentication' handleChange={handleFormChange} handleSubmit={handleFormSubmit} />
                    </Modal.Body>
                  </Modal>

                </div>
                :
                <p>Please, verify your email to see more options.</p>
              }
            </Col>
          </Row>
        </Container>
        :
        <Navigate to='/admin' />
      }
    </>
  )
}

export default SettingsContainer;
