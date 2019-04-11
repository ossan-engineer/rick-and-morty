import React from "react";
import { IEpisode } from "./interfaces";

const EpisodesList = (props: any): Array<JSX.Element> => {
  const { episodes, toggleFavAction, favorites } = props;
  return episodes.map((episode: IEpisode) => (
    <div key={episode.id} className="episode-box">
      <img src={episode.image.medium} alt={`Rick and Mort ${episode.name}`} />
      <div>{episode.name}</div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          Season: {episode.season}
          Number: {episode.number}
        </div>
        <button type="button" onClick={() => toggleFavAction(episode)}>
          {favorites.find((favorite: IEpisode) => favorite.id === episode.id)
            ? "Unfav"
            : "Fav"}
        </button>
      </div>
    </div>
  ));
};

export default EpisodesList;
