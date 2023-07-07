import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Initial state
const initialState: UserState = {
  authState: false,
  name: '',
};

// Actual Slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action to set the authentication status
    setUserState(state, action: PayloadAction<UserState>) {
      state.name = action.payload.name;
      state.authState = action.payload.authState;
    },
  },
});

export const { setUserState } = userSlice.actions;

export const selectUserState = (state: RootState) => state.user;

export default userSlice.reducer;