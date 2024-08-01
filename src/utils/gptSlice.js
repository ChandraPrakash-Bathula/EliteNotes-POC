// src/utils/gptSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transcriptionResults: [],
};

const gptSlice = createSlice({
  name: "gpt",
  initialState,
  reducers: {
    addGptTranscriptionResult: (state, action) => {
      state.transcriptionResults.push(action.payload);
    },
  },
});

export const { addGptTranscriptionResult } = gptSlice.actions;

export default gptSlice.reducer;