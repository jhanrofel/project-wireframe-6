import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthToken, Unauthorize } from "../authentication";
import { IsLogged } from "../loggedIn";
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
          return;
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
          console.log(res.data);
          return res.data;
        } else {
          return rejectWithValue(res.data.error);
        }
      })
      .catch((err) => err);
  }
);

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  return await axios({
    url: `/users`,
    method: "get",
    headers: {
      Authorization: AuthToken(),
    },
  })
    .then((res) => {
      if (res.data.status === 200) {
        return res.data;
      }
    })
    .catch((error) => {
      if (error.response.data.error.name === "UnauthorizedError") Unauthorize();
      return error;
    });
});

export const fetchUserOne = createAsyncThunk(
  "users/fetchUserOne",
  async (userId: string) => {
    return await axios({
      url: `/users/${userId}`,
      method: "get",
      headers: {
        Authorization: AuthToken(),
      },
    })
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.data.error.name === "UnauthorizedError") Unauthorize();
        return error;
      });
  }
);

interface EditFormValues {
  fullname: string;
  email: string;
}

interface EditUserValues {
  userId: string;
  formValues: EditFormValues;
}

export const editUser = createAsyncThunk(
  "users/editUser",
  async (data: EditUserValues, { rejectWithValue }) => {
    const { userId, formValues } = data;
    return await axios({
      url: `/users/${userId}`,
      method: "patch",
      data: formValues,
      headers: {
        Authorization: AuthToken(),
      },
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

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId: string) => {
    return await axios({
      url: `/users/${userId}`,
      method: "delete",
      headers: {
        Authorization: AuthToken(),
      },
    })
      .then(() => {
        return userId;
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
  logged: IsLogged() ? true : false,
  data: [{}],
  dataOne: {},
  loading: "idle",
} as UsersState;

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.logged = false;
      state.data = [];
      state.dataOne = { id: "", fullname: "", email: "" };
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postUser.fulfilled, (state, action) => {
      state.data = [...state.data, action.payload.data];
    });
    builder.addCase(postUser.rejected, (state) => {
      state.message = "error";
    });
    builder.addCase(loginUser.fulfilled, (state) => {
      state.logged = true;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.logged = false;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.data = action.payload.users;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.data = state.data.filter((user) => user.id !== action.payload);
    });
    builder.addCase(fetchUserOne.fulfilled, (state, action) => {
      state.dataOne = action.payload;
    });
    builder.addCase(editUser.fulfilled, (state, action) => {
      state.dataOne = { id: "", fullname: "", email: "" };
    });
    builder.addCase(editUser.rejected, (state) => {
      state.message = "error";
    });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
