import { createSlice } from "@reduxjs/toolkit";

export interface IChangeAlbumOrderInitalState {
  order: 'custom_order' | 'title' | 'artist' | 'album' | 'duration';
}

const initialState: IChangeAlbumOrderInitalState = {
  order: 'custom_order',
};

const changeAlbumOrderSlice = createSlice({
  name: "changeAlbumOrder",
  initialState,
  reducers: {
    setAlbumOrder: (state, actions) => {
      state.order = actions.payload;
    }
  }
});

const getAlbumOrder = ({ changeAlbumOrder }: { changeAlbumOrder: IChangeAlbumOrderInitalState }) =>
  changeAlbumOrder.order;

export const changeAlbumOrderSelector = {
  getAlbumOrder
};

export const { actions, reducer } = changeAlbumOrderSlice;
