import React, { useState, useEffect } from 'react'
import { Alert, Button, Form, Modal, CloseButton } from 'react-bootstrap'
import Todomap from '../todo/Todomap'

export default function Todo({token}) {
  const [todo, setTodo] = useState('')
  const [error, setError] = useState()
  const [success, setSuccess] = useState()
  const [todoList, setTodoList] = useState([])
  const [modal, setModal] = useState(false)
  const [impText, setImpText] = useState()

  

  const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '50px'
  }

  const allTodo = async () => {
    
    try{
      const resp = await fetch('/todo/alltodo',{
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json',
              'Authorization': `Bearer ${token}`, 
          }
      })      
      const result = await resp.json()
      if(!resp.ok) return setError(result.message)
      setTodoList(result.todo)
      
    } catch (err) {
      setError(err.message)
    }
  }
 



  useEffect( () => {
    allTodo()
  },[])


  const addTodo = async () => {
    
try {
  if(todo){
    const data = {todo};
    const resp =  await fetch('/todo/addtodo',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
            body: JSON.stringify(data)
        })
        
        const result = await resp.json()
        if(!resp.ok) return setError(result.message)
        setTodoList([...todoList, result.todo])
        setSuccess(result.message)
        setModal(false)
        setTodo("")
        setImpText('')
      }else{
          setImpText("text needed")
              }
      } catch (err) {
        setError(err.message)
      
    }
      
}

  const deleteTodo = async (id)=>{
   
    try {
        const resp =  await fetch(`/todo/deletetodo/${id}`,{
                method: 'DELETE',
                headers: {
                  'Authorization': `Bearer ${token}`, 
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
            
            const result = await resp.json()
            if(!resp.ok) return setError(result.message)
            setTodoList(todoList.filter(todo => todo._id !== id))
            setSuccess(result.message)
          } catch (err) {
            setError(err.message)
          }
    }
    
    const updateTodo = async (newTodo) => {
      try {
          const resp =  await fetch('/todo/updatetodo',{
                  method: 'PUT',
                  headers: {
                      'Accept': 'application/json',
                      'Content-type': 'application/json',
                      'Authorization': `Bearer ${token}`, 
                  },
                  body: JSON.stringify(newTodo)
              })
              
              const result = await resp.json()
              if(!resp.ok) return setError(result.message)
              setTodoList(todoList.map(t => t._id === newTodo._id ? { ...t, todo: newTodo.todo } : t))
              setSuccess(result.message)
            } catch (err) {
              setError(err.message)
            }
      }


      const addTodoButton = () => {
        setModal(true)
      }

const cancel = () => {
  setModal(false)
  setImpText('')
}
      
   
  
  return (
  <>
  <div style={style}>
    <Button variant="outline-secondary" onClick={addTodoButton}>ADD TODO</Button>

        

    <Modal show={modal} centered size="lg">
             <Modal.Body>
              <Form>
               <Form.Group className="mb-3" controlId="formBasicEmail" >
               <Form.Label>Add Todo</Form.Label>
               <Form.Control type="text" placeholder="Enter text" value={todo} onChange={(e) => setTodo(e.target.value)} />
              </Form.Group>
                 <Button variant="outline-success" onClick={addTodo}>ADD</Button>
                 <p style={{color: "red"}}>{impText}</p>
               </Form>
              </Modal.Body>
              <Modal.Footer>
                 <CloseButton onClick={() => cancel()}/>
              </Modal.Footer>
            </Modal>
    </div>   
     <div className="container-fluid" style={{"marginTop":"100px"}}>
       <div className="row">{ todoList && todoList.map(todo => <Todomap todoItem={todo} deleteTodo={deleteTodo} updateTodo={updateTodo} key={todo._id} />)}</div>
    </div>
    { error && setTimeout(() => setError(), 1000)}
        {success && setTimeout(() => setSuccess(), 1000)}
        { error && <Alert variant="danger">{error}</Alert> }
        { success && <Alert variant="success">{success}</Alert>}
  </>
  )
}
