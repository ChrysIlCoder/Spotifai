import { useNavigate } from "react-router-dom";
import "./AlbumsVerticalList.scss";
import React from "react";
import { IFeaturedAlbumsList } from "../../interfaces/IFeaturedAlbums";

interface IAlbumsVerticalListProps extends IFeaturedAlbumsList {
  collapsed: boolean;
}

export default function AlbumsVerticalList({
  ...props
}: IAlbumsVerticalListProps) {
  const navigate = useNavigate();

  return (
    <div className="albums_vertical_list_container">
      {props?.albums?.items?.slice(0, 20)?.map(
        !props.collapsed
          ? (album) => (
              <span
                key={album.id}
                onClick={() => navigate(`/album/${album.id}`)}
                className="albums_vertical_list_container__name"
              >
                {album.name}
              </span>
            )
          : (album) => (
              <img
                onClick={() => navigate(`/album/${album.id}`)}
                src={album.images[0].url}
                alt={album.name}
                className="albums_vertical_list_container__image"
              />
            )
      )}
    </div>
  );
}
