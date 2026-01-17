import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import gigsReducer from "./slices/gigsSlice";
import bidReducer from "./slices/bidSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    gigs: gigsReducer,
    bids: bidReducer,
  },
});
