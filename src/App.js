import { useState, useEffect } from 'react'
import User from './Accounts/User'
import Todo from './todo/Todo';
import {Routes, Route, Navigate, BrowserRouter} from "react-router-dom";

function App() {

  const [token, setToken] = useState(null)
  
  useEffect(() => {
    const user = localStorage.getItem('token')
    user && setToken(user)
  }, [])

  return (
    <>
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
