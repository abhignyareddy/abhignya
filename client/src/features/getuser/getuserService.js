import axios from 'axios'

const API_URL = '/admin/getallusers'


// Get user goals
const getAllUsers = async () => {

  const response = await axios.get(API_URL)

  return response.data
}


const getuserService = {
  getAllUsers
}

export default getuserService