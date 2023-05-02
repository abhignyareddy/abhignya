import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../features/getuser/getuserSlice';
import { Link } from 'react-router-dom';

export const GetAllUsers = () => {
  const dispatch = useDispatch()

  const {allusers} =useSelector((state) => state.allusers)

  const handleAllUsers = async (event) => {
    event.preventDefault();
    dispatch(getAllUsers())
  };

  const UserCard = ({ user }) => {
    return (
      <div className='alluser-card'>
        <p>{user.firstname} {user.lastname}</p>
        <p>Profession: {user.profession}</p>
        <p>Email: {user.email}</p>
      </div>
    );
  };


  return (
    <div>
        <Link to='/' className='goback'><a>Go back to Home </a></Link>
        <form onSubmit={handleAllUsers}>
          <button className='submit' type='submit'>get all users</button>
        </form>
        {allusers ? (
          <div className='alluser-conatiner'>
            {allusers.map(user => (
              <UserCard key={user._id} user={user} />
            ))}
          </div>
        ): (
          <p>no data found</p>
        )}
    </div>
  )
}
