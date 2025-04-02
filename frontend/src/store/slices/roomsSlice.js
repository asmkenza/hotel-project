import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  rooms: [],
  error: null,
};

export const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    getRoomsSuccess: (state, action) => {
      state.loading = false;
      state.rooms = action.payload;
      state.error = null;
    },
    hasError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteRoomSuccess: (state, action) => {
      state.loading = false;
      state.rooms = state.rooms.filter(room => room._id !== action.payload);
      state.error = null;
    },
    updateRoomSuccess: (state, action) => {
      state.loading = false;
      const updatedRoom = action.payload;
      state.rooms = state.rooms.map(room =>
        room._id === updatedRoom._id ? updatedRoom : room
      );
      state.error = null;
    },
    createRoomSuccess: (state, action) => {
      state.loading = false;
      state.rooms.push(action.payload);
      state.error = null;
    },
  },
});


export const { startLoading, getRoomsSuccess, hasError, deleteRoomSuccess, updateRoomSuccess, createRoomSuccess } = roomsSlice.actions;

export default roomsSlice.reducer;
