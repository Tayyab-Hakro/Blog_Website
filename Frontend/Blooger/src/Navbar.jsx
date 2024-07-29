import React from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import { userContext } from './App';
import { useContext } from 'react';
import axios from 'axios';

function Navbar() {
  const user = useContext(userContext)
  const Navigate = useNavigate()

  const LogoutHandler =()=>{
    axios.get("http://localhost:3001/logout", )
    .then(res =>{
      if(res.data === 'success')
        Navigate("/register")
    }).catch(err => console.log(err))
  }
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-lg font-bold">
        <h1>Blog App</h1>
      </div>
      <div className="flex space-x-4">
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:underline">Home</Link></li>
          {
            user.username ?
            <li><Link to="/create" className="hover:underline">Create</Link></li>
            : <></>
          }
          
          <li><Link to="/contact" className="hover:underline">Contact</Link></li>
        </ul>
      </div>
      {
        user.username ?
        <div>
          <input type='button' onClick={LogoutHandler} value='Logout' />
        </div>
        :
        <div className="flex space-x-4">
        <li><Link to="/register" className="hover:underline">Register/Login</Link></li>
      </div>

      }

    </nav>
  )
}

export default Navbar;
