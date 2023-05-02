import React from 'react'
import { Link} from 'react-router-dom'

export const Header = () => {
  return (
    <div className='header'>
        <div className='head1'>
                <Link><h3>SKILLZ-HUNT</h3></Link>
                <Link className='home'>Home</Link>
        </div>
        <div className='head2'>
                <Link to="/login">Login</Link>
                <Link to="/signin">Register</Link>
                <Link to="/contactus">contact</Link>
        </div>
    </div>
  )
}
