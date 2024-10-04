import React, { useState, useContext, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import axios from 'axios';

import { UserContext } from '../context/userContext.jsx'

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState('');
  const navigate = useNavigate()

  const { setCurrentUser } = useContext(UserContext)


  const changeInputHandler = (e) => {
    setUserData(prevState => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }

  const [showPassword, setShowPassword] = useState(IoMdEyeOff);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  }

  const loginUser = async (e) => {
    e.preventDefault();
    setError('')
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}/users/login`, userData);
      const user = await response.data;
      setCurrentUser(user);
      navigate('/')
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  const inputEmail = useRef(null);
  const inputPassword = useRef(null);
  const submitButton = useRef(null);

  const handleKeyDown = (e, nextInput) => {
    if(e.key === 'Enter') {
      e.preventDefault();
      if(nextInput){
        nextInput.current.focus();
      } else {
        submitButton.current.click();
      }
    }
  }

  return (
    <section className="login">
      <div className="container">
        <h2>Sign In</h2>
        <form className="form login__form" onSubmit={loginUser}>
          {error && <p className="form__error-message">{error}</p>}
          <input type="text" placeholder='Email' name='email' value={userData.email} onChange={changeInputHandler} autoFocus autoComplete='off' ref={inputEmail} onKeyDown={(e) => handleKeyDown(e, inputPassword)} />
          <div className="input-field">
            <input type={showPassword ? 'password' : 'text'} placeholder='Password' name='password' value={userData.password} onChange={changeInputHandler} ref={inputPassword} onKeyDown={(e) => handleKeyDown(e, null)}/>
            <span className='eye-icon' onClick={togglePassword}>
              {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
            </span>
          </div>

          <button type='submit' className='btn primary' ref={submitButton}>Login</button>
        </form>
        <small>Don't have an account? <Link to="/register">Sign up</Link></small>
      </div>
    </section>

  )
}

export default Login
