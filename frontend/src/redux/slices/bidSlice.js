import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

/* =========================
   FETCH BIDS
========================= */
export const fetchBids = createAsyncThunk(
  "bids/fetchBids",
  async (gigId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/bids/${gigId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch bids"
      );
    }
  }
);

/* =========================
   HIRE BID
========================= */
export const hireBid = createAsyncThunk(
  "bids/hireBid",
  async (bidId, { rejectWithValue }) => {
    try {
      const res = await api.patch(`/bids/${bidId}/hire`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Gig already assigned"
      );
    }
  }
);

/* =========================
   SUBMIT BID (FOR FUTURE)
========================= */
export const submitBid = createAsyncThunk(
  "bids/submitBid",
  async (bidData, { rejectWithValue }) => {
    try {
      const res = await api.post("/bids", bidData);
      return res.data.bid;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to submit bid"
      );
    }
  }
);

/* =========================
   SLICE
========================= */
const bidSlice = createSlice({
  name: "bids",
  initialState: {
    bids: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      /* FETCH */
      .addCase(fetchBids.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBids.fulfilled, (state, action) => {
        state.loading = false;
        state.bids = action.payload;
      })
      .addCase(fetchBids.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* HIRE */
      .addCase(hireBid.pending, (state) => {
        state.loading = true;
      })
      .addCase(hireBid.fulfilled, (state, action) => {
        state.loading = false;
        state.bids = state.bids.map((bid) =>
          bid._id === action.payload._id
            ? action.payload
            : { ...bid, status: "rejected" }
        );
      })
      .addCase(hireBid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* SUBMIT BID */
      .addCase(submitBid.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitBid.fulfilled, (state, action) => {
        state.loading = false;
        state.bids.unshift(action.payload);
      })
      .addCase(submitBid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bidSlice.reducer;
