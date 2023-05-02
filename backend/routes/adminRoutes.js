const express = require('express')
const router = express.Router()
const {
    registerAdmin,
    loginAdmin,
    getAdmin,
    createQuestion,
    getQuestions
} = require('../controllers/adminController')
const {
    getAllTestTakenUsers
}= require('../controllers/testController')
const {
    getAllUsers
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/register',registerAdmin)
router.post('/login', loginAdmin)
router.post('/createquestion',createQuestion)
router.get('/getallquestions', getQuestions)
router.get('/getallusers', getAllUsers)
router.get('/gettesttakenusers', getAllTestTakenUsers)
// router.get('/me', protect, getMe)

module.exports = router