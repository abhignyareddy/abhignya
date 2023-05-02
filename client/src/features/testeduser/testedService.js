import axios from 'axios'
const API_URL = '/admin/gettesttakenusers'


// Get user goals
const getAllTestedUsers = async () => {

  const response = await axios.get(API_URL)

  return response.data
}


const testeduserService = {
  getAllTestedUsers
}

export default testeduserService