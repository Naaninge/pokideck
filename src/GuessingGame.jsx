import React, { useEffect, useState } from "react";
import {
  LightningChargeFill,
  ShieldFill,
  ArrowRight,
  Question,
} from "react-bootstrap-icons";
import pokeImage from "./assets/guessingGame.png";
import QuizChoices from "./QuizChoices";
import QuizFeedback from "./QuizFeedback";
import pokiLoader from "./assets/pokiLoader.gif";

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

const GuessingGame = ({ pokemons: pokes }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [pokemons, setPokemons] = useState(undefined);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [score, setScore] = useState(0);
  const [pokemonUrl, setPokemonUrl] = useState(undefined);
  const [choicesList, setChoicesList] = useState([]);
  const [answer, setAnswer] = useState("");
  const [isEndOfGame, setEndOfGame] = useState(false);

  const fetchPokemon = async (url) => {
    try {
      const resp = await fetch(url);
      const data = await resp.json();
      const choices = getChoiceList(data, pokemons);
      setCurrentPokemon(data);
      setChoicesList(choices);
    } catch (error) {
      console.error(error);
    }
  };

  const validateAnswer = (answer) => {
    if (answer === currentPokemon.name) {
      setScore((oldScore) => {
        return oldScore + 1;
      });
    }
    setAnswer(answer);
  };

  // get next pokemons
  function nextPokemon() {
    if (currentIdx >= pokemons.length) {
      return;
    }
    const nextPokeIndex = currentIdx + 1;
    setCurrentIdx(nextPokeIndex);

    // set the url
    const newUrl = pokemons[nextPokeIndex].url;
    setPokemonUrl(newUrl);
    setCurrentPokemon(null);
    fetchPokemon(pokemonUrl);
    setAnswer("");
  }

  useEffect(() => {
    if (pokemonUrl) {
      fetchPokemon(pokemonUrl);
    }
  }, [pokemonUrl]);

  useEffect(() => {
    start(currentIdx);
  }, []);

  function start(currentIdx) {
    const shuffled = shuffleArray(pokes || []);
    setPokemons(shuffled);
    setPokemonUrl(shuffled[currentIdx].url);
  }

  function reloadQuiz() {
    setCurrentIdx(0);
    start(0);
    setScore(0);
    setEndOfGame(false);
    setAnswer("")
    setIsAnswered(false)
  }

  if (!pokemons) {
    return (
      <article className=" guessing-game-card">
        <Question></Question>
      </article>
    );
  }

  if (!currentPokemon) {
    return (
      <article className=" guessing-game-card">
        {" "}
        <img src={pokiLoader} alt="loader" />
      </article>
    );
  }

  //display picture and information about pokimon

  const hp = currentPokemon.stats[0].base_stat || 70;
  const attack = currentPokemon.stats[1].base_stat || 30;
  const defense = currentPokemon.stats[2].base_stat || 20;
  const speed = currentPokemon.stats[5].base_stat || 40;
  const image =
    currentPokemon.sprites.other["official-artwork"].front_default || pokeImage;
  const pokeName = currentPokemon.name;
  const noOfPokemon = pokemons.length;
  const isLastPlay = currentIdx === noOfPokemon - 1;

  return (
    <>
      <article className=" guessing-game-card">
        {!isEndOfGame ? (
          <div>
            <section className="guessing-game-section">
              {/* design a card */}
              {/* design questions */}
              <div className="guessing-game-title">
                <p className="basic">
                  score:{score}/{noOfPokemon}
                </p>
                <div className="guessing-game-stats">
                  <p className="hp">hp</p>
                  <p className="hp-number">{hp}</p>
                  <span className="ball">
                    <LightningChargeFill className="lightning-icon"></LightningChargeFill>
                  </span>
                </div>
              </div>
              <div className="guessing-card-image">
                <img src={image} alt="" />
              </div>
              <div className="choices">
                {choicesList.map((choice, idx) => {
                  return (
                    <QuizChoices
                      choice={choice}
                      correctAnswer={pokeName}
                      validateAnswer={validateAnswer}
                      answer={answer}
                      isDisabled={answer != ""}
                      key={idx}
                    ></QuizChoices>
                  );
                })}
              </div>
              <div className="guessing-game-footer">
                <div className="guessing-game-statistics">
                  {" "}
                  attack{" "}
                  <span className="ball">
                    <LightningChargeFill className="lightning-icon"></LightningChargeFill>
                  </span>{" "}
                  x {attack} | defense{" "}
                  <span className="ball">
                    <ShieldFill className="lightning-icon  shield"></ShieldFill>
                  </span>{" "}
                  {defense} | speed {speed}
                </div>
              </div>
              {isLastPlay ? (
                <button disabled={answer===""}className="next-btn" onClick={() => setEndOfGame(true)}>
                  Finish <ArrowRight></ArrowRight>
                </button>
              ) : (
                <button  disabled={answer===""}className="next-btn" onClick={nextPokemon}>
                  next <ArrowRight></ArrowRight>
                </button>
              )}
            </section>
          </div>
        ) : (
          <QuizFeedback
            finalScore={score}
            pokeLength={pokes.length}
            reloadQuiz={reloadQuiz}
          ></QuizFeedback>
        )}
      </article>
    </>
  );
};

export default GuessingGame;

// generates a random number between 0 and the length of
function randomizer(limit) {
  return Math.floor(Math.random() * limit);
}

// this function returns a list of 3 random pokimons and the correct pokimon
function getChoiceList(currentPokemon, pokemons) {
  // generate  three random numbers
  const _pokemons = pokemons.filter((p) => currentPokemon.name !== p.name);
  const randomChoiceList = []; //[currentPokemon.name];

  const randomIdx = randomizer(4);
  for (let i = 0; i < 4; i++) {
    if (i === randomIdx) {
      randomChoiceList.push(currentPokemon.name);
      continue;
    }

    const selectIndex = randomizer(_pokemons.length);
    randomChoiceList.push(_pokemons[selectIndex].name);
    _pokemons.splice(selectIndex, 1);
  }

  return randomChoiceList;
}
