import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAlbum } from "../../../interfaces/ISeveralAlbums";

export interface IAudioStateInitalState {
  volume: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  track_id: string;
  album_id: string;
  loop: boolean;
  shuffle: boolean;
  album: IAlbum;
}

const initialState: IAudioStateInitalState = {
  volume: 100,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  track_id: '',
  album_id: '',
  loop: false,
  shuffle: false,
  album: {} as IAlbum,
};

const audioStateSlice = createSlice({
  name: "audioState",
  initialState,
  reducers: {
    setAudioState: (state, action: PayloadAction<Partial<IAudioStateInitalState>>) => {
      return { ...state, ...action.payload };
    },
  }
});

const getAudioState = ({ audioState }: { audioState: IAudioStateInitalState }) => audioState;

export const audioStateSelector = {
  getAudioState
};

export const { actions, reducer } = audioStateSlice;
