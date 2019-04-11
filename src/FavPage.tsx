import React from "react";
import { Store } from "./Store";
import { IEpisodeProps } from "./interfaces";
import { toggleFavAction } from "./Actions";

const EpisodesList = React.lazy<any>(() => import("./EpisodesList"));

const FavPage = (): JSX.Element => {
  const { state, dispatch } = React.useContext(Store);
  const props: IEpisodeProps = {
    episodes: state.favorites,
    store: { state, dispatch },
    toggleFavAction,
    favorites: state.favorites
  };
  return (
    <React.Suspense fallback={<div>...loading</div>}>
      <div className="episode-layout">
        <EpisodesList {...props} />
      </div>
    </React.Suspense>
  );
};

export default FavPage;
