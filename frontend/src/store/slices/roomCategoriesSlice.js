import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  categories: [],
  error: null,
};

export const roomCategorySlice = createSlice({
  name: 'roomCategory',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    getCategoriesSuccess: (state, action) => {
      state.loading = false;
      state.categories = action.payload;
      state.error = null;
    },
    hasError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteCategorySuccess: (state, action) => {
      state.loading = false;
      state.categories = state.categories.filter(category => category._id !== action.payload);
      state.error = null;
    },
    updateCategorySuccess: (state, action) => {
      state.loading = false;
      const updatedCategory = action.payload;
      state.categories = state.categories.map(category =>
        category._id === updatedCategory._id ? updatedCategory : category
      );
      state.error = null;
    },
    createCategorySuccess: (state, action) => {
      state.loading = false;
      state.categories.push(action.payload);
      state.error = null;
    },
  },
});

export const { startLoading, getCategoriesSuccess, hasError, deleteCategorySuccess, updateCategorySuccess, createCategorySuccess } = roomCategorySlice.actions;

export default roomCategorySlice.reducer;

