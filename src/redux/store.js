import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./User/UserSlice";
import orderReducer from "./Order/OrderSlide";
export const store = configureStore({
  reducer: {
    user: userReducer,
    order: orderReducer
  },
});
