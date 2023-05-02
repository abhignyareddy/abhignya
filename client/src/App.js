import './App.css';
import { createBrowserRouter,RouterProvider, createRoutesFromElements, Link, Route,Outlet } from 'react-router-dom'
import {Login} from './pages/Login'
import {Signin} from './pages/Signin'
// import { Contactus } from './pages/Contactus'
import { Home } from './Home';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout,reset } from './features/auth/authSlice';
import { Adminlogin } from './pages/Adminlogin';
import { logoutadmin, resetadmin } from './features/admin/adminSlice';
import {TakeTest} from './pages/TakeTest'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify'
// import {TestPage} from './pages/StartTest'
import { GetAllUsers } from './adminpages/GetAllUsers';
import {GetAllTestTaken} from './adminpages/GetAllTestTaken'
import { ResultPage } from './pages/ResultPage';
import { UserResult } from './pages/UserResult';
import { Footer } from './Footer';


function App() {
  const router= createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root/>}>
        <Route index element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signin" element={<Signin/>}/>
        {/* <Route path="/contactus" element={<Contactus/>}/> */}
        <Route path="/ress" element={<UserResult/>}/>
        <Route path="/admin" element={<Adminlogin/>}/>
        <Route path="/result" element={<ResultPage/>}/>
        <Route path="/test" element={<TakeTest/>} />
        <Route path='/admin/allusers' element={<GetAllUsers/>}/>
        <Route path='/admin/testtaken' element={<GetAllTestTaken/>}/>
      </Route>
    )
  )

  return (
    <div className='App'>
        <RouterProvider router={router} />
        <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>
    </div>
  )
  
}

const Root = () =>{
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const {admin} = useSelector((state) => state.authadmin)
  const {result}=useSelector((state) => state.testresult)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    toast.success("logged out successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    navigate('/')
  }
  const onLogoutAdmin = () => {
    dispatch(logoutadmin())
    dispatch(resetadmin())
    toast.success('Logged out successfully', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    navigate('/')
  }

  return(
    <>
      <div >
        {user ? (
          <div className='header'>
          <div className='head-one'>
            <Link to='/'><a><h6>TRESSURE-HUNT</h6></a></Link>
          </div>
          <div className='head-two'>
            {/* <Link to="/contactus"><a><h6>Contact Us</h6></a></Link> */}
            <Link to="/" className='home'><a><h6>Home</h6></a></Link>
            <button className='logout-btn' onClick={onLogout}>Logout</button>
          </div>
          </div>
        ):(
          admin ? (
            <div>
            <div className='header'>
              <div className='head-one'>
                <Link to="/"><a><h6>Tres-Hunt</h6></a></Link>
                <Link to="/" className='home'><a><h6>Home</h6></a></Link>
            </div>
            <div className='head-two'>
                {/* <Link to="/contactus"><a><h6>Contact Us</h6></a></Link> */}
                <button className='logout-btn' onClick={onLogoutAdmin}>Logout</button>
            </div>
            </div>
            </div>
          ) :(
            <div>
            <div className='header'>
            <div className='head-one'>
              <Link to='/'><a><h3>SKILLZ-HUNT</h3></a></Link>
            </div>
            <div className='head-two'>
                <Link to="/" className='home'><a><h6>Home</h6></a></Link>
                <Link to="/login"><a><h6>Login</h6></a></Link> 
                <Link to="/signin"><a><h6>SignUp</h6></a></Link>
                <Link to="/admin"><a><h6>Admin</h6></a></Link>
                {/* <Link to="/contactus"><a><h6>Contact Us</h6></a></Link>     */}
            </div>
            </div>
            </div>)
        )}
      </div>
      <div>
        <Outlet/>
 
      </div>
    <Footer/>
    </>
  )
}

export default App;
