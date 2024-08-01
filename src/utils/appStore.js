// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../utils/userSlice";
import featureReducer from "./featureSlice";
import configReducer from "../utils/configSlice"; // Import configSlice
import gptReducer from "../utils/gptSlice"; // Import gptSlice

const appStore = configureStore({
  reducer: {
    user: userReducer,
    features: featureReducer,
    config: configReducer, // Add config reducer
    gpt: gptReducer, // Add gpt reducer
  },
});

export default appStore;