import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PlayButton from "../../../Buttons/PlayButton/PlayButton";
import "./Toolbar.scss";
import {
  faClose,
  faHeart as faHeartFilled,
  faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons/faHeart";
import { useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { changeAlbumOrderActions } from "../../../../redux/features/changeAlbumOrder";
import { useSearchParams } from "react-router-dom";
import React from "react";
import { audioStateActions } from "../../../../redux/features/audioState";
import { showListeningToSidebarActions } from "../../../../redux/features/showListeningSidebar";
import { tracksSagaActions, tracksSelector } from "../../../../redux/saga/tracks/slice/tracksSlice";
import { audioStateSelector } from "../../../../redux/features/audioState/audioStateSlice";
import { authSelector } from "../../../../redux/saga/auth/slice/authSlice";
import { albumsSelector } from "../../../../redux/saga/albums/slice/albumsSlice";

export default function Toolbar() {
  const [favorite, setFavorite] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams({ search: '' })
  
  const options = [
    { value: "custom_order", label: "Custom order" },
    { value: "title", label: "Title" },
    { value: "artist", label: "Artist" },
    { value: "album", label: "Album" },
    { value: "duration", label: "Duration" }
  ];

  const auth = useSelector(authSelector.getToken)
  const album = useSelector(albumsSelector.getAlbum)
  const track = useSelector(tracksSelector.getTrack)
  const audioState = useSelector(audioStateSelector.getAudioState)
  const dispatch = useDispatch()

  const handlePlayClick = () => {
    if (album?.tracks?.items?.find(album_track => album_track.id === track?.id)) {
      dispatch(audioStateActions.setAudioState({ isPlaying: true, track_id: track?.id , album_id: album?.id }))
    } else {
      dispatch(tracksSagaActions.sagaGetTrackById({ token: auth.access_token, id: album?.tracks?.items?.[0]?.id }))
      dispatch(showListeningToSidebarActions.setListeningSidebar(true))
      dispatch(audioStateActions.setAudioState({ isPlaying: true, track_id: album?.tracks?.items?.[0]?.id, album_id: album?.id, album: album }))
    }
  }

  const handlePauseClick = () => {
    dispatch(audioStateActions.setAudioState({ isPlaying: false }))
  }

  return (
    <div className="toolbar_container">
      <div className="toolbar_container__left_side">
        <PlayButton
          className="toolbar_container__left_side__play"
          album_id={album?.id}
          onClick={audioState.isPlaying && album?.tracks?.items?.find(track => track?.id === audioState.track_id) ? handlePauseClick : handlePlayClick}
        />
        <button
          className="toolbar_container__left_side__favorite"
          onClick={() => setFavorite((prev) => !prev)}
        >
          <FontAwesomeIcon
            size="2xl"
            color={favorite ? "#65D36E" : "white"}
            icon={favorite ? faHeartFilled : faHeart}
          />
        </button>
      </div>
      <div className="toolbar_container__right_side">
        {search ? (
          <div
            className="toolbar_container__right_side__search_input"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input
              className="toolbar_container__right_side__search_input__input"
              type="search"
              placeholder="Search playlist"
              onChange={(e) => setSearchParams({ search: e.target.value}, {replace: true})}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setSearch(false)
                }
              }}
            />
            <FontAwesomeIcon className="toolbar_container__right_side__search_input__close" onClick={() => {setSearch(false); setSearchParams({ search: '' })}} icon={faClose} />
          </div>
        ) : (
          <button
            onClick={() => setSearch(true)}
            className="toolbar_container__right_side__search_btn"
          >
            <FontAwesomeIcon size="lg" icon={faMagnifyingGlass} />
          </button>
        )}
        <Select
          options={options}
          className="toolbar_container__right_side__select"
          classNamePrefix="toolbar_container__right_side__select"
          placeholder={options[0].label}
          onChange={(option) => dispatch(changeAlbumOrderActions.setAlbumOrder(option?.value))}
          unstyled
          isSearchable={false}
        />
      </div>
    </div>
  );
}
