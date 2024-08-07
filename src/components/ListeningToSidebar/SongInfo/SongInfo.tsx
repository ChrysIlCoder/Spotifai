import { useSelector } from "react-redux";
import "./SongInfo.scss";
import React from "react";
import { tracksSelector } from "../../../redux/saga/tracks/slice/tracksSlice";

export default function SongInfo() {
  const track = useSelector(tracksSelector.getTrack);

  return (
    <div className="song_info_container">
      <img
        className="song_info_container__cover"
        src={track.album.images[0].url}
        alt="song cover"
        onClick={() => window.open(track.external_urls.spotify)}
      />
      <div className="song_info_container__info">
        <span
          className="song_info_container__info__title"
          onClick={() => window.open(track.external_urls.spotify)}
        >
          {track.name}
        </span>
        <div className="song_info_container__info__artists">
          {track.artists
            .map((artist, index) => (
              <span
                className="song_info_container__info__artists__artist"
                onClick={() => window.open(artist.external_urls.spotify)}
                key={artist.id}
              >
                {artist.name}
                {index < track.artists.length - 1 ? ', ' : ''}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}
