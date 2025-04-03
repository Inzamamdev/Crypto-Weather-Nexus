import createFetchSlice from "./createFetchSlice";

const newsSlice = createFetchSlice("news");

export const {
  fetchStart: fetchNewsStart,
  fetchSuccess: fetchNewsSuccess,
  fetchFailure: fetchNewsFailure,
} = newsSlice.actions;
export default newsSlice.reducer;
