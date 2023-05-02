import React, { useEffect, useState } from 'react'
import {getquestion, resettest, testCompleted} from '../features/taketest/testSlice'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ResultPage } from './ResultPage';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserResult } from './UserResult';
import { Link } from 'react-router-dom';
import { TestRules } from './TestRules';


export const TakeTest = () => {


  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showQuestions, setShowQuestions] = useState(false);
  const [selectedAnswerIds, setSelectedAnswerIds] = useState([]);
  const [timeTaken, setTimeTaken] = useState(0);
  const [isTestCompleted, setTestCompleted] = useState(false);
  const [navigateToResult, setNavigateToResult] = useState(false);
  const [isAllNotCorrect, setAllNotCorrect]=useState(false)

  //check the user already taken the test or not
  const [hasTakenTest, setHasTakenTest] = useState(false);

  const {user}= useSelector(
    (state) => state.auth
  )

  const userId=user._id;

  async function checkTestTaken() {
    try {
      const response = await axios.get(`/user/test/checkuser/${userId}`);
      if (response.data.length > 0) {
        setHasTakenTest(true);
      }else{
        setShowQuestions(true);
      }
    } catch (err) {
      console.error(err);
    }
  }


  const dispatch = useDispatch();
  const navigate= useNavigate();

  const { question, isError, isSuccess, message } = useSelector(
    (state) => state.testdata
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || question) {
    }

    dispatch(resettest());
  }, [question, isError, isSuccess, message, dispatch]);

  useEffect(() => {
    let intervalId = null;
    if (showQuestions) {
      intervalId = setInterval(() => {
        setTimeTaken((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [showQuestions]);

  const handleAnswerSelection = (answerId) => {
    setSelectedAnswerIds([...selectedAnswerIds, answerId]);
  };

  const handleNextQuestion = async() => {
    const isAnswerCorrect = question[currentQuestionIndex].answers
      .filter((answer) => answer.isCorrect)
      .every((answer) => selectedAnswerIds.includes(answer._id));

    if (!isAnswerCorrect) {
      // setSelectedAnswerIds([]);
      // setCurrentQuestionIndex(0);
      setAllNotCorrect(true)
      // setShowQuestions(false);
      // setTimeTaken(0);
      // setTestCompleted(false)
    } 
     if (currentQuestionIndex === question.length - 1) {

      if (isAllNotCorrect) {
        setAllNotCorrect(false)
        setSelectedAnswerIds([]);
        setCurrentQuestionIndex(0);
        setShowQuestions(false);
        setTimeTaken(0);
        setTestCompleted(false)
      } else{
      // quiz completed
      // perform necessary actions
      setSelectedAnswerIds([]);
      // setCurrentQuestionIndex(0);
      setTestCompleted(true)
      setShowQuestions(false);

      // send data to server
      const accuracy = selectedAnswerIds.length / question.length;
      const timeFactor = 1 - (timeTaken / (question.length * 45)); // assuming each question should take around 10 seconds
      const score = accuracy * timeFactor * 100;
      const time = timeTaken;
      
      const data = {
        userId: userId,
        score: score,
        timeTaken: time
      };
      setTestCompleted(true)
      setNavigateToResult(true);
      navigate('/ress')
      dispatch(testCompleted(data))

      setTimeTaken(0);
    }
    } else {
      setSelectedAnswerIds([]);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTestCompleted(false)
    }
  
  };

  if (navigateToResult || isTestCompleted) {
    return <UserResult />;
  }

  const getQuestions = async (event) => {
    event.preventDefault();
    checkTestTaken()
    dispatch(getquestion());
  };


  return (
    <div className='taketest'>
      {hasTakenTest ? (
          <div className='already'>
          <p> You have already taken the test</p>
          <Link to='/ress' className='submit'><a>view test result</a></Link>
          <Link to='/' className='submit'><a>Go back </a></Link>
          </div>
      ) : (
        <div>
      {showQuestions ? (
          <div className='question-container'>
          <p className='time'>Time: {timeTaken}</p>
          <div className='questions'>
          <div key={question[currentQuestionIndex]._id}>
            <p className='question-para'>{`${currentQuestionIndex + 1}. ${question[currentQuestionIndex].text}`}</p>
            <p className='question-para'>Hint: {` ${question[currentQuestionIndex].clue}`}</p>
            {question[currentQuestionIndex].answers.map((answer) => (
              <div key={answer._id} onClick={() => handleAnswerSelection(answer._id)}>
                {answer.isInput ? (
                  <input type='text' placeholder='Type your answer here' />
                ) : (
                  <label>
                    <input type={answer.isMultiple ? 'checkbox' : 'radio'} />
                    {answer.text}
                  </label>
                )}
              </div>
            ))}
          </div>
          <button type='button' className='btn-next' onClick={handleNextQuestion}>
            {currentQuestionIndex === question.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
          </div>
      ) : (
        <div className='testsbumit'>
          <TestRules/>
          <form onSubmit={getQuestions}>
            <button type='submit' className='submit'>
              Start Test
            </button>
          </form>
          <Link to='/' className='goback'><a>Go back to Home </a></Link>
        </div>
      )}
    </div>
      )}
    </div>
  );

}

