import axios from 'axios'

const API_URL = '/user/questions'


const getquestion = async () => {
  const response = await axios.get(API_URL)
  console.log(response.data)

  if (response.data) {
    localStorage.setItem('question', JSON.stringify(response.data))
  }
  return response.data
  
}

const getallquestion = async () => {
  const response = await axios.get('/admin/getallquestions')
  console.log(response.data)

  if (response.data) {
    localStorage.setItem('question', JSON.stringify(response.data))
  }
  return response.data
  
}

const testCompleted = async (data) => {
  const response = await axios.post('/user/test/postuser', data)
  console.log(response.data)

  // if (response.data) {
  //   localStorage.setItem('question', JSON.stringify(response.data))
  // }
  return response.data
  
}



const testService = {
    getquestion,
    getallquestion,
    testCompleted
}

export default testService