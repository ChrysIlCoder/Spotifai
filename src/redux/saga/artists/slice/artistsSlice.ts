import { createSlice } from "@reduxjs/toolkit";
import { IArtist } from "../../../../interfaces/IArtist";
import { SAGAS_FLOW_NAMES } from "../../sagas";
import { IRequestAlbumById } from "../../../../interfaces/ISeveralAlbums";

export interface IArtistsIntialState {
  isLoading: boolean;
  artist: IArtist;
}

const initialState: IArtistsIntialState = {
  isLoading: false,
  artist: {} as IArtist
};

const artistsSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {
    reset: (state) => {
      state.artist = {} as IArtist
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setArtist: (state, action) => {
      state.artist = action.payload
    },
  }
});

const getIsLoading = ({ artists }: { artists: IArtistsIntialState }) => artists.isLoading;

const getArtist = ({ artists }: { artists: IArtistsIntialState }) => artists.artist;

export const artistsSelector = {
  getIsLoading,
  getArtist,
};

export const { actions, reducer } = artistsSlice;

export const artistsSagaActions = {
  sagaGetArtistById: (body: IRequestAlbumById) => ({ type: SAGAS_FLOW_NAMES.GET_ARTIST_BY_ID, payload: body })
}