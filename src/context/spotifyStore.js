import { configureStore } from "@reduxjs/toolkit";
import storeReducer from "./spotifySlice";

export const spotifyStore = configureStore({
    reducer: storeReducer
});
