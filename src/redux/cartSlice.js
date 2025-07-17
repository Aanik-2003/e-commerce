import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { 
    items: {} 
  },
  reducers: {
    increment: (state, action) => {
      const id = action.payload;
      state.items[id] = (state.items[id] || 0) + 1;
    },
    decrement: (state, action) => {
      const id = action.payload;
      if (state.items[id] && state.items[id] > 0) {
        state.items[id] -= 1;
      }
    },
    reset: (state, action) => {
      const id = action.payload;
      state.items[id] = 0;
    },
    resetAll: (state) => {
      state.items = {};
    },
  },
});

export const { increment, decrement, reset, resetAll } = cartSlice.actions;
export default cartSlice.reducer;