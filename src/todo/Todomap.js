import { Card } from 'react-bootstrap'
import { useState } from 'react'
import { Trash, PencilSquare, Save, XLg } from 'react-bootstrap-icons';
import * as dayjs from 'dayjs'

export default function TodoMap({todoItem, deleteTodo, updateTodo}) {
    const { _id, todo, createdAt } = todoItem
    const [edit, setEdit] = useState(false)
    const [text, setText] = useState(todo)
   
    const  icon ={
      cursor: 'pointer',
      marginLeft: '10px'
    }
    
    
    const handleUpdate = (newTodo) => {
      updateTodo(newTodo)
      setEdit(false)
    }


  return (
    <>
    {
        edit 
        ? <div style={{ width: '18rem', height: '10rem', border : 'none', marginLeft: '9.5rem'}}className="card col-7">
            <Card style={{width: '21rem', height: '6.5rem', backgroundColor: "#FF6863"  }}>
            <Card.Body>
            <input type="text" value={text} onChange={e => setText(e.target.value)} />
            <div>
            <Save style={icon} onClick={() =>  handleUpdate({ _id, todo: text })} color="green" size={20} />
            <XLg style={icon} onClick={() =>  setEdit(false)} color="grey" size={20}/>
            
            </div>
            </Card.Body>
            </Card>
        </div>
        
        : <div style={{ width: '18rem', height: '10rem', border : 'none', marginLeft: '9.5rem' }} className="card col-7 ">
          <Card style={{ width: '21rem', backgroundColor: "#ffe7ea"}}>
             <Card.Body>
            <Card.Title>{todo} <Trash style={icon} onClick={() =>  deleteTodo(_id)} color="red" size={20} />
            <PencilSquare style={icon} onClick={() =>  setEdit(true)} color="blue" size={20}/></Card.Title>
            <div>
            <p>{dayjs(createdAt).format('DD-MMM-YYYY hh:mm:ss A')}</p>
            </div>
          </Card.Body>
        </Card>
        </div>
        

    }
    </>
  )
}
