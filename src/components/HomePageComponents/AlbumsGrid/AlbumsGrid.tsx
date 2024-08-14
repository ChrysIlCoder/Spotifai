import AlbumHorizontalCard from "../../AlbumHorizontalCard/AlbumHorizontalCard";
import React, { useEffect, useState } from "react";
import "./AlbumsGrid.scss";
import { useSelector } from "react-redux";
import { albumsSelector } from "../../../redux/saga/albums/slice/albumsSlice";
import { IFeaturedAlbumItem } from "../../../interfaces/IFeaturedAlbums";
import { getUtils } from "../../../utils/utils";

export default function AlbumsGrid() {
  const {shuffleArray} = getUtils()
  const [shuffledAlbums, setShuffledAlbums] = useState<IFeaturedAlbumItem[]>([])
  const featured_albums = useSelector(albumsSelector.getFeaturedAlbums);

  const albums = featured_albums?.albums?.items || [];
  
  useEffect(() => {
    setShuffledAlbums(shuffleArray(albums).slice(0, 6))
  }, [])
  
  return (
    <div className="album_grid_container">
      {shuffledAlbums?.map((album: IFeaturedAlbumItem) => (
        <AlbumHorizontalCard key={album.id} {...album} />
      ))}
    </div>
  );
}
