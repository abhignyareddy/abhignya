import axios from 'axios'

const API_URL = '/user/test/'


const getuserresult = async (data) => {
  const response = await axios.get(`/user/test/checkuser/${data}`)
  console.log(response.data)

  if (response.data) {
    localStorage.setItem('result', JSON.stringify(response.data))
  }
  return response.data
  
}

const getallusersresult = async () => {
    const response = await axios.get(API_URL+'getusers')
    console.log(response.data)
  
    if (response.data) {
      localStorage.setItem('result', JSON.stringify(response.data))
    }
    return response.data
    
  }


const resultService = {
    getuserresult,
    getallusersresult
}

export default resultService