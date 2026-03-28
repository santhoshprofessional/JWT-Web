import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};
const jsonUserSlice = createSlice({
  name: "jsonUsers",
  initialState,
  reducers: {
    addUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});
export const { addUsers } = jsonUserSlice.actions;
export default jsonUserSlice.reducer;
