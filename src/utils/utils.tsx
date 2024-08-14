import { useDispatch, useSelector } from "react-redux";
import { IAlbum } from "../interfaces/ISeveralAlbums";
import { ITrack } from "../interfaces/ITrack";
import { audioStateActions } from "../redux/features/audioState";
import { showListeningToSidebarActions } from "../redux/features/showListeningSidebar";
import { tracksSagaActions } from "../redux/saga/tracks/slice/tracksSlice";
import { authSelector } from "../redux/saga/auth/slice/authSlice";

interface IPlayTrack {
  track?: ITrack;
  album?: IAlbum;
  track_id?: string;
}

export const getUtils = () => {
  const auth = useSelector(authSelector.getToken);
  const dispatch = useDispatch();

  const randomNames = [
    "Summer Vibes",
    "Chill Hits",
    "Top Albums",
    "Party Time",
    "Relax & Unwind",
    "Road Trip",
    "Workout Beats",
    "Night Grooves"
  ];

  const playTrack = ({ track, album, track_id }: IPlayTrack) => {
    if (track?.id === track_id) {
      dispatch(
        audioStateActions.setAudioState({
          isPlaying: true,
          track_id,
          album_id: album?.id
        })
      );
    } else {
      dispatch(
        tracksSagaActions.sagaGetTrackById({
          token: auth.access_token,
          id: track_id ?? ""
        })
      );
      dispatch(showListeningToSidebarActions.setListeningSidebar(true));
      dispatch(
        audioStateActions.setAudioState({
          isPlaying: true,
          track_id,
          album_id: album?.id,
          album
        })
      );
    }
  };

  const pauseTrack = () => {
    dispatch(audioStateActions.setAudioState({ isPlaying: false }));
  };

  const getChunksFromAlbumsList = (array: any, chunkSize: any) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize) as never);
    }
    return chunks;
  };

  const usedNames = new Set<string>();
  const getAlbumSectionRandomName = (): string => {
    let name: string;
    do {
      name = randomNames[Math.floor(Math.random() * randomNames.length)];
    } while (usedNames.has(name) && usedNames.size < randomNames.length);

    usedNames.add(name);
    return name;
  };

  const shuffleArray = (array: any) => {
    // Create a copy of the array
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const calculateTotalDuration = (tracks) => {
    const totalDurationMs = tracks.reduce((sum, track) => {
      return sum + track.duration_ms;
    }, 0);

    const totalDurationMin = Math.floor(totalDurationMs / 60000);
    const totalDurationHr = Math.floor(totalDurationMin / 60);
    const remainingMin = totalDurationMin % 60;

    return { hours: totalDurationHr, minutes: remainingMin };
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const calculateGradient = (min: number, max: number, isHovered: boolean) => {
    const percentage = (min / max) * 100;
    return `linear-gradient(to right, ${isHovered ? "#1cb65e" : "white"} ${percentage}%, rgba(255, 255, 255, 0.5) ${percentage}%)`;
  };

  return {
    playTrack,
    pauseTrack,
    getChunksFromAlbumsList,
    getAlbumSectionRandomName,
    shuffleArray,
    calculateTotalDuration,
    formatTime,
    calculateGradient
  };
};
