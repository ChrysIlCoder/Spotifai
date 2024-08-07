import { takeLatest, put, call, fork } from "redux-saga/effects";
import { SAGAS_FLOW_NAMES } from "../sagas";
import { tracksActions } from "./slice";
import { IRequestTrackById, ITrack } from "../../../interfaces/ITrack";
import { GetTrackById } from "../../../../models/services/tracks/getTrackById";

function* getTrackById(action: any) {
  const method = "[🎼] getTrackById";
  console.log(method);

  const { token, id, market }: IRequestTrackById = action.payload
  
  const url = `/tracks/${id}${market ? `?market=${market}` : ``}`;

  try {
    yield put(tracksActions.setIsLoading(true));

    const data: ITrack = yield call(GetTrackById, url, token);
    console.log(`${method} - getTrackById: ${JSON.stringify(data, null, 2)}`);

    yield put(tracksActions.setTrack(data))
  } catch (error) {
    console.log(`${method} - error: ${error}`);
    console.log(`${method} - error: ${JSON.stringify(error, null, 2)}`);
  } finally {
    yield put(tracksActions.setIsLoading(false));
    console.log(`${method} - end`);
  }
}

function* watchGetTrackById() {
  yield takeLatest(SAGAS_FLOW_NAMES.GET_TRACK_BY_ID, getTrackById)
}

export const tracksSagas = [
  fork(watchGetTrackById),
];