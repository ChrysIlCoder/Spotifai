import './GenreCard.scss'
import React from 'react';
import { ISeveralCategoriesItem } from '../../../../interfaces/ISeveralCategories';

export default function GenreCard({ ...props }: ISeveralCategoriesItem) {
  return (
    <div style={{ background: props.background }} className='genre_card_container' onClick={() => window.open(`https://open.spotify.com/genre/${props.id}`, '_blank')}>
      <span>{props.name}</span>
      <img className='genre_card_container__image' src={props.icons[0].url} alt="" />
    </div>
  )
}
