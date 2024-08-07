import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './NextSong.scss'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

export default function NextSong() {
  return (
    <div className='next_song_container'>
      <div className='next_song_container__header'>
        <span className='next_song_container__header__next'>Next in queue</span>
      </div>
      <div className='next_song_container__next_song'>
        <button  className='next_song_container__next_song__play'><FontAwesomeIcon icon={faPlay} /></button>
        <div className='next_song_container__next_song__song_info'>
          <img className='next_song_container__next_song__song_info__cover' src="https://images.genius.com/83544f1443e0a3b9e194a5da0e07abce.500x500x1.jpg" alt="song cover" />
          <div className='next_song_container__next_song__song_info__info'>
            <span className='next_song_container__next_song__song_info__info__title'>paranoia</span>
            <span className='next_song_container__next_song__song_info__info__artist'>KENTESHI</span>
          </div>
        </div>
      </div>
    </div>
  )
}
