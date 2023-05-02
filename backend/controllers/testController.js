const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const QuestionM = require('../models/questionModel')
const Results = require('../models/resultModel')

const postUser = asyncHandler(async(req, res) => {
    try {
        const { userId, score, timeTaken } = req.body;

        const user = await User.findById(userId).exec();
        if (!user) {
          res.status(400).json({ message: 'Invalid user ID' });
          return;
        }
        const newTestResult = await Results.create({
            user: user._id,
            score,
            timeTaken
        });

        if(newTestResult){
            res.status(200).json({
                user: newTestResult.user,
                score: newTestResult.score,
                timeTaken : newTestResult.timeTaken
            })
        }
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
})

const checkUser = asyncHandler(async(req, res) => {
    try {
        const userId = req.params.userId;
        const testResults = await Results.find({ user: userId }).exec();
        res.status(200).json(testResults);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
})

const getAllTestTakenUsers = asyncHandler(async(req, res) => {
  try {
    const testResults = await Results.find().exec();

    const users = await User.find({ _id: { $in: testResults.map(result => result.user) } }, { firstname: 1, email: 1 }).exec();

    const resultsData = testResults.map(result => ({
      score: result.score,
      timeTaken: result.timeTaken,
      date: result.date,
      user: users.find(user => user._id.toString() === result.user.toString())
    }));

    res.status(200).json(resultsData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = {
    postUser,
    checkUser,
    getAllTestTakenUsers
}