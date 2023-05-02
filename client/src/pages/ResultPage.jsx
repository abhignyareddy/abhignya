import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getuserresult } from '../features/results/resultSlice';

export const ResultPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { result } = useSelector((state) => state.testresult);

  const dispatch = useDispatch();

  const handleAllUsers = async (event) => {
    event.preventDefault();
    dispatch(getuserresult())
  };

  return (
    <div>
        <form onSubmit={handleAllUsers}>
          <button className='submit' type='submit'>get all users</button>
        </form>
    </div>
  );
};

