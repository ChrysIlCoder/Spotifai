import { takeLatest, put, call, fork } from "redux-saga/effects";
import { SAGAS_FLOW_NAMES } from "../sagas";
import { GetSearchResults } from '../../../../models/services/search/getSearchResults'
import { searchActions } from "./slice";
import { IRequestSearch, ISearch } from "../../../interfaces/ISearch";

function* getSearchResults(action: any) {
  const method = "[🎶] getSearchResults";
  console.log(method);

  const { types, q, offset, token }: IRequestSearch = action.payload

  const selectedTypes = types.filter(type => [...types].includes(type));
  const typeParam = selectedTypes.length ? `&type=${selectedTypes.join('%2C')}` : '';
  const offsetParam = offset ? `&offset=${offset}` : '';

  const url = `/search?q=${q}${typeParam}${offsetParam}`;

  try {
    yield put(searchActions.setIsLoading(true));

    const data: ISearch = yield call(GetSearchResults, url, token);
    console.log(`${method} - getSearchResults: ${JSON.stringify(data, null, 2)}`);

    yield put(searchActions.setSearchResults(data))
  } catch (error) {
    console.log(`${method} - error: ${error}`);
    console.log(`${method} - error: ${JSON.stringify(error, null, 2)}`);
  } finally {
    yield put(searchActions.setIsLoading(false));
    console.log(`${method} - end`);
  }
}

function* watchGetSearchResults() {
  yield takeLatest(SAGAS_FLOW_NAMES.GET_SEARCH_RESULTS, getSearchResults)
}

export const searchSagas = [
  fork(watchGetSearchResults),
];