import React from 'react'
import './login.css'
import Header from './header'


const Login = () => {
  return (
    <div>
      <Header/>
      <div className="login-input">
      <input type="text" placeholder='name'></input>
      <input type="text" placeholder='email'/>
      <button type="submit">Log-in</button>
      </div>
    </div>
  )
}

export default Login