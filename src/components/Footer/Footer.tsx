import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Footer.scss";
import {
  faArrowsRotate,
  faBackwardStep,
  faForwardStep,
  faHeadphones,
  faPause,
  faPlay,
  faShuffle,
  faVolumeHigh,
  faVolumeLow,
  faVolumeOff,
  faVolumeXmark
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showListeningToSidebarSelector } from "../../redux/features/showListeningSidebar/showListeningSidebarSlice";
import { showListeningToSidebarActions } from "../../redux/features/showListeningSidebar";
import { faPlayCircle } from "@fortawesome/free-regular-svg-icons";
import { tracksSelector } from "../../redux/saga/tracks/slice/tracksSlice";
import { audioStateSelector } from "../../redux/features/audioState/audioStateSlice";
import { audioStateActions } from "../../redux/features/audioState";
import { albumsSelector } from "../../redux/saga/albums/slice/albumsSlice";
import { getUtils } from "../../utils/utils";

export default function Footer() {
  const show_sidebar = useSelector(
    showListeningToSidebarSelector.getSidebarState
  );
  const audioState = useSelector(audioStateSelector.getAudioState);
  const track = useSelector(tracksSelector.getTrack);
  const album = useSelector(albumsSelector.getAlbum)
  const dispatch = useDispatch();

  const {playTrack, pauseTrack, calculateGradient, formatTime} = getUtils()

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [hoveredSlider, setHoveredSlider] = useState<"song" | "volume" | null>(null);

  useEffect(() => {
    const updateCurrentTime = () => {
      if (audioRef.current) {
        dispatch(
          audioStateActions.setAudioState({
            currentTime: audioRef.current.currentTime
          })
        );
      }
    };

    const setAudioDuration = () => {
      if (audioRef.current) {
        dispatch(
          audioStateActions.setAudioState({
            duration: audioRef.current.duration
          })
        );
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", updateCurrentTime);
      audioRef.current.addEventListener("loadedmetadata", setAudioDuration);
      audioRef.current.volume = audioState.volume / 100;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateCurrentTime);
        audioRef.current.removeEventListener(
          "loadedmetadata",
          setAudioDuration
        );
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioState.isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [audioState.isPlaying, audioState.track_id, track?.id]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = ''
    }
  }, [audioState.track_id])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = audioState.volume / 100;
    }
  }, [audioState.volume]);

  useEffect(() => {
    const handleEnded = () => {
      if (audioRef.current) {
        if (audioState.loop) {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
        } else if (audioState.shuffle) {
          const random_index = Math.floor(Math.random() * audioState.album?.tracks?.items?.length)
          
          dispatch(showListeningToSidebarActions.setListeningSidebar(true))
          playTrack({
            track_id: audioState.album?.tracks?.items?.[random_index]?.id, 
            album: album,
          })
        } else {
          const index = audioState.album?.tracks?.items?.findIndex(album_track => album_track.id === track?.id)

          if (index !== audioState.album?.tracks?.items?.length - 1) {
            dispatch(showListeningToSidebarActions.setListeningSidebar(true))
            playTrack({
              track_id: audioState.album?.tracks?.items?.[index + 1]?.id, 
              album: album,
            })
          } else {
            audioRef.current.currentTime = 0
            pauseTrack()
            audioRef.current.pause()
          }
        }
      }
    };
  
    if (audioRef.current) {
      audioRef.current.addEventListener('ended', handleEnded);
    }
  
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleEnded);
      }
    };
  }, [audioRef.current, audioState.loop, audioState.shuffle, track]);

  const handleBackClick = () => {
    const index = audioState.album?.tracks?.items?.findIndex(album_track => album_track.id === track?.id)

    if (index > 0) {
      dispatch(showListeningToSidebarActions.setListeningSidebar(true))
      playTrack({
        track_id: audioState.album?.tracks?.items?.[index - 1]?.id, 
        album: album
      })
    }
  }

  const handleForwardClick = () => {
    const index = audioState.album?.tracks?.items?.findIndex(album_track => album_track.id === track?.id)
    
    if (index !== album?.tracks?.items?.length - 1) {
      dispatch(showListeningToSidebarActions.setListeningSidebar(true))
      playTrack({
        track_id: audioState.album?.tracks?.items?.[index + 1]?.id, 
        album: album
      })
    }
  }

  return (
    <div className="footer_container">
      <div className="footer_container__left_side">
        <img
          className="footer_container__left_side__cover"
          src={
            track?.album?.images?.[0]?.url ??
            "https://www.publicdomainpictures.net/pictures/240000/velka/slate-grey-color.jpg"
          }
          alt="album cover"
          onClick={() => window.open(track?.external_urls?.spotify)}
        />
        <div className="footer_container__left_side__song_info">
          <span
            className="footer_container__left_side__song_info__title"
            onClick={() => window.open(track?.external_urls?.spotify)}
          >
            {track?.name ?? "No track"}
          </span>
          <div className="footer_container__left_side__song_info__artists">
            {track?.artists
              ?.map((artist, index) => (
                <span
                  className="footer_container__left_side__song_info__artists__artist"
                  onClick={() => window.open(artist.external_urls.spotify)}
                >
                  {artist.name}
                  {index < track.artists.length - 1 ? ', ' : ''}
                </span>
              )) ?? "No artists"}
          </div>
        </div>
      </div>
      {track?.preview_url ? (
        <div className="footer_container__center_console">
          <div className="footer_container__center_console__top">
            <button className="footer_container__center_console__top__shuffle" onClick={() => dispatch(audioStateActions.setAudioState({ shuffle: !audioState.shuffle }))}>
              <FontAwesomeIcon color={audioState.shuffle ? "#63CF6C" : "white"} size="xl" icon={faShuffle} />
            </button>
            <button className="footer_container__center_console__top__back" onClick={handleBackClick}>
              <FontAwesomeIcon size="xl" icon={faBackwardStep} />
            </button>
            <button
              className="footer_container__center_console__top__play"
              onClick={() =>
                dispatch(
                  audioStateActions.setAudioState({
                    isPlaying: !audioState.isPlaying
                  })
                )
              }
            >
              <FontAwesomeIcon
                size="lg"
                icon={audioState.isPlaying ? faPause : faPlay}
              />
            </button>
            <button className="footer_container__center_console__top__forward" onClick={handleForwardClick}>
              <FontAwesomeIcon size="xl" icon={faForwardStep} />
            </button>
            <button className="footer_container__center_console__top__loop" onClick={() => dispatch(audioStateActions.setAudioState({ loop: !audioState.loop }))}>
              <FontAwesomeIcon color={audioState.loop ? "#63CF6C" : "white"} size="xl" icon={faArrowsRotate} />
            </button>
          </div>
          <div className="footer_container__center_console__bottom">
            <span className="footer_container__center_console__bottom__current_time">
              {formatTime(audioState.currentTime)}
            </span>
            <input
              className="footer_container__center_console__bottom__song_slider"
              type="range"
              min="0"
              max={audioState.duration}
              value={audioState.currentTime}
              onChange={(e) => {
                if (audioRef.current) {
                  audioRef.current.currentTime = Number(e.target.value);
                  dispatch(
                    audioStateActions.setAudioState({
                      currentTime: audioRef.current!.currentTime
                    })
                  );
                }
              }}
              onMouseEnter={() => setHoveredSlider("song")}
              onMouseLeave={() => setHoveredSlider(null)}
              style={{
                background: calculateGradient(audioState.currentTime, audioState.duration, hoveredSlider === "song")
              }}
            />
            <span className="footer_container__center_console__bottom__total_time">
              {formatTime(audioState.duration)}
            </span>
          </div>
        </div>
      ) : (
        <span
          className="footer_container__notrack"
          onClick={() =>
            track?.preview_url === null
              ? window.open(track?.external_urls?.spotify)
              : {}
          }
        >
          {track?.preview_url === null
            ? "No preview provided by API. Press to play on spotify"
            : "No track playing"}
        </span>
      )}
      <div className="footer_container__right_side">
        <div className="footer_container__right_side__icons">
          <FontAwesomeIcon
            className="footer_container__right_side__icons__icon"
            icon={faPlayCircle}
            color={show_sidebar ? "#63CF6C" : "white"}
            onClick={() =>
              dispatch(
                showListeningToSidebarActions.setListeningSidebar(!show_sidebar)
              )
            }
          />
          <FontAwesomeIcon
            className="footer_container__right_side__icons__icon"
            icon={
              audioState.volume === 0
                ? faVolumeXmark
                : audioState.volume < 33
                ? faVolumeOff
                : audioState.volume <= 66
                ? faVolumeLow
                : faVolumeHigh
            }
            onClick={() =>
              dispatch(
                audioStateActions.setAudioState({
                  volume: audioState.volume === 0 ? 100 : 0
                })
              )
            }
          />
        </div>
        <input
          className="footer_container__right_side__slider"
          type="range"
          value={audioState.volume}
          onChange={(e) =>
            dispatch(
              audioStateActions.setAudioState({
                volume: Number(e.target.value)
              })
            )
          }
          onMouseEnter={() => setHoveredSlider("volume")}
          onMouseLeave={() => setHoveredSlider(null)}
          style={{
            background: calculateGradient(audioState.volume, 100, hoveredSlider === "volume")
          }}
        />
      </div>
      <audio ref={audioRef} src={track?.preview_url}></audio>
    </div>
  );
}
