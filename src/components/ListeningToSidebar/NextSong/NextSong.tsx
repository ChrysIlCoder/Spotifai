import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './NextSong.scss'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { useSelector } from 'react-redux'
import { audioStateSelector } from '../../../redux/features/audioState/audioStateSlice'
import { getUtils } from '../../../utils/utils'

export default function NextSong() {
  const {playTrack} = getUtils()
  const audioState = useSelector(audioStateSelector.getAudioState)

  const currentIndex = audioState.album?.tracks?.items.findIndex(track => track.id === audioState.track_id);
  const nextTrack = currentIndex !== -1 && currentIndex < audioState.album.tracks.items.length - 1
      ? audioState.album.tracks.items[currentIndex + 1]
      : audioState.album.tracks.items[0];

  return (
    <div className='next_song_container'>
      <div className='next_song_container__header'>
        <span className='next_song_container__header__next'>Next in queue</span>
      </div>
      <div className='next_song_container__next_song'>
        <button  className='next_song_container__next_song__play' onClick={() => playTrack({
          album: audioState.album,
          track_id: nextTrack?.id
        })}><FontAwesomeIcon icon={faPlay} /></button>
        <div className='next_song_container__next_song__song_info'>
          <img className='next_song_container__next_song__song_info__cover' src={audioState.album?.images?.[0]?.url} alt="song cover" />
          <div className='next_song_container__next_song__song_info__info'>
            <span className='next_song_container__next_song__song_info__info__title'>{nextTrack?.name}</span>
            <span className='next_song_container__next_song__song_info__info__artist'>{nextTrack?.artists?.map(artist => artist.name).join(', ')}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
