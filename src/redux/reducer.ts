import { createSlice } from "@reduxjs/toolkit"

interface AppState {
  notificationIconState: boolean
  notificationInfo: any
  sidebarState: boolean
}
const initialState = {
  notificationIconState: false,
  notificationInfo: {
    message: '',
    iconSource: '',
    btnText: '',
    navigationScreen: '',
  },
  sidebarState: false,
}
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleNotificationIconState: (state: AppState, action: { payload: boolean }) => {
      state.notificationIconState = action.payload
    },
    setNotificationInfo: (state: AppState, action: { payload: object }) => {
      state.notificationInfo = action.payload
    },
    removeNotificationInfo:(state: AppState) => {
      state.notificationInfo = {
        message: '',
        iconSource: '',
        btnText: '',
        navigationScreen: null
      }
    },
    setSidebarState: (state: AppState, action: { payload: boolean }) => {
      state.sidebarState = action.payload;
    },
    resetAppState: () => initialState,
  },
})

export default appSlice.reducer

export const {
  toggleNotificationIconState,
  setNotificationInfo,
  removeNotificationInfo,
  setSidebarState,
  resetAppState,
} = appSlice.actions
