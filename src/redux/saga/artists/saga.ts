import { takeLatest, put, call, fork } from "redux-saga/effects";
import { SAGAS_FLOW_NAMES } from "../sagas";
import { artistActions } from "./slice";
import { IArtist, IRequestArtistById } from "../../../interfaces/IArtist";
import { GetArtistById } from "../../../../models/services/artists/getArtistById";

function* getArtistById(action: any) {
  const method = "[🙍🎤] getArtistById";
  console.log(method);

  const { token, id }: IRequestArtistById = action.payload
  
  const url = `/artists/${id}`;

  try {
    yield put(artistActions.setIsLoading(true));

    const data: IArtist = yield call(GetArtistById, url, token);
    console.log(`${method} - getArtistById: ${JSON.stringify(data, null, 2)}`);

    yield put(artistActions.setArtist(data))
  } catch (error) {
    console.log(`${method} - error: ${error}`);
    console.log(`${method} - error: ${JSON.stringify(error, null, 2)}`);
  } finally {
    yield put(artistActions.setIsLoading(false));
    console.log(`${method} - end`);
  }
}

function* watchGetArtstById() {
  yield takeLatest(SAGAS_FLOW_NAMES.GET_ARTIST_BY_ID, getArtistById)
}

export const artistsSagas = [
  fork(watchGetArtstById),
];