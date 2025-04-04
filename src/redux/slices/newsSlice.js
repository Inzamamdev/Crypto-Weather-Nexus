import createFetchSlice from "./fetchSlice";

const newsSlice = createFetchSlice("news");

export const {
  fetchStart: fetchNewsStart,
  fetchSuccess: fetchNewsSuccess,
  fetchFailure: fetchNewsFailure,
} = newsSlice.actions;
export default newsSlice.reducer;
