import React, { useEffect } from "react";
import "./AlbumVerticalCard.scss";
import PlayButton from "../Buttons/PlayButton/PlayButton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { audioStateSelector } from "../../redux/features/audioState/audioStateSlice";

interface IAlbumVerticalCard {
  cover: string;
  name: string;
  artists: string[];
  id: string;
  playlist?: boolean;
}

export default function AlbumVerticalCard({ ...props }: IAlbumVerticalCard) {
  const navigate = useNavigate()
  const audioState = useSelector(audioStateSelector.getAudioState)

  const handleClick = () => {
    props.playlist ? window.open(`https://open.spotify.com/playlist/${props.id}`) : navigate(`/album/${props.id}`)
  }

  return (
    <div className="album_vertical_card_container" onClick={handleClick}>
      <div className="album_vertical_card_container__cover_container">
        <PlayButton
          album_id={props.id}
          className="album_vertical_card_container__cover_container__play"
          onClick={() => {}}
        />
        <img
          className="album_vertical_card_container__cover_container__cover"
          src={props.cover}
          alt={props.name}
        />
      </div>
      <span className="album_vertical_card_container__name" style={{ color: audioState.album_id === props.id ? '#65D36E' : 'white'}}>{props.name}</span>
      <span className="album_vertical_card_container__artists">
          {props.artists.join(", ")}
      </span>
    </div>
  );
}
