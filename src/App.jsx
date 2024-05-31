import { useEffect, useState } from "react";
import logo from "./assets/logo.png";
import Card from "./Card";
import Navbar from "./Navbar";
import Quiz from "./Quiz";
import pokiLoader from "./assets/pokiLoader.gif";
import Auth from "./Auth";
import GuessingGame from "./GuessingGame";

const url = "https://pokeapi.co/api/v2/pokemon/";

function App() {
  const [pokimon, setPokimon] = useState([]);
  const [isQuiz, setIsQuiz] = useState(false);
  const [isGuessingGame, setIsGuessingGame] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false)
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (url) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const pokimons = await response.json();

      setPokimon(pokimons.results);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(url);
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <img src={pokiLoader} alt="loader" />
      </div>
    );
  }

  return (
    <main>
      <Navbar
        setIsQuiz={setIsQuiz}
        setIsGuessingGame={setIsGuessingGame}
        setIsSigningUp={setIsSigningUp}
      ></Navbar>
      <header>
        <img src={logo} alt="logo" className="logo" />
      </header>

      {isQuiz && !isGuessingGame && !isSigningUp ? (
        <Quiz></Quiz>
      ) : !isQuiz && isGuessingGame && !isSigningUp ? (
        <GuessingGame url={url} pokemons={pokimon.slice(0,5)}></GuessingGame>
      ) : !isQuiz && !isGuessingGame && isSigningUp ? (
        <Auth ></Auth>
      ) : (
        <div className="container">
          {pokimon.map((p, index) => {
            const { name, url } = p;
            return <Card key={index} name={name} url={url}></Card>;
          })}
        </div>
      )}
    </main>
  );
}

export default App;
