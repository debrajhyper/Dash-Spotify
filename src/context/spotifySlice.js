import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userToken: {},
    tracks: [],
    markets: [],
    filteredTracks: [],
    popularity: 'none',
    country: 'IN',
};

export const spotifySlice = createSlice({
    name: 'Spotify',
    initialState,
    reducers: {
        addUserToken: (state, action) => {
            state.userToken = action.payload;
        },
        removeUserToken: (state) => {
            state.userToken = {};
        },
        addTrack: (state, action) => {
            state.tracks = action.payload;
        },
        addMarket: (state, action) => {
            state.markets = action.payload;
        },
        addFilteredTracks: (state, action) => {
            state.filteredTracks = action.payload;
        },
        changePopularity: (state, action) => {
            state.popularity = action.payload;
        },
        changeCountry: (state, action) => {
            state.country = action.payload;
        },
    }
});

export const { addUserToken, removeUserToken, addTrack, addMarket, addFilteredTracks, changePopularity, changeCountry } = spotifySlice.actions;
export default spotifySlice.reducer;