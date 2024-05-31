import React from 'react'
import { ArrowClockwise } from "react-bootstrap-icons";

const QuizFeedback = ({finalScore,pokeLength,reloadQuiz}) => {
  const comments = [
    { msg: "Not Quite,Try Again.", gif: "https://i.gifer.com/5Q0v.gif" },
    { msg: "Good Job!", gif: "https://i.gifer.com/5IPv.gif" },
    { msg: "Excellent Job!!", gif: "https://i.gifer.com/5IPv.gif" },
  ];

  // get score calculate percentage if above 50 good, above 60 great job , 90 to 100 excellent
  const quizPercentage = (finalScore / pokeLength) * 100
  const displayMessage = () => {
    if (quizPercentage < 50) {
      return comments[0]
    } else if ( quizPercentage >= 50 && quizPercentage <= 65) {
      return comments[1]
    } else if (quizPercentage >= 70) {
      return comments[2]
    }
  }
  
  const {msg,gif} = displayMessage()
  return (
    <div className="feedback-div">
      <p className="feedback-msg"> {msg}</p>
      <h2 className="finalscore">{quizPercentage}%</h2>
      <img src={gif} alt="pokimon"  />
      <button
        onClick={() => {
          reloadQuiz();
        }}
      >
        <ArrowClockwise></ArrowClockwise>
      </button>
    </div>
  );
}

export default QuizFeedback
