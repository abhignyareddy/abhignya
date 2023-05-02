const mongoose = require('mongoose')

const adminSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, 'Please add a name'],
    },
    lastname: {
      type: String,
      required: [true, 'Please add a name'],
    },
    profession: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Admin', adminSchema)