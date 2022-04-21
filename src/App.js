import { useState, useEffect } from 'react'
import User from './Accounts/User'
import Todo from './todo/Todo';
import {Routes, Route, Navigate, BrowserRouter} from "react-router-dom";
import { Button } from 'react-bootstrap'

function App() {

  const [token, setToken] = useState(null)
  
  useEffect(() => {
    const user = localStorage.getItem('token')
    user && setToken(user)
  }, [])

  const logOut = () => {
    setToken(null)
    localStorage.clear()
  }

  return (
    <>
   {token && <Button variant="outline-secondary" onClick={logOut}>LOG OUT</Button> }
    <BrowserRouter>
     {
       token ? <Routes>
       <Route path="/" element={<Todo token={token}/>}/>
       <Route path="*" element={<Navigate to="/" replace />}/>
     </Routes> : <Routes>
        <Route path="/auth" element={<User setToken={setToken} />} />
        <Route path="*" element={<Navigate to="/auth" replace />}/>
      </Routes>
     }
    </BrowserRouter>
      </>
  );
}

export default App;
