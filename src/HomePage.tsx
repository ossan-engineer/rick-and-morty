import React from "react";
import { Store } from "./Store";
import { IAction, IEpisode, IEpisodeProps } from "./interfaces";

const EpisodesList = React.lazy<any>(() => import("./EpisodesList"));

const HomePage = () => {
  const { state, dispatch } = React.useContext(Store);

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

  const toggleFavAction = (episode: IEpisode): IAction => {
    const episodeInFav = state.favorites.includes(episode);
    let dispatchObj = {
      type: "ADD_FAV",
      payload: episode
    };
    if (episodeInFav) {
      dispatchObj = {
        type: "REMOVE_FAV",
        payload: episode
      };
    }

    return dispatch(dispatchObj);
  };

  const props: IEpisodeProps = {
    episodes: state.episodes,
    toggleFavAction,
    favorites: state.favorites
  };

  return (
    <>
      <React.Suspense fallback={<div>...loading</div>}>
        <section className="episode-layout">
          <EpisodesList {...props} />
        </section>
      </React.Suspense>
    </>
  );
};

export default HomePage;
