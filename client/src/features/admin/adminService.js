import axios from 'axios'

const API_URL = '/admin/'


// Login admin
const loginadmin = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('admin', JSON.stringify(response.data))
  }

  return response.data
}

// Logout admin
const logoutadmin = () => {
  localStorage.removeItem('admin')
}

const authService = {
  logoutadmin,
  loginadmin,
}

export default authService