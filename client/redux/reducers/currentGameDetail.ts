import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface CurrentGameDetail {
  data: string;
  isLoading: boolean;
}

const initialState: CurrentGameDetail = {
  data: "[]",
  isLoading: true,
};

export const currentGameDetail = createSlice({
  name: "counter",
  initialState,
  reducers: {
    updateCurrentGameData: (state, action: PayloadAction<any>) => {
      state.data += action.payload;
    },
    updateCurrentGameIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { updateCurrentGameData, updateCurrentGameIsLoading } =
  currentGameDetail.actions;
export default currentGameDetail.reducer;

export const selectCurrentGameIsLoading = (state: RootState) =>
  state.currentGameDetailReducer.isLoading;
export const selectCurrentGameData = (state: RootState) =>
  state.currentGameDetailReducer.data;
