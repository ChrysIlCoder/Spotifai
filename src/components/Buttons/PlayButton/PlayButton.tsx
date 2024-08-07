import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './PlayButton.scss'
import React from 'react';
import { useSelector } from 'react-redux';
import { audioStateSelector } from '../../../redux/features/audioState/audioStateSlice';
import { albumsSelector } from '../../../redux/saga/albums/slice/albumsSlice';

interface IPlayButton {
  onClick: () => void;
  album_id: string;
  className?: string;
}

export default function PlayButton({ ...props }: IPlayButton) {
  const audioState = useSelector(audioStateSelector.getAudioState)
  const album = useSelector(albumsSelector.getAlbum)

  const playIcon = audioState.isPlaying && album?.id === props.album_id && album?.tracks?.items?.find(track => track?.id === audioState.track_id) ? faPause : faPlay

  return (
    <button onClick={props.onClick} className={`play_button_container ${props.className}`}><FontAwesomeIcon size='xl' icon={playIcon} /></button>
  )
}
