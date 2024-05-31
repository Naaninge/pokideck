import React, { useEffect, useState } from "react";
import Stats from "./Stats";
import pokiLoader from "./assets/pokiLoader.gif"

const Card = ({ name, url }) => {
  const [pokimon, setPokimon] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (url) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const pokimons = await response.json();
      setPokimon(pokimons);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(url);
  }, []);

  // replace with loading
  if (pokimon === null || isLoading) {
    return (
      <div className="loading">
        <img src={pokiLoader} alt="loader" />
      </div>
    );
  }

  // if (isLoading) {
  //   return (
  //     <div className="loading">
  //       <img src={pokiLoader} alt="loader" />
  //     </div>
  //   );
  // }

  const {
    abilities,
    id,
    moves,
    weight,
    types,
    sprites: {
      other: {
        showdown: { front_default: img },
      },
    },
    sprites: {
      other: {
        showdown: { back_default: backImg },
      },
    },
    stats,
  } = pokimon;
  const type = types[0].type.name;

  return (
    <article className={type}>
      <p className="id">#{id}</p>

      <section>
        {!showModal ? (
          <>
            <div className="image">
              <img src={img} alt={name} className={name} />
            </div>
            <div className="info">
              <p className="name">{name}</p>
              {/* <div className="abilites">
                <p>Abilities</p>
                {abilities.map((ab) => {
                  const { ability:{name:abName} } = ab;
                  return <span> {abName}</span>;
                })}
              </div> */}
              <p>Type: {type}</p>
              <p>Move:{moves[0].move.name}</p>
              <p>Weight:{weight}</p>
            </div>
          </>
        ) : (
          <>
            <div className="back-img">
              <img src={backImg} alt={name} className={name} />
            </div>
            {stats.map((statistics, index) => {
              const {
                base_stat,
                stat: { name: statName },
              } = statistics;
              return (
                <Stats
                  key={index}
                  base_stat={base_stat}
                  statName={statName}
                ></Stats>
              );
            })}
          </>
        )}
      </section>
      <button
        type="button"
        className="btn"
        onClick={() => setShowModal(!showModal)}
      >
        {showModal ? "Back" : "Stats"}
      </button>
    </article>
  );
};

export default Card;
