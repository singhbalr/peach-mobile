import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  username: string;
  password: string;
  isLoggedIn: boolean;
  token: string;
  patientId: string;
  patientDetails: any;
}
const initialState = {
  username: "",
  password: "",
  isLoggedIn: false,
  token: "",
  patientId: "",
  patientDetails: {},
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUsername: (state: AuthState, action: { payload: string }) => {
      state.username = action.payload;
    },
    setPassword: (state: AuthState, action: { payload: string }) => {
      state.password = action.payload;
    },
    setLoggedInState: (state: AuthState, action: { payload: boolean }) => {
      state.isLoggedIn = action.payload;
    },
    setToken: (state: AuthState, action: { payload: string }) => {
      state.token = action.payload;
    },
    setPatientId: (state: AuthState, action: { payload: string }) => {
      state.patientId = action.payload;
    },
    setPatientDetails: (state: AuthState, action: { payload: any }) => {
      state.patientDetails = action.payload;
    },
    setLogout: () => initialState,
  },
});

export default authSlice.reducer;

interface SetUsernameAction {
  type: string;
  payload: string;
}

interface SetPasswordAction {
  type: string;
  payload: string;
}

interface SetLoggedInStateAction {
  type: string;
  payload: boolean;
}

interface SetTokenAction {
  type: string;
  payload: string;
}

interface SetPatientIdAction {
  type: string;
  payload: string;
}
interface SetPatientDetails {
  type: string;
  payload: any;
}

interface setLogoutAction {}

type AuthActions =
  | SetUsernameAction
  | SetPasswordAction
  | SetLoggedInStateAction
  | SetTokenAction
  | setLogoutAction
  | SetPatientDetails
  | SetPatientIdAction;

export const {
  setUsername,
  setPassword,
  setLoggedInState,
  setToken,
  setLogout,
  setPatientId,
  setPatientDetails,
} = authSlice.actions;
