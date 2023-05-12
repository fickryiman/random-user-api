import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://randomuser.me/api/?results=20';

export const fetchUsers = createAsyncThunk(
  'usersState/fetchUsers',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const result = data.results;
      console.log(result);
      return result;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
      throw error;
    }
  }
);

const initialState = {
  usersList: [],
  isLoading: false,
  error: undefined,
};

const usersSlice = createSlice({
  name: 'usersState',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.usersList = action.payload;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.usersList = [];
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

console.log(usersSlice);

export const { extraReducers } = usersSlice.actions;

export default usersSlice.reducer;
