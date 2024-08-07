import { combineReducers } from "@reduxjs/toolkit";
import { showListeningToSidebarReducer } from "./features/showListeningSidebar";
import { changeAlbumOrderReducer } from "./features/changeAlbumOrder";
import { authReducer } from "./saga/auth/slice";
import { albumsReducer } from "./saga/albums/slice";
import { searchReducer } from "./saga/search/slice";
import { categoriesReducer } from "./saga/categories/slice";
import { tracksReducer } from "./saga/tracks/slice";
import { artistsReducer } from "./saga/artists/slice";
import { audioStateReducer } from "./features/audioState";

export default combineReducers({
  showListeningToSidebar: showListeningToSidebarReducer,
  changeAlbumOrder: changeAlbumOrderReducer,
  audioState: audioStateReducer,
  
  auth: authReducer,
  albums: albumsReducer,
  search: searchReducer,
  categories: categoriesReducer,
  tracks: tracksReducer,
  artists: artistsReducer,
})