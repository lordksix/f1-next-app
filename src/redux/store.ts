import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { userSlice } from '@/redux/user/userSlice';
import { createWrapper } from "next-redux-wrapper";


const makeStore = () =>
  configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export function setupStore(preloadedState: preLoadedStateType) {
  return configureStore({
    reducer: {
      [userSlice.name]: userSlice.reducer,
    },
    preloadedState,
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
