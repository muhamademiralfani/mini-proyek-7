import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000/logs';

const initialState = {
  logs: [],
  loading: false,
  error: null,
  isSuccess: false,
};

export const fetchLogs = createAsyncThunk('logs/fetchLogs', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addLog = createAsyncThunk('logs/addLog', async (log) => {
  const response = await axios.post(API_URL, log);
  return response.data;
});

const logSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetching logs
    builder.addCase(fetchLogs.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchLogs.fulfilled, (state, action) => {
      state.loading = false;
      state.logs = action.payload;
    });
    builder.addCase(fetchLogs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong';
    });
  },
});

export default logSlice.reducer;
