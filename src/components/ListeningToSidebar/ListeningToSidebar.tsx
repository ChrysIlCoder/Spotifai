import "./ListeningToSidebar.scss";
import SongInfo from "./SongInfo/SongInfo";
import ArtistInfo from "./ArtistInfo/ArtistInfo";
import NextSong from "./NextSong/NextSong";
import PlaylistHeader from "./PlaylistHeader/PlaylistHeader";
import React from "react";
import { useSelector } from "react-redux";
import { tracksSelector } from "../../redux/saga/tracks/slice/tracksSlice";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

export default function ListeningToSidebar() {
  const track = useSelector(tracksSelector.getTrack);
  const loading = useSelector(tracksSelector.getIsLoading);

  return !loading ? (
    <div className="right_sidebar_container">
      {track.name ? (
        <>
          <PlaylistHeader />
          <SongInfo />
          <ArtistInfo />
          <NextSong />
        </>
      ) : (
        <PlaylistHeader noTrack />
      )}
    </div>
  ) : (
    <LoadingScreen />
  );
}
