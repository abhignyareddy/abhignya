const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  user: 
  { type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true 
},
  score: 
  { 
    type: Number, 
    required: true 
},
  timeTaken: 
  { 
    type: Number, 
    required: true 
},
  date: 
  { 
    type: Date, 
    default: Date.now 
},
  rank: 
  { 
    type: Number 
}
});

module.exports = mongoose.model('Results', resultSchema);