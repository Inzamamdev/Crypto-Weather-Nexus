import { createSlice } from "@reduxjs/toolkit";

const createFetchSlice = (name) => {
  return createSlice({
    name,
    initialState: {
      data: null,
      loading: false,
      error: null,
    },
    reducers: {
      fetchStart: (state) => {
        state.loading = true;
        state.error = null;
      },
      fetchSuccess: (state, action) => {
        state.loading = false;
        state.data = action.payload;
      },
      fetchFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
    },
  });
};

export default createFetchSlice;
