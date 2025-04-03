import createFetchSlice from "./createFetchSlice";

const weatherSlice = createFetchSlice("weather");

export const {
  fetchStart: fetchWeatherStart,
  fetchSuccess: fetchWeatherSuccess,
  fetchFailure: fetchWeatherFailure,
} = weatherSlice.actions;
export default weatherSlice.reducer;
