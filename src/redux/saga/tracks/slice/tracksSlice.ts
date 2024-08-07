import { createSlice } from "@reduxjs/toolkit";
import { IRequestTrackById, ITrack } from "../../../../interfaces/ITrack";
import { SAGAS_FLOW_NAMES } from "../../sagas";

export interface ITracksInitalState {
  isLoading: boolean;
  track: ITrack;
}

const initialState: ITracksInitalState = {
  isLoading: false,
  track: {} as ITrack
};

const tracksSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {
    reset: (state) => {
      state.track = {} as ITrack
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setTrack: (state, action) => {
      state.track = action.payload
    },
  }
});

const getIsLoading = ({ tracks }: { tracks: ITracksInitalState }) => tracks.isLoading;

const getTrack = ({ tracks }: { tracks: ITracksInitalState }) => tracks.track;

export const tracksSelector = {
  getIsLoading,
  getTrack,
};

export const { actions, reducer } = tracksSlice;

export const tracksSagaActions = {
  sagaGetTrackById: (body: IRequestTrackById) => ({ type: SAGAS_FLOW_NAMES.GET_TRACK_BY_ID, payload: body })
}