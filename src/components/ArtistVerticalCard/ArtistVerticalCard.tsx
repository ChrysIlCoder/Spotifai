import React from "react";
import "./ArtistVerticalCard.scss";

interface IArtistVerticalCardProps {
  cover: string;
  name: string;
  id: string;
}

export default function ArtistVerticalCard({
  ...props
}: IArtistVerticalCardProps) {
  return (
    <div
      className="artist_vertical_card_container"
      onClick={() => window.open(`https://open.spotify.com/artist/${props.id}`)}
    >
      <img
        className="artist_vertical_card_container__cover"
        src={
          props.cover ??
          "https://www.publicdomainpictures.net/pictures/240000/velka/slate-grey-color.jpg"
        }
        alt=""
      />
      <span className="artist_vertical_card_container__name">{props.name}</span>
      <span className="artist_vertical_card_container__artist">Artist</span>
    </div>
  );
}
