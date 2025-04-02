import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import RegisterHotelPageService from '../../services/RegisterHotelPageService';

export const createHotel = createAsyncThunk(
    'hotel/createHotel',
    async (hotelData, thunkAPI) => {
      try {
        const response = await RegisterHotelPageService.createHotel(hotelData);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  
  const registerHotelPageSlice = createSlice({
    name: 'registerHotelPage',
    initialState: {
      hotel: null,
      loading: false,
      error: null,
      message: '',
    },
    reducers: {
      reset: (state) => {
        state.hotel = null;
        state.loading = false;
        state.error = null;
        state.message = '';
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(createHotel.pending, (state) => {
          state.loading = true;
          state.message = '';
        })
        .addCase(createHotel.fulfilled, (state, action) => {
          state.loading = false;
          state.hotel = action.payload.hotel;
          state.message = action.payload.message;
        })
        .addCase(createHotel.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.message = action.payload.message || 'Failed to create hotel';
        });
    },
  });
  
  export const { reset } = registerHotelPageSlice.actions;
  export default registerHotelPageSlice.reducer;
  