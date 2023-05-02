import React from 'react'
import { useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {toast} from 'react-toastify'
import { useSelector } from 'react-redux'
import { register, reset } from '../features/auth/authSlice'
import { Link } from 'react-router-dom'


export const Signin = () => {
  const [formData, setFormData]=useState({
    firstname:"",
    lastname:"",
    profession:"",
    email:"",
    password:"",
    confirmpassword:""
  })


  const {
          email, 
          password,
          firstname,
          lastname,
          profession,
          confirmpassword}=formData;

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
        theme: "dark",
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

    if(password === confirmpassword){
      const userData = {
        email,
        firstname,
        lastname,
        profession,
        password,
      }

      dispatch(register(userData))
    }
    else{
      toast.error("password doesn't match", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  };

  return (
    <div className='form-container'>
    <div className='form-signin'>
      
      <form onSubmit={handleSubmit}>
      <div className='signin-email'>
        <p>Create a account to take test!</p>
        <label>
          email:
        </label>
        <input
          placeholder='email'
          className='email'
          type='text'
          name='email'
          value={email}
          onChange={onChange}
        />
      </div>
      <div className='signin-firstname'>
        <label>
          Firstname:
        </label>
        <input
          placeholder='Firstname'
          className='firstname'
          type='text'
          name='firstname'
          value={firstname}
          onChange={onChange}
        />
      </div>
      <div className='signin-lastname'>
        <label>
          lastname:
        </label>
        <input
          placeholder='lastname'
          className='lastname'
          type='text'
          name='lastname'
          value={lastname}
          onChange={onChange}
        />
      </div>
      <div className='signin-profession'>
        <label>
          profession:
        </label>
        <input
          placeholder='profession'
          className='profession'
          type='text'
          name='profession'
          value={profession}
          onChange={onChange}
        />
      </div>
      <div className='signin-password'>
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
      <div className='signin-confirmpassword'>
        <label>
          confirmpassword:
        </label>
        <input
          placeholder='confirmpassword'
          className='confirmpassword'
          type='password'
          name='confirmpassword'
          value={confirmpassword}
          onChange={onChange}
        />
      </div>
      <div >
            <button type='submit' className='submit'>
              Submit
            </button>
       </div> 
      </form>
      <Link to='/' className='goback'><a>Go back to Home </a></Link>
    </div>
    </div>
  )
}