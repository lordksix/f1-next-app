import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from '@/redux/user/userSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


export const store = configureStore({
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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
