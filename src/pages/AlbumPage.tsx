import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AlbumPageLayout from '../components/Layouts/AlbumPageLayout/AlbumPageLayout'
import Header from '../components/Header/Header'
import AlbumTopBanner from '../components/AlbumPageComponents/AlbumTopBanner/AlbumTopBanner'
import SongsList from '../components/AlbumPageComponents/SongsList/SongsList'
import { useDispatch, useSelector } from 'react-redux'
import { albumsSagaActions, albumsSelector } from '../redux/saga/albums/slice/albumsSlice'
import { authSelector } from '../redux/saga/auth/slice/authSlice'
import LoadingScreen from '../components/LoadingScreen/LoadingScreen'

export default function AlbumPage() {
  const auth = useSelector(authSelector.getToken)
  const loading = useSelector(albumsSelector.getIsLoading)
  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(albumsSagaActions.sagaGetAlbumById({ token: auth.access_token, id: id }))
  }, [id])

  return !loading ? (
    <AlbumPageLayout>
      <Header />
      <AlbumTopBanner />
      <SongsList />
    </AlbumPageLayout>
  ) : <LoadingScreen />
}
