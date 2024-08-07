import React from "react";
import "./TrackHorizontalCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ISearchAlbumItem } from "../../interfaces/ISearch";

interface ITrackHorizontalCardProps {
  cover: string;
  name: string;
  artists: string[];
  duration_ms: number;
  album: ISearchAlbumItem;
}

export default function TrackHorizontalCard({...props}: ITrackHorizontalCardProps) {
  const navigate = useNavigate();

  return (
    <div className="track_horizontal_card_container">
      <div className="track_horizontal_card_container__left">
        <div
          className="track_horizontal_card_container__left__cover"
          onClick={() => navigate(`/album/${props.album.id}`)}
          style={{ background: `url('${props.cover}')` }}
        >
          <FontAwesomeIcon
            className="track_horizontal_card_container__left__cover__play"
            icon={faPlay}
          />
        </div>
        <div className="track_horizontal_card_container__left__info">
          <span className="track_horizontal_card_container__left__info__name">
            {props.name}
          </span>
          <span className="track_horizontal_card_container__left__info__artists">
            {props.artists.join(", ")}
          </span>
        </div>
      </div>
      <div className="track_horizontal_card_container__right">
        <span className="track_horizontal_card_container_right__duration">
          {(props.duration_ms / 60000).toFixed(2).replace(".", ":")}
        </span>
      </div>
    </div>
  );
}
