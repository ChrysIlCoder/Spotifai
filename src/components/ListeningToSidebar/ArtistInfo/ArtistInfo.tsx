import { useDispatch, useSelector } from "react-redux";
import "./ArtistInfo.scss";
import React, { useEffect } from "react";
import { tracksSelector } from "../../../redux/saga/tracks/slice/tracksSlice";
import { artistsSagaActions, artistsSelector } from "../../../redux/saga/artists/slice/artistsSlice";
import { authSelector } from "../../../redux/saga/auth/slice/authSlice";

export default function ArtistInfo() {
  const track = useSelector(tracksSelector.getTrack)

  const auth = useSelector(authSelector.getToken)
  const artist = useSelector(artistsSelector.getArtist)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(artistsSagaActions.sagaGetArtistById({ token: auth.access_token, id: track.artists[0].id }))
  }, [track.artists[0]])

  return (
    <div className="artist_info_container">
      <img
        className="artist_info_container__pic"
        src={artist?.images?.[0]?.url}
        alt="artist pfp"
      />
      <div className="artist_info_container__info">
        <span className="artist_info_container__info__name">{track.artists[0].name}</span>
        <span className="artist_info_container__info__listeners">{artist?.followers?.total?.toLocaleString()} monthly listener</span>
        <p className="artist_info_container__info__desc" onClick={() => window.open(artist?.external_urls?.spotify)}>Go to artist spotify</p>
      </div>
    </div>
  );
}
