import { takeLatest, put, call, fork } from "redux-saga/effects";
import { SAGAS_FLOW_NAMES } from "../sagas";
import { GetSeveralAlbums } from '../../../../models/services/albums/getSeveralAlbums'
import { albumsActions } from "./slice";
import { IAlbum, ISeveralAlbums, IRequestAlbumById, IRequestSeveralAlbums } from "../../../interfaces/ISeveralAlbums";
import { GetAlbumById } from "../../../../models/services/albums/getAlbumById";
import { GetFeaturedAlbums } from "../../../../models/services/albums/getFeaturedAlbums";
import { IFeaturedAlbums, IRequestFeaturedAlbums } from "../../../interfaces/IFeaturedAlbums";

function* getSeveralAlbums(action: any) {
  const method = "[🎶] getSeveralAlbums";
  console.log(method);

  const { token, ids }: IRequestSeveralAlbums = action.payload

  const url = `/albums?ids=${ids}`;

  try {
    yield put(albumsActions.setIsLoading(true));

    const data: ISeveralAlbums = yield call(GetSeveralAlbums, url, token);
    console.log(`${method} - getSeveralAlbums: ${JSON.stringify(data, null, 2)}`);

    yield put(albumsActions.setSeveralAlbums(data))
  } catch (error) {
    console.log(`${method} - error: ${error}`);
    console.log(`${method} - error: ${JSON.stringify(error, null, 2)}`);
  } finally {
    yield put(albumsActions.setIsLoading(false));
    console.log(`${method} - end`);
  }
}

function* getAlbumById(action: any) {
  const method = "[🎵] getAlbumById";
  console.log(method);

  const { token, id }: IRequestAlbumById = action.payload

  const url = `/albums/${id}`;

  try {
    yield put(albumsActions.setIsLoading(true));

    const data: IAlbum = yield call(GetAlbumById, url, token);
    console.log(`${method} - getAlbumById: ${JSON.stringify(data, null, 2)}`);

    yield put(albumsActions.setAlbum(data))
  } catch (error) {
    console.log(`${method} - error: ${error}`);
    console.log(`${method} - error: ${JSON.stringify(error, null, 2)}`);
  } finally {
    yield put(albumsActions.setIsLoading(false));
    console.log(`${method} - end`);
  }
}

function* getFeaturedAlbums(action: any) {
  const method = "[🎶🌐] getFeaturedAlbums";
  console.log(method);

  const { token, offset, limit }: IRequestFeaturedAlbums = action.payload

  const url = `/browse/new-releases?limit=${limit ?? 20}&offset=${offset ?? 0}`;

  try {
    yield put(albumsActions.setIsLoading(true));

    const data: IFeaturedAlbums = yield call(GetFeaturedAlbums, url, token);
    console.log(`${method} - getFeaturedAlbums: ${JSON.stringify(data, null, 2)}`);

    yield put(albumsActions.setFeaturedAlbums(data))
  } catch (error) {
    console.log(`${method} - error: ${error}`);
    console.log(`${method} - error: ${JSON.stringify(error, null, 2)}`);
  } finally {
    yield put(albumsActions.setIsLoading(false));
    console.log(`${method} - end`);
  }
}

function* watchGetSeveralAlbums() {
  yield takeLatest(SAGAS_FLOW_NAMES.GET_SEVERAL_ALBUMS, getSeveralAlbums)
}

function* watchGetAlbumById() {
  yield takeLatest(SAGAS_FLOW_NAMES.GET_ALBUM_BY_ID, getAlbumById)
}

function* watchGetFeaturedAlbums() {
  yield takeLatest(SAGAS_FLOW_NAMES.GET_FEATURED_ALBUMS, getFeaturedAlbums)
}

export const albumsSagas = [
  fork(watchGetSeveralAlbums),
  fork(watchGetAlbumById),
  fork(watchGetFeaturedAlbums),
];