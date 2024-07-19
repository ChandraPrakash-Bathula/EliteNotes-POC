import { createSlice } from "@reduxjs/toolkit";

const featureSlice = createSlice({
    name:'features',
    initialState:{
        showFeatures:false
    },
    reducers:{
        toggleFeaturesView:(state) => {
            state.showFeatures = !state.showFeatures
        }
    }
})

export const {toggleFeaturesView} = featureSlice.actions;

export default featureSlice.reducer;