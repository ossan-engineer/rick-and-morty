import React, { Component, useContext } from "react";
import { Store } from "./Store";
import { IAction, IEpisode } from "./interfaces";

const App = (): JSX.Element => {
  const { state, dispatch } = React.useContext(Store);

  console.log(state);

  React.useEffect(() => {
    state.episodes.length === 0 && fetchDataAction();
  }, []);

  const fetchDataAction = async () => {
    const URL =
      "https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes";
    const data = await fetch(URL);
    const dataJSON = await data.json();
    return dispatch({
      type: "FETCH_DATA",
      payload: dataJSON._embedded.episodes
    });
  };

  const toggleFavAction = (episode: IEpisode) =>
    dispatch({
      type: "ADD_FAV",
      payload: episode
    });

  return (
    <>
      <header className="header">
        <h1>Rick and Morty</h1>
        <p>Pick your favorite episode!</p>
      </header>
      <section className="episode-layout">
        {state.episodes.map((episode: IEpisode) => (
          <div key={episode.id} className="episode-box">
            <img
              src={episode.image.medium}
              alt={`Rick and Mort ${episode.name}`}
            />
            <div>{episode.name}</div>
            <div>
              <div>
                Season: {episode.season}
                Number: {episode.number}
              </div>
              <button type="button" onClick={() => toggleFavAction(episode)}>
                Fav
              </button>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default App;
