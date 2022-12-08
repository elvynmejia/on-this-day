import { createSlice } from '@reduxjs/toolkit';

export const initialState = { isOpen: false };

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open: (state) => {
      state.isOpen = true
    },
    close: (state) => {
      state.isOpen = false
    }
  }
});

const { open, close } = modalSlice.actions;
const { reducer } = modalSlice;

export { open, close, reducer };
