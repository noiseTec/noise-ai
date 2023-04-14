import { configureStore } from "@reduxjs/toolkit";
import handPointReducer from "../redux/slices/handPointSlice";
export const store = configureStore({
  reducer: {
    handPoint: handPointReducer,
  },
});
