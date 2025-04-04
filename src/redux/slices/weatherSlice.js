import createFetchSlice from "./fetchSlice";

const weatherSlice = createFetchSlice("weather");
console.log(weatherSlice);
export const {
  fetchStart: fetchWeatherStart,
  fetchSuccess: fetchWeatherSuccess,
  fetchFailure: fetchWeatherFailure,
} = weatherSlice.actions;
export default weatherSlice.reducer;
