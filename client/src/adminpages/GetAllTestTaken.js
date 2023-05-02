import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {getAllTestedUsers} from '../features/testeduser/testedSlice'
import { Link } from 'react-router-dom';

export const GetAllTestTaken = () => {
  const dispatch = useDispatch()

  const {testedusers} =useSelector((state) => state.testedusers)

  const handleAllUsers = async (event) => {
    event.preventDefault();
    dispatch(getAllTestedUsers())
  };




  return (
    <div className='table-container'>
              <Link to='/' className='goback'><a>Go back</a></Link>
        <form onSubmit={handleAllUsers}>
          <button className='submit' type='submit'>Get all Test taken Users</button>
        </form>
        {
          <div>
          <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Email</th>
          <th>Score</th>
          <th>Time Taken</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {testedusers.map((user, index) => (
          <tr key={index}>
            <td>{user.user?.firstname || ''}</td>
            <td>{user.user?.email || ''}</td>
            <td>{user.score}</td>
            <td>{user.timeTaken}</td>
            <td>{user.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
          </div>
        }
    </div>
  )
}