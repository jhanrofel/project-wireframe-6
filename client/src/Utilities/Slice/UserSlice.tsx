import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";

interface LoginValues {
  fullname: string;
  email: string;
  password: string;
}

interface UserValues {
  id: string;
  fullname: string;
  email: string;
  password: string;
}

export const postUser = createAsyncThunk(
  "users/postUser",
  async (formValues: LoginValues, { rejectWithValue }) => {
    return await axios({
      url: `http://localhost:3001/users`,
      method: "post",
      data: formValues,
    })
      .then((res) => {
        if (res.data.code === 11000) {
          return rejectWithValue(
            `${res.data.keyValue.email} email already exist.`
          );
        } else {
          return res.data;
        }
      })
      .catch((err) => err);
  }
);

interface UsersOneState {
  id: string;
  fullname: string;
  email: string;
}

interface UsersState {
  data: UsersOneState[];
  dataOne: UsersOneState;
  loading: "idle" | "pending" | "succeeded" | "failed";
  message: string;
}

const initialState = {
  data: [{}],
  dataOne: {},
  loading: "idle",
} as UsersState;

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.data = [];
      state.dataOne = { id: "", fullname: "", email: "" };
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postUser.fulfilled, (state, action) => {
      state.data = [...state.data, action.payload.data];
    });
    builder.addCase(postUser.rejected, (state, action) => {
      console.log(action.payload);
      state.message = "error";
    });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
