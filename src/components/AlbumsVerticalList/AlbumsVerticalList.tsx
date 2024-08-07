import { useNavigate } from 'react-router-dom'
import './AlbumsVerticalList.scss'
import React from 'react';
import { IFeaturedAlbumsList } from '../../interfaces/IFeaturedAlbums';

export default function AlbumsVerticalList({ ...props }: IFeaturedAlbumsList) {
  const navigate = useNavigate()

  const handleClick = (id: string) => {
    navigate(`/album/${id}`)
  }
  
  return (
    <div className='albums_vertical_list_container'>
      {props?.albums?.items?.slice(0, 20)?.map(album => <span key={album.id} onClick={() => handleClick(album.id)} className='albums_vertical_list_container__album'>{album.name}</span>)}
    </div>
  )
}
