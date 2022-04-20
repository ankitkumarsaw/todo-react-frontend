import { useState } from 'react'
import { Alert, Button, Modal, Form} from 'react-bootstrap'

export default function Accounts({ setToken }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [modalType, setModalType] = useState(1)
  const [error, setError] = useState(null)

  
  
  const submitForm = async () => {
    if (email && password && name) {
      console.log(modalType)
      if(modalType === 1) {
        try {
          const data = {email, password, name};
          const resp =  await fetch('/user/register',{
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-type': 'application/json'
              },
              body: JSON.stringify(data)
          })
          
          const result = await resp.json()
          if(!resp.ok) return setError(result.message)

          localStorage.setItem('token', result.token);
          setToken(result.token)
        } catch (err) {
          setError(err.message)
        }
      }
         
      if(modalType === 2) {
        try {
          const data = {email, password};
          const resp =  await fetch('/user/login',{
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-type': 'application/json'
              },
              body: JSON.stringify(data)
          })
          
          const result = await resp.json()
          if(!resp.ok) return setError(result.message);
        
          localStorage.setItem('token', result.token);
          setToken(result.token)
          
        } catch (err) {
          setError(err.message)
        }
      }
    } else {
      setError('Number and password are required')
    }
}
  
  
  return (
    <Modal show={true} centered size="lg">
      <Modal.Header>
        <Modal.Title>{modalType === 1 ? 'Sign Up' : 'Login'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail" >
          <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter number" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter number" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password}  onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Button variant="primary" onClick={submitForm}>
            {modalType === 1 ? 'Sign Up' : 'Login'}
          </Button>
        </Form>

        { error && <Alert variant="danger">{error}</Alert> }
      </Modal.Body>

      <Modal.Footer>
        <h4>{ modalType === 1 ? "Already have an account?" : "Don't have an account?" }</h4>
        <Button variant="primary" onClick={() => setModalType(modalType === 1 ? 2 : 1, setError(false))}>{ modalType === 1 ? 'Login' : 'Sign Up' }</Button>
      </Modal.Footer>
    </Modal>
  )
}