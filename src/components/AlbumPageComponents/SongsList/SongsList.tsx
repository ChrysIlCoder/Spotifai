import List from './List/List'
import React from 'react'
import './SongsList.scss'
import Toolbar from './Toolbar/Toolbar'

export default function SongsList() {
  return (
    <div className='songs_list_container'>
      <Toolbar />
      <List />
    </div>
  )
}
