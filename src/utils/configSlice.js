// src/utils/configSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: 'en', // Default language
  // other config properties
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setLanguage(state, action) {
      state.language = action.payload;
    },
    // other reducers
  },
});

export const { setLanguage } = configSlice.actions;

export default configSlice.reducer;