import { createSlice } from "@reduxjs/toolkit";
import { SAGAS_FLOW_NAMES } from "../../sagas";
import { IRequestSeveralCategories, ISeveralCategories } from "../../../../interfaces/ISeveralCategories";

export interface ICategoriesInitalState {
  isLoading: boolean;
  several_categories: ISeveralCategories;
}

const initialState: ICategoriesInitalState = {
  isLoading: false,
  several_categories: {} as ISeveralCategories
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;

      state.several_categories = {} as ISeveralCategories;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setSeveralCategories: (state, action) => {
      state.several_categories = action.payload
    }
  }
});

const getIsLoading = ({ categories }: { categories: ICategoriesInitalState }) => categories.isLoading;

const getSeveralCategories = ({ categories }: { categories: ICategoriesInitalState }) => categories.several_categories;

export const categoriesSelector = {
  getIsLoading,
  getSeveralCategories,
};

export const { actions, reducer } = categoriesSlice;

export const categoriesSagaActions = {
  sagaGetSeveralCategories: (body: IRequestSeveralCategories) => ({ type: SAGAS_FLOW_NAMES.GET_SEVERAL_CATEGORIES, payload: body }),
};
