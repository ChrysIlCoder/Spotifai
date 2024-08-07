import { createSlice } from "@reduxjs/toolkit";

export interface IShowListeningToSidebarInitalState {
  sidebar_opened: boolean;
}

const initialState: IShowListeningToSidebarInitalState = {
  sidebar_opened: false,
};

const showListeningToSidebarSlice = createSlice({
  name: "showListeningToSidebar",
  initialState,
  reducers: {
    setListeningSidebar: (state, actions) => {
      state.sidebar_opened = actions.payload;
    }
  }
});

const getSidebarState = ({ showListeningToSidebar }: { showListeningToSidebar: IShowListeningToSidebarInitalState }) =>
  showListeningToSidebar.sidebar_opened;

export const showListeningToSidebarSelector = {
  getSidebarState
};

export const { actions, reducer } = showListeningToSidebarSlice;
