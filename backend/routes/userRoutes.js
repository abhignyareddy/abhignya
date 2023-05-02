const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
  getQuestions
} = require('../controllers/userController')
const {
  postUser,
  getAllTestTakenUsers,
  checkUser
} = require('../controllers/testController')
const { protect } = require('../middleware/authMiddleware')

router.post('/register',registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.get('/questions', getQuestions)
router.post('/test/postuser', postUser)
router.get('/test/getusers', getAllTestTakenUsers)
router.get('/test/checkuser/:userId', checkUser)


module.exports = router
