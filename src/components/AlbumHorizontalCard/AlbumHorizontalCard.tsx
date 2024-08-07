import './AlbumHorizontalCard.scss'
import PlayButton from '../Buttons/PlayButton/PlayButton';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { IFeaturedAlbumItem } from '../../interfaces/IFeaturedAlbums';
import { useSelector } from 'react-redux';
import { audioStateSelector } from '../../redux/features/audioState/audioStateSlice';

export default function AlbumHorizontalCard({ ...props }: IFeaturedAlbumItem) {
  const navigate = useNavigate()
  const audioState = useSelector(audioStateSelector.getAudioState)

  const handleClick = () => {
    navigate(`/album/${props.id}`)
  }

  return (
    <div className='album_horiziontal_card_container' onClick={handleClick}>
      <div className='album_horiziontal_card_container__info'>
        <img className='album_horiziontal_card_container__info__cover' src={props.images[0].url} alt="" />
        <span className='album_horiziontal_card_container__info__name' style={{ color: audioState.album_id === props.id ? '#65D36E' : 'white'}}>{props.name.length > 20 ? `${props.name.substring(0, 20)}...` : props.name}</span>
      </div>
      <PlayButton album_id={props.id} className='album_horiziontal_card_container__play' onClick={() => {}}/>
    </div>
  )
}
