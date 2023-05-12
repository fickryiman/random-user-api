import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './users/usersSlice';

const store = configureStore({
  reducer: {
    usersState: usersReducer,
  },
});

export default store;
