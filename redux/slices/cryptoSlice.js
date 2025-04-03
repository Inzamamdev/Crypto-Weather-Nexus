import createFetchSlice from "./createFetchSlice";

const cryptoSlice = createFetchSlice("crypto");

export const {
  fetchStart: fetchCryptoStart,
  fetchSuccess: fetchCryptoSuccess,
  fetchFailure: fetchCryptoFailure,
} = cryptoSlice.actions;
export default cryptoSlice.reducer;
