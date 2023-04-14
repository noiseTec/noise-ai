import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  handPoint: {},
  zoomPoint: {},
};

export const handPointSlice = createSlice({
  name: "handPoint",
  initialState,
  reducers: {
    change: (state, action) => {
      state.handPoint = action.payload.handPoint;
      state.zoomPoint = action.payload.zoomPoint;
    },
  },
});

export const { change } = handPointSlice.actions;
export default handPointSlice.reducer;
