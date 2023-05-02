import React from 'react'
import {Link} from 'react-router-dom'

export const ProtAdminDash = () => {
  return (
    <div className="admin-dashboard">
      <div className="left-div">
        <div className="admin-card">
          <h5>Admin Details</h5>
          <p>name : Abhignya </p>
        </div>
      </div>
      <div className="right-div">
        <div className="card">
          <Link to='/admin/allusers'><a><h5>Users List</h5></a></Link>
        </div>
        <div className="card">
          <Link to='/admin/testtaken'><a><h5>Test Taken Users List</h5></a></Link>
        </div>
      </div>
    </div>
  );
}

