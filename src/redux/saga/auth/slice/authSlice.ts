import { createSlice } from "@reduxjs/toolkit";
import { SAGAS_FLOW_NAMES } from "../../sagas";
import { IGetToken, IRequestToken } from "../../../../interfaces/IAuth";

export interface IAuthIntialState {
  isLoading: boolean;
  token: IGetToken;
}

const initialState: IAuthIntialState = {
  isLoading: false,
  token: {} as IGetToken
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;

      state.token = {} as IGetToken;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
    }
  }
});

const getIsLoading = ({ auth }: { auth: IAuthIntialState }) => auth.isLoading;

const getToken = ({ auth }: { auth: IAuthIntialState }) => auth.token

export const authSelector = {
  getIsLoading,
  getToken,
};

export const { actions, reducer } = authSlice;

export const authSagaActions = {
  sagaGetToken: (body: IRequestToken) => ({ type: SAGAS_FLOW_NAMES.GET_TOKEN, payload: body }),
};
