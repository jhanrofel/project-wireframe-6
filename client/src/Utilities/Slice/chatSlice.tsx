import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthToken, Unauthorize } from "../authentication";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";

interface chatValue {
  dateSend: string;
  message: string;
  user: string;
}

export const postChat = createAsyncThunk(
  "chats/postChat",
  async (formValues: chatValue) => {
    return await axios({
      url: `/chats`,
      method: "post",
      data: formValues,
      headers: {
        Authorization: AuthToken(),
      },
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => err);
  }
);

export const fetchChats = createAsyncThunk("chats/fetchUsers", async () => {
  return await axios({
    url: `/chats`,
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
});

export const fetchUserChats = createAsyncThunk("chats/fetchUserChats", async (userId:string) => {
  return await axios({
    url: `/users/${userId}/chats`,
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
});

interface UserDetail {
  fullname: string;
}

interface ChatsOneState {
  id: string;
  dateSend: string;
  message: string;
  user: string;
  chatUser: UserDetail;
}

interface ChatsState {
  data: ChatsOneState[];
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState = {
  data: [],
  loading: "idle",
} as ChatsState;

export const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    clearChat: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChats.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchUserChats.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(postChat.fulfilled, (state, action) => {
      state.data = [...state.data, action.payload];
    });
  },
});

export const { clearChat } = chatSlice.actions;
export default chatSlice.reducer;
