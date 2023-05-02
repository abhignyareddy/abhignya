const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
});

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  clue:{
    type: String
  },
  answers: [answerSchema],
});

const QuestionM = mongoose.model('QuestionM', questionSchema);

module.exports = QuestionM;
