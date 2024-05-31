import React from "react";
import { classNames } from "./utils/class-utils";

const QuizChoices = ({
  correctAnswer,
  answer,
  choice,
  validateAnswer,
  isDisabled,
}) => {
  const isCurrentSelection = answer === choice;
  const isCorrect = isCurrentSelection && correctAnswer === answer;
  const isWrong =
    isCurrentSelection && correctAnswer !== answer && answer !== "";

  return (
    <button
      className={classNames([
        "choice-btn",
        isCorrect && "correct",
        isWrong && "wrong",
      ])}
      onClick={() => validateAnswer(choice)}
      disabled={isDisabled}
    >
      {choice}
    </button>
  );
};

export default QuizChoices;
