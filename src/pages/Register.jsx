import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import axios from 'axios';

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [error, setError] = useState('');
  const navigate = useNavigate()


  const changeInputHandler = (e) => {
    setUserData(prevState => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }

  const [showPassword, setShowPassword] = useState(IoMdEyeOff);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  }

  const registerUser = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}/users/register`, userData)
      const newUser = await response.data;
      console.log(newUser);
      if (!newUser) {
        setError("Couldn't register user. Please try again");
      }
      navigate('/login');
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  const inputName = useRef(null);
  const inputEmail = useRef(null);
  const inputPassword = useRef(null);
  const inputConfirmPassword = useRef(null);
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
    <section className="register">
      <div className="container">
        <h2>Sign Up</h2>
        <form className="form register__form" onSubmit={registerUser}>
          {error && <p className="form__error-message">{error}</p>}
          <input type="text" placeholder='Full Name' name='name' value={userData.name} onChange={changeInputHandler} ref={inputName} onKeyDown={(e) => handleKeyDown(e, inputEmail)} autoFocus />
          <input type="text" placeholder='Email' name='email' value={userData.email} onChange={changeInputHandler} ref={inputEmail} onKeyDown={(e) => handleKeyDown(e, inputPassword)}/>
          <div className="input-field">
            <input type={showPassword ? 'password' : 'text'} placeholder='Password' name='password' value={userData.password} onChange={changeInputHandler} ref={inputPassword} onKeyDown={(e) => handleKeyDown(e, inputConfirmPassword)}/>
            <span className='eye-icon' onClick={togglePassword}>
              {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
            </span>
          </div>
          <div className="input-field">
            <input type={showPassword ? 'password' : 'text'} placeholder='Confirm Password' name='confirmPassword' value={userData.confirmPassword} onChange={changeInputHandler} ref={inputConfirmPassword} onKeyDown={(e) => handleKeyDown(e, null)}/>
            <span className='eye-icon' onClick={togglePassword}>
              {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
            </span>
          </div>
          <button type='submit' className='btn primary' ref={submitButton}>Register</button>
        </form>
        <small>Already have an account? <Link to="/login">Sign in</Link></small>
      </div>
    </section>

  )
}

export default Register
