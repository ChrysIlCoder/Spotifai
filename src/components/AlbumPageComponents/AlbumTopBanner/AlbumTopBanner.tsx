import React, { useEffect, useState } from "react";
import "./AlbumTopBanner.scss";
import { useSelector } from "react-redux";
import { albumsSelector } from "../../../redux/saga/albums/slice/albumsSlice";
import { useColor } from "color-thief-react";
import { getUtils } from "../../../utils/utils";

export default function AlbumTopBanner() {
  const {calculateTotalDuration} = getUtils()
  const album = useSelector(albumsSelector.getAlbum);
  const [totalDuration, setTotalDuration] = useState({ hours: 0, minutes: 0 });
  const { data } = useColor(album?.images?.[0]?.url, 'rgbArray', { crossOrigin: 'anonymous' })

  useEffect(() => {
    if (album?.tracks?.items) {
      const duration = calculateTotalDuration(album.tracks.items);
      setTotalDuration(duration);
    }
  }, [album]);

  console.log(data)

  return (
    <div className="album_top_banner_container">
      <img
        className="album_top_banner_container__cover"
        src={album?.images?.[0]?.url}
        alt="album cover"
        onClick={() => window.open(album?.external_urls?.spotify)}
        style={{ boxShadow: `0 8px 8px 0 rgba(${data?.[0]}, ${data?.[1]}, ${data?.[2]}, 0.25)` }}
      />
      <div className="album_top_banner_container__info">
        <h1
          className="album_top_banner_container__info__title"
          onClick={() => window.open(album?.external_urls?.spotify)}
        >
          {album?.name}
        </h1>
        <div className="album_top_banner_container__info__album_info">
          <div className="album_top_banner_container__info__album_info__artists">
            {album?.artists?.map((artist, index) => (
              <span
                className="album_top_banner_container__info__album_info__artists__artist"
                onClick={() => window.open(artist.external_urls.spotify)}
                key={artist.id}
              >
                {artist.name}
                {index < album.artists.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
          <span className="album_top_banner_container__info__album_info__time">
            {album?.total_tracks} songs,{" "}
            {`${totalDuration.hours} hr ${totalDuration.minutes} min`}
          </span>
        </div>
      </div>
    </div>
  );
}
