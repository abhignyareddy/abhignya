import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getuserresult } from '../features/results/resultSlice';
import { Link } from 'react-router-dom';

export const UserResult = () => {
  const {user} = useSelector((state) => state.auth)
  const { result } = useSelector((state) => state.testresult);

  const dispatch = useDispatch();

  const handleAllUsers = async (event) => {
    event.preventDefault();
    dispatch(getuserresult(user._id))
  };

  return (
    <div className='user-result'>
      <form onSubmit={handleAllUsers}>
        <button className='ressult-submit' type='submit'>View Results</button>
      </form>
      {result && result.length > 0 ? (
        <div className='res-card'>
          <p>Congratulations, {user.firstname}</p>
          <p>Score     : {result[0].score}</p>
          <p>Total Time: {result[0].timeTaken}</p>
          <p>Test Date : {result[0].date}</p>
        </div>
      ) : (
        <div>
          <p>Click above button to view result</p>
        </div>
      )}
      <Link to='/test' className='goback'><a>Go back</a></Link>
    </div>
  );
}
