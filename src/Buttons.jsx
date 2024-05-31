import React from "react";
import {classNames} from "./utils/class-utils";

const Buttons = ({
  options,
  currentQuestionIdx,
  isCorrectAnswer,
  isCorrect,
  answer
}) => {
  return (
    <>
      {Object.entries(options).map(([index, option]) => {
        return (
       
          <Button
            key={index}
            option={option}
            handleClick={() => isCorrectAnswer(index, currentQuestionIdx)}
            isCorrect={isCorrect}
            optionIdx={index}
            answer={answer}
            isDisabled={answer !== ''}
          />
        );
      })}
    </>
  );
};

function Button({ handleClick, option, optionIdx, isCorrect, answer, isDisabled}) {
  const isCorrectAnswer = answer === optionIdx && isCorrect;
  const isWrongAnswer = answer === optionIdx && !isCorrect;

  return (
    <button
      onClick={handleClick}
      className={classNames([
        "answer",
         isCorrectAnswer && "correct",
        isWrongAnswer && "wrong",
      ])}
   disabled={isDisabled}>
      {option}
    </button>
  );
}



export default Buttons;
