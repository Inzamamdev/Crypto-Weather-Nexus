import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteCities: ["New York", "London", "Tokyo"],
  favoriteCryptos: ["bitcoin", "ethereum", "cardano"],
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setFavoriteCities: (state, action) => {
      state.favoriteCities = action.payload;
    },
    setFavoriteCryptos: (state, action) => {
      state.favoriteCryptos = action.payload;
    },
  },
});

export const { setFavoriteCities, setFavoriteCryptos } =
  preferencesSlice.actions;
export default preferencesSlice.reducer;
