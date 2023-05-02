import React from 'react'
import { useSelector } from 'react-redux';
import { Dashboard } from './pages/Dashboard';
import { ProtectedDash } from './pages/ProtectedDash';
import { ProtAdminDash } from './pages/ProtAdminDash';
// import { Footer } from './Footer';


export const Home = () => {
  
  const {user}=useSelector((state) => state.auth)
  const {admin} = useSelector((state) => state.authadmin)

    return (
        <>
        <div className="Home">
        {user ? (
          <div className='body'>
            <ProtectedDash />
          </div>
        ):(<div className='body'>
          {
            admin ? ( 
              <div>
                <ProtAdminDash/>
              </div>
            ) : (
              <div>
                <Dashboard/>
              </div>
            )
          }
        </div>)}
        </div> 
        </>
      );
}
