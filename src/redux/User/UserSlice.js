import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  username:''
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, actions) => {
      const {
        name = "",
        username = "",
      } = actions.payload;
      state.name = name;
      state.username = username;
    },
    resetUser: (state) => {
      state.name = "";
      state.username = "";
    },
  },
});

export const { updateUser,resetUser } = userSlice.actions;

export default userSlice.reducer;
