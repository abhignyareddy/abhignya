import React from 'react'
import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate} from 'react-router-dom'
import {toast } from 'react-toastify'
import { loginadmin, resetadmin} from "../features/admin/adminSlice"
import { Link } from 'react-router-dom'




export const Adminlogin = () => {

  const [formData, setFormData]=useState({
    email:"",
    password:""
  })

  const {email, password}=formData;

  const navigate=useNavigate()

  const dispatch= useDispatch()

  const {admin, isError, isSuccess, message} = useSelector(
    (state) => state.authadmin
  )

  useEffect(() =>{
    if(isError){
        toast.error(message)
    }
    if (isSuccess || admin) {
      toast.success('successfully logged', {
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
    dispatch(resetadmin())
  },[admin, isError,isSuccess,message,navigate,dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const adminData = {
      email,
      password,
    }
    dispatch(loginadmin(adminData))
  };




  return (
    <div className='form-container'>
    <div className='form-admin'>
    <p><h2>Admin Login</h2></p>
      <form onSubmit={handleSubmit}>
      <div className='admin-username'>
        <label>
          Username:
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
      <div className='admin-password'>
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
