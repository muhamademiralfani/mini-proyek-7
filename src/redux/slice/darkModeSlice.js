import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDarkMode: false, // Default dark mode status
};

const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode; // Toggle the dark mode status
    },
    setDarkMode: (state, action) => {
      state.isDarkMode = action.payload; // Set dark mode status based on payload
    },
  },
});

// Export the actions
export const { toggleDarkMode, setDarkMode } = darkModeSlice.actions;

// Export the reducer
export default darkModeSlice.reducer;
