import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./PlaylistHeader.scss";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showListeningToSidebarActions } from "../../../redux/features/showListeningSidebar";
import React from "react";
import { tracksSelector } from "../../../redux/saga/tracks/slice/tracksSlice";

interface IPlaylistHeaderProps {
  noTrack?: boolean;
}

export default function PlaylistHeader({ noTrack }: IPlaylistHeaderProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const track = useSelector(tracksSelector.getTrack);

  return !noTrack ? (
    <div className="playlist_header_container">
      <span
        className="playlist_header_container__album_name"
        onClick={() => navigate(`/album/${track.album.id}`)}
      >
        {track.album.name}
      </span>
      <button
        className="playlist_header_container__close"
        onClick={() =>
          dispatch(showListeningToSidebarActions.setListeningSidebar(false))
        }
      >
        <FontAwesomeIcon size="lg" icon={faClose} />
      </button>
    </div>
  ) : (
    <div className="playlist_header_container">
      <span
        className="playlist_header_container__album_name"
      >
        No track playing
      </span>
      <button
        className="playlist_header_container__close"
        onClick={() =>
          dispatch(showListeningToSidebarActions.setListeningSidebar(false))
        }
      >
        <FontAwesomeIcon size="lg" icon={faClose} />
      </button>
    </div>
  );
}
