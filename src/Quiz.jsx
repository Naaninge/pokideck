import React, { useState } from "react";
import pokimons from "./assets/pokimonGo.png";
import { ArrowRight } from "react-bootstrap-icons";
import { ArrowLeft } from "react-bootstrap-icons";
import questions from "./questions";
import Buttons from "./Buttons";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);

  function resetStates() {
    setIsCorrect(false);
    setAnswer("");
  }
  const nextQuestion = () => {
    if (currentQuestion <= questions.length - 2) {
      setCurrentQuestion((currentQuestion) => {
        return currentQuestion + 1;
      });

      resetStates();
    }
  };

  // const prevQuestion = () => {
  //   if (currentQuestion > 0) {
  //     setCurrentQuestion((currentQuestion) => {
  //       return currentQuestion - 1;
  //     });

  //     resetStates();
  //   }
  // };

  const takeQuiz = () => {
    setIsPlay(true);
  };
  const {
    question,
    options: { a, b, c, d },
    correct_option,
  } = questions[currentQuestion];

  // This function checks if the answer clicked by user is correct
  const validateAnswer = (answerIdx, questionIdx) => {
    const answerOption = questions[questionIdx].correct_option;
    const correctAnswer = questions[questionIdx].options[answerOption];
    setAnswer(answerIdx);
    if (answerOption === answerIdx) {
      console.log(`the correct answer is ${correctAnswer}`);
      setIsCorrect(true);
      // add one to the score
      setScore((score) => {
        return score + 1;
      });
    } else {
      console.log(`${questions[questionIdx].options[answerIdx]} is incorrect`);
      setIsCorrect(false);
    }
  };

  return (
    <div className="quizzes">
      {/* Create title page */}
      <article className="quiz">
        {isPlay ? (
          <>
            <section>
              <span className="number">Question: {currentQuestion + 1}</span>
              <span className="score">
                Score: {score}/{questions.length}
              </span>
              <div className="question-image">
                <img src={pokimons} />
              </div>
              <div className="questions-cont">
                <p className="question">{question}</p>
              </div>
              <div className="answers-cont">
                <Buttons
                  questions={questions}
                  options={questions[currentQuestion].options}
                  currentQuestionIdx={currentQuestion}
                  isCorrectAnswer={validateAnswer}
                  isCorrect={isCorrect}
                  answer={answer}
                ></Buttons>
              </div>
            </section>

            <div className="buttons">
              <button type="button" onClick={nextQuestion} className="next" disabled={answer === ''}>
                next <ArrowRight className="arrow "></ArrowRight>
              </button>
            </div>
          </>
        ) : (
          <div className="quiz-intro">
            <h3>Pokimon Trivia Quiz</h3>
            <img src={pokimons} alt="pokimon image" />
            <button type="button" onClick={takeQuiz} className="btn play-btn">
              Take Quiz
            </button>
              
          </div>
        )}
      </article>
    </div>
  );
};

export default Quiz;
