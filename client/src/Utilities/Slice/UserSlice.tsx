import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";

interface RegisterValues {
  fullname: string;
  email: string;
  password: string;
}

export const postUser = createAsyncThunk(
  "users/postUser",
  async (formValues: RegisterValues, { rejectWithValue }) => {
    return await axios({
      url: `/users`,
      method: "post",
      data: formValues,
    })
      .then((res) => {
        if (res.data.status === 200) {
          return res.data.users;
        } else {
          return rejectWithValue(res.data.error);
        }
      })
      .catch((err) => err);
  }
);

interface LoginValues {
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (formValues: LoginValues, { rejectWithValue }) => {
    return await axios({
      url: `/users/login`,
      method: "post",
      data: formValues,
    })
      .then((res) => {
        if (res.data.status === 200) {
          return res.data;
        } else {
          return rejectWithValue(res.data.error);
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
  logged: boolean;
  data: UsersOneState[];
  dataOne: UsersOneState;
  loading: "idle" | "pending" | "succeeded" | "failed";
  message: string;
}

const initialState = {
  logged: false,
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
      state.message = "error";
    });
    builder.addCase(loginUser.fulfilled, (state) => {
      state.logged = true;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.logged = false;
    });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
