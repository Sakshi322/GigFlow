import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// Fetch all public gigs
export const fetchGigs = createAsyncThunk(
  "gigs/fetchGigs",
  async (search = "") => {
    const response = await api.get(`/gigs${search ? `?search=${search}` : ""}`);
    return response.data;
  }
);

// Fetch logged-in user's gigs
export const fetchMyGigs = createAsyncThunk(
  "gigs/fetchMyGigs",
  async () => {
    const res = await api.get("/gigs/my");
    return res.data;
  }
);

// Create gig
export const createGig = createAsyncThunk(
  "gigs/createGig",
  async (gigData, { rejectWithValue }) => {
    try {
      const res = await api.post("/gigs", gigData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const gigsSlice = createSlice({
  name: "gigs",
  initialState: {
    gigs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🔹 ALL GIGS
      .addCase(fetchGigs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGigs.fulfilled, (state, action) => {
        state.loading = false;
        state.gigs = action.payload;
      })
      .addCase(fetchGigs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 🔹 MY GIGS
      .addCase(fetchMyGigs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyGigs.fulfilled, (state, action) => {
        state.loading = false;
        state.gigs = action.payload;
      })
      .addCase(fetchMyGigs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // 🔹 CREATE GIG
      .addCase(createGig.fulfilled, (state, action) => {
        state.gigs.unshift(action.payload);
      });
  },
});

export default gigsSlice.reducer;
