import { createSlice } from "@reduxjs/toolkit"

interface AppState {
  notificationIconState: boolean
  notificationInfo: any
  sidebarState: boolean
  clinicalNotificationState: boolean
  ctaModalNotificationState: boolean
}
const initialState = {
  notificationIconState: false,
  clinicalNotificationState: true,
  ctaModalNotificationState: false,
  notificationInfo: {
    message: '',
    iconSource: '',
    btnText: '',
    navigationScreen: '',
    payload: {}
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
    toggleClinicalNotificationState: (state: AppState, action: { payload: boolean }) => {
      state.clinicalNotificationState = action.payload
    },
    toggleCtaModalNotificationState: (state: AppState, action: { payload: boolean }) => {
      state.ctaModalNotificationState = action.payload
    },
    setNotificationInfo: (state: AppState, action: { payload: object }) => {
      state.notificationInfo = action.payload
    },
    removeNotificationInfo:(state: AppState) => {
      state.notificationInfo = {
        message: '',
        iconSource: '',
        btnText: '',
        navigationScreen: null,
        payload: {}
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
  toggleClinicalNotificationState,
  toggleCtaModalNotificationState
} = appSlice.actions
