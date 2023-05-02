const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Admin = require('../models/adminModel')
const QuestionM = require('../models/questionModel')

// @desc    Register new admin
// @route   POST /api/users
// @access  Public
const registerAdmin = asyncHandler(async (req, res) => {
  const { firstname, lastname, profession, email, password } = req.body

  if (!firstname || !lastname || !profession || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if admin exists
  const adminExists = await Admin.findOne({ email })

  if (adminExists) {
    res.status(400)
    throw new Error('Admin already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create admin
  const admin = await Admin.create({
    firstname,
    lastname,
    profession,
    email,
    password: hashedPassword,
  })

  if (admin) {
    res.status(201).json({
      _id: admin.id,
      firstname: admin.firstname,
      lastname: admin.lastname,
      profession: admin.profession,
      email: admin.email,
      token: generateToken(admin._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid admin data')
  }
})

// @desc    Authenticate a admin
// @route   POST /api/users/login
// @access  Public
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for admin email
  const admin = await Admin.findOne({ email })

  if (admin && (await bcrypt.compare(password, admin.password))) {
    res.json({
      _id: admin.id,
      name: admin.name,
      email: admin.email,
      firstname: admin.firstname,
      lastname: admin.lastname,
      profession: admin.profession,
      token: generateToken(admin._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// @desc    Get admin data
// @route   GET /api/users/me
// @access  Private
const getAdmin = asyncHandler(async (req, res) => {
  res.status(200).json(req.admin)
})


const createQuestion = asyncHandler(async(req, res) =>{
  const { text,clue, answers } = req.body;

  const newQuestion = new QuestionM({
    text,
    clue,
    answers,
  });

  try {
    const question = await newQuestion.save();
    res.json(question);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
})

const getQuestions = asyncHandler(async(req, res) => {
  try {
    const questions = await QuestionM.find();
    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }

})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerAdmin,
  loginAdmin,
  getAdmin,
  createQuestion,
  getQuestions
}