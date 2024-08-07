import { createSlice } from "@reduxjs/toolkit";
import { SAGAS_FLOW_NAMES } from "../../sagas";
import { IRequestSearch, ISearch } from "../../../../interfaces/ISearch";

export interface ISearchInitalState {
  isLoading: boolean;
  search_results: ISearch;
}

const initialState: ISearchInitalState = {
  isLoading: false,
  search_results: {} as ISearch
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;

      state.search_results = {} as ISearch;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setSearchResults: (state, action) => {
      state.search_results = action.payload
    }
  }
});

const getIsLoading = ({ search }: { search: ISearchInitalState }) => search.isLoading;

const getSearchResults = ({ search }: { search: ISearchInitalState }) => search.search_results;

export const searchSelector = {
  getIsLoading,
  getSearchResults,
};

export const { actions, reducer } = searchSlice;

export const searchSagaActions = {
  sagaSearch: (body: IRequestSearch) => ({ type: SAGAS_FLOW_NAMES.GET_SEARCH_RESULTS, payload: body }),
};
