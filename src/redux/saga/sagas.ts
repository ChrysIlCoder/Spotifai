import { all } from "redux-saga/effects";
import { authSagas } from "./auth/saga";
import { albumsSagas } from "./albums/saga";
import { searchSagas } from "./search/saga";
import { categoriesSagas } from "./categories/saga";
import { tracksSagas } from "./tracks/saga";
import { artistsSagas } from "./artists/saga";

export const SAGAS_FLOW_NAMES = {
  GET_TOKEN: "GET_TOKEN",

  GET_SEVERAL_ALBUMS: "GET_SEVERAL_ALBUMS",
  GET_ALBUM_BY_ID: "GET_ALBUM_BY_ID",
  GET_FEATURED_ALBUMS: "GET_FEATURED_ALBUMS",

  GET_SEARCH_RESULTS: "GET_SEARCH_RESULTS",

  GET_SEVERAL_CATEGORIES: "GET_SEVERAL_CATEGORIES",

  GET_TRACK_BY_ID: "GET_TRACK_BY_ID",

  GET_ARTIST_BY_ID: "GET_ARTIST_BY_ID",
};

export default function* rootSaga() {
  yield all([
    ...authSagas,
    ...albumsSagas,
    ...searchSagas,
    ...categoriesSagas,
    ...tracksSagas,
    ...artistsSagas,
  ]);
}
