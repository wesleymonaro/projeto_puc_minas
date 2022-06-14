/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserInfo {
  id: string;
  name: string;
  role: string;
  email: string;
  dojoId: string;
}

export interface InfosState {
  isAuthenticated: boolean;
  accessToken?: string;
  refreshToken?: string;
  loggedUser: UserInfo | null;
}

const initialState: InfosState = {
  isAuthenticated: false,
  accessToken: "",
  refreshToken: "",
  loggedUser: null,
};

const infosSlice = createSlice({
  name: "infos",
  initialState,
  reducers: {
    loginRedux(
      state,
      action: PayloadAction<{
        token: string;
        refreshToken: string;
        user: UserInfo;
      }>
    ) {
      const {
        payload: { token, refreshToken, user },
      } = action;
      state.isAuthenticated = true;
      state.accessToken = token;
      state.refreshToken = refreshToken;
      state.loggedUser = user;
    },
  },
});

export const { loginRedux } = infosSlice.actions;
export default infosSlice.reducer;
