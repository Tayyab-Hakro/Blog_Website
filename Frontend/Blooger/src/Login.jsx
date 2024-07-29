import React from 'react'
import { Link, } from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';
function Login() {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/login", {  email, password })
      .then(res =>{
        if(res.data === 'success'){
          window.location.href ="/"
        }
      })
      .catch(err => console.log(err));
  };
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-6 text-center">login</h2>
    <form onSubmit={submitHandler}>
   
   
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
        Sign in
      </button>
      <p>Signup Here </p>
      <Link to={'/register'}> <button className='bg-orange-300'>Signup</button> </Link>
    </form>
  </div>
  )
}

export default Login