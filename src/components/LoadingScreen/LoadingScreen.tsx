import React from 'react'
import './LoadingScreen.scss'

interface ILoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({ message }: ILoadingScreenProps) {
  return (
    <div className='loading_screen_container'>
      <span className='loading_screen_container__message'>{message}</span>
    </div>
  )
}
