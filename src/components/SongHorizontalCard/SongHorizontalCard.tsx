import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SongHorizontalCard.scss";
import { faGripVertical, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
//@ts-ignore
import bars_gif from "../../assets/gifs/playing_bars.gif";
import { CSSProperties, useEffect, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import { ITrackItem } from "../../interfaces/ISeveralAlbums";
import { useDispatch, useSelector } from "react-redux";
import { albumsSelector } from "../../redux/saga/albums/slice/albumsSlice";
import { tracksSagaActions, tracksSelector } from "../../redux/saga/tracks/slice/tracksSlice";
import { authSelector } from "../../redux/saga/auth/slice/authSlice";
import { showListeningToSidebarActions } from "../../redux/features/showListeningSidebar";
import { audioStateActions } from "../../redux/features/audioState";
import { audioStateSelector } from "../../redux/features/audioState/audioStateSlice";

export default function SongHorizontalCard({ ...props }: ITrackItem) {
  const [hover, setHover] = useState(false);
  const album = useSelector(albumsSelector.getAlbum)
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });

  const auth = useSelector(authSelector.getToken)
  const track = useSelector(tracksSelector.getTrack)
  const audioState = useSelector(audioStateSelector.getAudioState)
  const dispatch = useDispatch()

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handlePlayClick = () => {
    if (track?.id === props.id) {
      dispatch(audioStateActions.setAudioState({ isPlaying: true, track_id: props.id , album_id: album?.id }))
    } else {
      dispatch(tracksSagaActions.sagaGetTrackById({ token: auth.access_token, id: props.id }))
      dispatch(showListeningToSidebarActions.setListeningSidebar(true))
      dispatch(audioStateActions.setAudioState({ isPlaying: true, track_id: props.id, album_id: album?.id }))
    }
  }

  const handlePauseClick = () => {
    dispatch(audioStateActions.setAudioState({ isPlaying: false }))
  }

  const song_playing = audioState.isPlaying && audioState.track_id === props.id

  return (
    <div
      className="song_horizontal_card_container"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <div className="song_horizontal_card_container__left">
        <div
          className="song_horizontal_card_container__left__sign"
        >
          {hover && song_playing && <FontAwesomeIcon onClick={handlePauseClick} icon={faPause} />}
          {!hover && !song_playing && <span>{props.index_number + 1}</span>}
          {hover && !song_playing &&  <FontAwesomeIcon onClick={handlePlayClick} icon={faPlay} />}
          {!hover && song_playing && <img src={bars_gif} alt="playing bars" />}
        </div>
        <div className="song_horizontal_card_container__left__song_info">
          <img
            className="song_horizontal_card_container__left__song_info__cover"
            src={album?.images?.[0]?.url}
            alt="track cover"
          />
          <div className="song_horizontal_card_container__left__song_info__info">
            <span
              className="song_horizontal_card_container__left__song_info__info__title"
              style={{ color: song_playing || audioState.track_id === props.id ? "#65D36E" : "white" }}
            >
              {props.name}
            </span>
            <span className="song_horizontal_card_container__left__song_info__info__artist">
              {props.artists.map(artist => artist.name).join(', ')}
            </span>
          </div>
        </div>
      </div>
      <div className="song_horizontal_card_container__center">
        <span className="song_horizontal_card_container__center__album_name">
          {album?.name}
        </span>
      </div>
      <div className="song_horizontal_card_container__right" {...listeners}>
        <span className="song_horizontal_card_container__right__duration">
          {(props.duration_ms / 60000).toFixed(2).replace('.', ':')}
        </span>
        <button
          style={{ opacity: hover ? 1 : 0 }}
          className="song_horizontal_card_container__right__drag_handle"
        >
          <FontAwesomeIcon size="lg" icon={faGripVertical} />
        </button>
      </div>
    </div>
  );
}
