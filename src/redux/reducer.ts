import { createSlice } from "@reduxjs/toolkit"

interface AppState {
  notificationIconState: boolean;
  notificationInfo: any;
  sidebarState: boolean;
  clinicalNotificationState: boolean;
  ctaModalNotificationState: boolean;
  contributeNotificationState: boolean;
  rewardNotificationState: boolean;
  followupNotificationState: boolean;
}
const initialState = {
  notificationIconState: false,
  clinicalNotificationState: true,
  contributeNotificationState: false,
  rewardNotificationState: false,
  followupNotificationState: false,
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
      state.notificationIconState = action.payload;
    },
    toggleClinicalNotificationState: (state: AppState, action: { payload: boolean }) => {
      state.clinicalNotificationState = action.payload;
    },
    toggleContributeNotificationState: (state: AppState, action: { payload: boolean }) => {
      state.contributeNotificationState = action.payload;
    },
    toggleRewardNotificationState: (state: AppState, action: { payload: boolean }) => {
      state.rewardNotificationState = action.payload;
    },
    toggleFollowupNotificationState: (state: AppState, action: { payload: boolean }) => {
      state.followupNotificationState = action.payload;
    },
    toggleCtaModalNotificationState: (state: AppState, action: { payload: boolean }) => {
      state.ctaModalNotificationState = action.payload;
    },
    setNotificationInfo: (state: AppState, action: { payload: object }) => {
      state.notificationInfo = action.payload;
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
  toggleCtaModalNotificationState,
  toggleContributeNotificationState,
  toggleRewardNotificationState,
  toggleFollowupNotificationState
} = appSlice.actions
