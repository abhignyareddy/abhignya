import React from 'react'

export const TestRules = () => {
  return (
    <div className='instruction'>
    <h2>Rules: </h2>
    <ul>
      <li>The game consists of a set of 6 questions.</li>
      <li>Each question has 4 options to choose from, only one of which is the correct answer</li>
      <li>There is a timer running for the entire game. used to calculate the score.</li>
      <li>If you select an incorrect answer for any of the questions, you will need to start the game again from the beginning.</li>
      <li>You will not be able to see which question you answered incorrectly, so it's important to be careful when selecting your answers.</li>
      <li>You can take the test until/unless you reach the solution end successfully.</li>
      <li>The aim of the game is to get all the questions correct to reach the correct solution end</li>
      <li>If you not reach the end or "start test" recursively displaying that means you didn't answered one or more questions correctly</li>
      <li>If you reach view result button then you had successfully completed the test.</li>
    </ul>
    <p>Click the Start Test button to take test</p>
  </div>
  )
}
