import { takeLatest, put, call, fork } from "redux-saga/effects";
import { SAGAS_FLOW_NAMES } from "../sagas";
import { IGetToken } from "../../../interfaces/IAuth";
import { GetToken } from '../../../../models/services/auth/getClientToken'
import { authActions } from "./slice";

function* getToken(action: any) {
  const method = "[🔑] getToken";
  console.log(method);

  const url = `/token`;
  const baseUrl = `https://accounts.spotify.com/api`

  try {
    yield put(authActions.setIsLoading(true));

    const data: IGetToken = yield call(GetToken, url, baseUrl, action.payload);
    console.log(`${method} - getToken: ${JSON.stringify(data, null, 2)}`);

    yield put(authActions.setToken(data))
  } catch (error) {
    console.log(`${method} - error: ${error}`);
    console.log(`${method} - error: ${JSON.stringify(error, null, 2)}`);
  } finally {
    yield put(authActions.setIsLoading(false));
    console.log(`${method} - end`);
  }
}

function* watchGetToken() {
  yield takeLatest(SAGAS_FLOW_NAMES.GET_TOKEN, getToken)
}

export const authSagas = [
  fork(watchGetToken),
];