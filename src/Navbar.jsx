import React from "react";
import pokiball from "./assets/bluePokiball.svg"

import { Dpad,Controller,PersonCircle } from "react-bootstrap-icons";


const Navbar = ({setIsQuiz,setIsGuessingGame,setIsSigningUp}) => {
  return (
    <nav className="sideBar">
      <ul>
        <li className="pokiball ">
          <button
            className="nav-btn"
            onClick={() => {
              setIsQuiz(false);
              setIsSigningUp(false);
              setIsGuessingGame(false);
            }}
          >
            <img src={pokiball} alt="pokiball" />
          </button>
        </li>
        <li>
          <button
            className="nav-btn"
            onClick={() => {
              setIsQuiz(true);
              setIsGuessingGame(false);
              setIsSigningUp(false);
            }}
          >
            {" "}
            {/* <QuestionCircleFill className="quiz"></QuestionCircleFill> */}
            <Dpad className="blue"></Dpad>
          </button>
        </li>
        <li>
          <button className="nav-btn">
            <Controller
              className="blue"
              onClick={() => {
                setIsQuiz(false);
                setIsGuessingGame(true);
                setIsSigningUp(false);
              }}
            ></Controller>
          </button>
        </li>
        <li>
          <button className="nav-btn">
            <PersonCircle
              className="blue"
              onClick={() => {
                setIsQuiz(false);
                setIsGuessingGame(false);
                setIsSigningUp(true);
              }}
            ></PersonCircle>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
