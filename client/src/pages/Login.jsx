import React from 'react'
import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate} from 'react-router-dom'
import {toast } from 'react-toastify'
import { login, reset} from '../features/auth/authSlice'
import { Link } from 'react-router-dom'




export const Login = () => {
  const [formData, setFormData]=useState({
    email:"",
    password:""
  })

  const {email, password}=formData;

  const navigate=useNavigate()

  const dispatch=useDispatch()

  const {user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error('Invalid Credintials', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme:"light",
        });
    }

    if (isSuccess || user) {
      toast.success('Seccussfully logged', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  };



  return (
    <div className='form-container'>
    <div className='form-login'>
    <p>Login to you'r account, have fun!!</p>
      <form onSubmit={handleSubmit}>
      <div className='login-username'>
        <label>
          Email:
        </label>
        <input
          placeholder='Username'
          className='email'
          type='email'
          name='email'
          value={email}
          onChange={onChange}
        />
      </div>
      <div className='login-password'>
        <label>
          Password:
        </label>
        <input
          placeholder='password'
          className='password'
          type='password'
          name='password'
          value={password}
          onChange={onChange}
        />
      </div>
      <div >
            <button type='submit' className='submit'>
              Submit
            </button>
       </div> 
      </form>
      <Link to='/' className='goback'><a>Go back</a></Link>
    </div>
    </div>
  )
}
