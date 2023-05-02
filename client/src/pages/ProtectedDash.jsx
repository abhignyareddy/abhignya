import React from 'react'
import { useSelector } from 'react-redux'
import {Link } from 'react-router-dom'
import { Rules } from './Rules'

export const ProtectedDash = () => {

  const { user } = useSelector((state) => state.auth);

  return (
    <div className="dashboard-container">
      <div className="user-details">
        <div className="user-card">
          <h2>Welcome, {user.firstname} {user.lastname}!</h2>
          <p>Email: {user.email}</p>
          <p>Profession: {user.profession}</p>
        </div>
      </div>
      <div className="other-details">
        <div className="rules">
          <Rules />
        </div>
        <div className="take-test">
          <Link to="/test">
            <button className="submit">Take Test</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
