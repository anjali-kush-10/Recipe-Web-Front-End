import { createSlice } from '@reduxjs/toolkit';

const initialToken = localStorage.getItem('token') || null;

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: initialToken,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    clearToken: (state) => {
      console.log(state,"stattettetettetetett");
      
      state.token = null;
      console.log(state.token);
      localStorage.removeItem('token');
    }
  }
});

export const { setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;
