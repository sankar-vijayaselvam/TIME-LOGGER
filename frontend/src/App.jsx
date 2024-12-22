import './App.css';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound'
import { RoleContext } from './Context/RoleContext';
import { useEffect, useState } from 'react';
import userRoutes from './Route/userRoutes';
import adminRoutes from './Route/adminRoutes';
function App() {
  const [role,setRole]=useState(localStorage.getItem('role'));
  useEffect(()=>{
    const storedRole=localStorage.getItem('role');
    if(storedRole){
      setRole(storedRole);
    }
  },[]);
  return (
    
   <>
    <RoleContext.Provider value={{role,setRole}}/>
      <BrowserRouter>
        <Routes>
          <Route path="/signup"element={<SignUp/>}/>
          <Route path="/login"element={<Login/>}/>
          {role === 'user' && userRoutes.map((route, index) => (
          <Route 
            key={index}
            path={route.path}
            element={route.element}
          />
        ))}
        {role === 'admin' && adminRoutes.map((route, index) => (
          <Route 
            key={index}
            path={route.path}
            element={
                route.element
            }
          />
        ))}
        
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
    <RoleContext.Provider/>  
   </>
  );
}

export default App;
