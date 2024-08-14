import React, { useEffect } from "react";
import Header from "../components/Header/Header";
import AlbumsGrid from "../components/HomePageComponents/AlbumsGrid/AlbumsGrid";
import AlbumHorizontalList from "../components/HomePageComponents/AlbumHorizontalList/AlbumHorizontalList";
import GreetingText from "../components/HomePageComponents/GreetingText/GreetingText";
import HomePageLayout from "../components/Layouts/HomePageLayout/HomePageLayout";
import Section from "../components/Section/Section";
import { useSelector, useDispatch } from "react-redux";
import { authSelector } from "../redux/saga/auth/slice/authSlice";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import {
  albumsSagaActions,
  albumsSelector
} from "../redux/saga/albums/slice/albumsSlice";
import {
  IFeaturedAlbumItem,
} from "../interfaces/IFeaturedAlbums";
import { getUtils } from "../utils/utils";

export default function HomePage() {
  const {getChunksFromAlbumsList, getAlbumSectionRandomName} = getUtils()
  const auth = useSelector(authSelector.getToken);
  const featured_albums = useSelector(albumsSelector.getFeaturedAlbums);
  const loading = useSelector(albumsSelector.getIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      albumsSagaActions.sagaGetFeaturedAlbums({
        token: auth.access_token,
        limit: 50
      })
    );
  }, []);

  const albumsChunks = featured_albums.albums
    ? getChunksFromAlbumsList(featured_albums.albums.items, 8)
    : [];

  return !loading ? (
    <HomePageLayout>
      <Header />
      <Section>
        <GreetingText />
        <AlbumsGrid />
      </Section>
      {albumsChunks
        .filter((chunk: IFeaturedAlbumItem[]) => chunk.length >= 8)
        .map((chunk: IFeaturedAlbumItem[], index) => (
          <Section key={index} title={getAlbumSectionRandomName()}>
            <AlbumHorizontalList chunk={chunk} />
          </Section>
        ))}
    </HomePageLayout>
  ) : (
    <LoadingScreen />
  );
}
