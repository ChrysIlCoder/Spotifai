import { takeLatest, put, call, fork } from "redux-saga/effects";
import { SAGAS_FLOW_NAMES } from "../sagas";
import { GetSeveralCategories } from '../../../../models/services/categories/getSeveralCategories'
import { categoriesActions } from "./slice";
import { IRequestSeveralCategories, ISeveralCategories } from "../../../interfaces/ISeveralCategories";

function* getSeveralCategories(action: any) {
  const method = "[◻️◻️◻️] getSeveralCategories";
  console.log(method);

  const { token, limit, offset }: IRequestSeveralCategories = action.payload
  
  const url = `browse/categories?limit=${limit ?? 20}&offset=${offset ?? 0}`;

  try {
    yield put(categoriesActions.setIsLoading(true));

    const data: ISeveralCategories = yield call(GetSeveralCategories, url, token);
    console.log(`${method} - getSeveralCategories: ${JSON.stringify(data, null, 2)}`);

    yield put(categoriesActions.setSeveralCategories(data))
  } catch (error) {
    console.log(`${method} - error: ${error}`);
    console.log(`${method} - error: ${JSON.stringify(error, null, 2)}`);
  } finally {
    yield put(categoriesActions.setIsLoading(false));
    console.log(`${method} - end`);
  }
}

function* watchGetSeveralCategories() {
  yield takeLatest(SAGAS_FLOW_NAMES.GET_SEVERAL_CATEGORIES, getSeveralCategories)
}

export const categoriesSagas = [
  fork(watchGetSeveralCategories),
];