import { configureStore } from "@reduxjs/toolkit";
import jsonUserReducer from "../slice/jsonUserSlice";

export const store = configureStore({
  reducer: {
    jsonUser: jsonUserReducer,
  },
});
