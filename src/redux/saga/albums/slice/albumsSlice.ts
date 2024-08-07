import { createSlice } from "@reduxjs/toolkit";
import { SAGAS_FLOW_NAMES } from "../../sagas";
import { IAlbum, ISeveralAlbums, IRequestAlbumById, IRequestSeveralAlbums } from "../../../../interfaces/ISeveralAlbums";
import { IFeaturedAlbumsList, IRequestFeaturedAlbums } from "../../../../interfaces/IFeaturedAlbums";

export interface IAlbumsInitalState {
  isLoading: boolean;
  album: IAlbum;
  several_albums: ISeveralAlbums;
  featured_albums: IFeaturedAlbumsList;
}

const initialState: IAlbumsInitalState = {
  isLoading: false,
  album: {} as IAlbum,
  several_albums: {} as ISeveralAlbums,
  featured_albums: {} as IFeaturedAlbumsList,
};

const albumsSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;

      state.several_albums = {} as ISeveralAlbums;
      state.album = {} as IAlbum;
      state.featured_albums = {} as IFeaturedAlbumsList;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setAlbum: (state, action) => {
      state.album = action.payload
    },
    setSeveralAlbums: (state, action) => {
      state.several_albums = action.payload
    },
    setFeaturedAlbums: (state, action) => {
      state.featured_albums = action.payload
    }
  }
});

const getIsLoading = ({ albums }: { albums: IAlbumsInitalState }) => albums.isLoading;

const getAlbum = ({ albums }: { albums: IAlbumsInitalState }) => albums.album;

const getSeveralAlbums = ({ albums }: { albums: IAlbumsInitalState }) => albums.several_albums;

const getFeaturedAlbums = ({ albums }: { albums: IAlbumsInitalState }) => albums.featured_albums;

export const albumsSelector = {
  getIsLoading,
  getAlbum,
  getSeveralAlbums,
  getFeaturedAlbums
};

export const { actions, reducer } = albumsSlice;

export const albumsSagaActions = {
  sagaGetSeveralAlbums: (body: IRequestSeveralAlbums) => ({ type: SAGAS_FLOW_NAMES.GET_SEVERAL_ALBUMS, payload: body }),
  sagaGetAlbumById: (body: IRequestAlbumById) => ({ type: SAGAS_FLOW_NAMES.GET_ALBUM_BY_ID, payload: body }),
  sagaGetFeaturedAlbums: (body: IRequestFeaturedAlbums) => ({ type: SAGAS_FLOW_NAMES.GET_FEATURED_ALBUMS, payload: body }),
};
