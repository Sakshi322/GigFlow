import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

/* LOGIN */
export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, thunkAPI) => {
    try {
      const res = await api.post("/auth/login", formData, {
        withCredentials: true, // IMPORTANT if backend uses cookies
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

/* REGISTER */
export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/register", formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user; 
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
