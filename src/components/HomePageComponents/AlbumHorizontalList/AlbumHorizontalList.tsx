import React from "react";
import AlbumVerticalCard from "../../AlbumVerticalCard/AlbumVerticalCard";
import "./AlbumHorizontalList.scss";
import { IFeaturedAlbumItem } from "../../../interfaces/IFeaturedAlbums";

interface IAlbumHorizontalListProps {
  chunk: IFeaturedAlbumItem[]
}

export default function AlbumHorizontalList({ chunk }: IAlbumHorizontalListProps) {
  return (
    <div className="genres_horizontal_grid_container">
      {chunk?.map((album) => (
        <AlbumVerticalCard
          cover={album?.images?.[0]?.url}
          artists={album?.artists?.map((artist) => artist?.name)}
          name={album?.name}
          id={album?.id}
          key={album?.id}
        />
      ))}
    </div>
  );
}
