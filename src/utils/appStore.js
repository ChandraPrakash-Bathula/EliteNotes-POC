import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../utils/userSlice";
import featureReducer from "./featureSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    features:featureReducer
  },
});

export default appStore;
