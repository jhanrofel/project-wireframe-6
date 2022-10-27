import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthToken, Unauthorize } from "../authentication";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";

export const fetchUploadShareTos = createAsyncThunk(
  "shareTos/fetchUploadShareTos",
  async (uploadId: string) => {
    return await axios({
      url: `/uploads/${uploadId}/share-tos`,
      method: "get",
      headers: {
        Authorization: AuthToken(),
      },
    })
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.data.error.name === "UnauthorizedError")
          Unauthorize();
        return error;
      });
  }
);

export const fetchUploadChoose = createAsyncThunk(
  "shareTos/fetchUploadChoose",
  async (uploadId: string) => {
    return await axios({
      url: `/uploads/${uploadId}/choose-to-share`,
      method: "get",
      headers: {
        Authorization: AuthToken(),
      },
    })
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.data.error.name === "UnauthorizedError")
          Unauthorize();
        return error;
      });
  }
);

export const fetchShareOne = createAsyncThunk(
  "shareTos/fetchShareOne",
  async (shareToId: string) => {
    return await axios({
      url: `/share-tos/${shareToId}`,
      method: "get",
      headers: {
        Authorization: AuthToken(),
      },
    })
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.data.error.name === "UnauthorizedError")
          Unauthorize();
        return error;
      });
  }
);

interface postShareValues {
  user: string;
  upload: string;
}

export const postShare = createAsyncThunk(
  "shareTos/postShare",
  async (formValues: postShareValues) => {
    return await axios({
      url: `/share-tos`,
      method: "post",
      data: formValues,
      headers: {
        Authorization: AuthToken(),
      },
    })
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.data.error.name === "UnauthorizedError")
          Unauthorize();
        return error;
      });
  }
);

export const deleteShare = createAsyncThunk(
  "shareTos/deleteShare",
  async (shareToId: string) => {
    return await axios({
      url: `/share-tos/${shareToId}`,
      method: "delete",
      headers: {
        Authorization: AuthToken(),
      },
    })
      .then((res) => res)
      .catch((error) => {
        if (error.response.data.error.name === "UnauthorizedError")
          Unauthorize();
        return error;
      });
  }
);

interface userDetail {
  fullname: string;
}

interface shareToOneState {
  id: string;
  user: string;
  upload: string;
  shareToUser: userDetail;
}

interface shareToChooseState {
  id: string;
  fullname: string;
}

interface shareToState {
  dataShares: shareToOneState[] | [];
  dataChooseUser: shareToChooseState[] | [];
  dataOne: shareToOneState;
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState = {
  dataShares: [],
  dataChooseUser: [],
  dataOne: {},
} as shareToState;

export const shareToSlice = createSlice({
  name: "shareTos",
  initialState,
  reducers: {
    clearShareTo: (state) => {
      state.dataShares = [];
      state.dataChooseUser = [];
      state.dataOne = {
        id: "",
        user: "",
        upload: "",
        shareToUser: { fullname: "" },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUploadShareTos.fulfilled, (state, action) => {
      state.dataShares = action.payload;
    });
    builder.addCase(fetchUploadChoose.fulfilled, (state, action) => {
      state.dataChooseUser = action.payload;
    });
    builder.addCase(fetchShareOne.fulfilled, (state, action) => {
      state.dataOne = action.payload;
    });
    builder.addCase(postShare.fulfilled, (state, action) => {
      state.dataChooseUser = state.dataChooseUser.filter(
        (user) => user.id !== action.payload.user
      );
      state.dataShares = [...state.dataShares, action.payload];
    });
    builder.addCase(deleteShare.fulfilled, (state) => {
      state.dataChooseUser = [
        ...state.dataChooseUser,
        {
          id: state.dataOne.user,
          fullname: state.dataOne.shareToUser.fullname,
        },
      ];
      state.dataShares = state.dataShares.filter(
        (share) => share.user !== state.dataOne.user
      );
      state.dataOne = {
        id: "",
        user: "",
        upload: "",
        shareToUser: { fullname: "" },
      };
    });
  },
});

export const { clearShareTo } = shareToSlice.actions;
export default shareToSlice.reducer;
