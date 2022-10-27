import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthToken, Unauthorize } from "../authentication";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";

export const fetchUploads = createAsyncThunk(
  "uploads/fetchUploads",
  async (userId: string) => {
    return await axios({
      url: `/users/${userId}/uploads`,
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

export const fetchUploadOne = createAsyncThunk(
  "uploads/fetchUploadOne",
  async (uploadId: string) => {
    return await axios({
      url: `/uploads/${uploadId}`,
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

export const postUpload = createAsyncThunk(
  "uploads/postUpload",
  async (file: FileList | null) => {
    return await axios({
      url: `/files`,
      method: "post",
      data: file,
      headers: {
        Authorization: AuthToken(),
      },
    })
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .catch((error) => {
        console.log(file);
        if (error.response.data.error.name === "UnauthorizedError")
          Unauthorize();
        return error;
      });
  }
);

interface editFormValues {
  label: string;
}

interface editUploadValue {
  uploadId: string;
  formValues: editFormValues;
}

export const updateUpload = createAsyncThunk(
  "uploads/updateUpload",
  async (data: editUploadValue) => {
    const { uploadId, formValues } = data;
    return await axios({
      url: `/uploads/${uploadId}`,
      method: "patch",
      data: formValues,
      headers: {
        Authorization: AuthToken(),
      },
    })
      .then(() => {
        return { uploadId, label: formValues.label };
      })
      .catch((error) => {
        if (error.response.data.error.name === "UnauthorizedError")
          Unauthorize();
        return error;
      });
  }
);

export const deleteUpload = createAsyncThunk(
  "uploads/deleteUpload",
  async (uploadId: string) => {
    return await axios({
      url: `/uploads/${uploadId}`,
      method: "delete",
      headers: {
        Authorization: AuthToken(),
      },
    })
      .then(() => uploadId)
      .catch((error) => {
        if (error.response.data.error.name === "UnauthorizedError")
          Unauthorize();
        return error;
      });
  }
);

interface uploadsOneState {
  id: string;
  label: string;
  filename: string;
  fileLocation: string;
  user: string;
}

interface uploadsState {
  data: uploadsOneState[];
  dataOne: uploadsOneState;
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState = {
  data: [{}],
  dataOne: {},
  loading: "idle",
} as uploadsState;

export const uploadSlice = createSlice({
  name: "uploads",
  initialState,
  reducers: {
    clearUpload: (state) => {
      state.data = [];
      state.dataOne = {
        id: "",
        label: "",
        filename: "",
        fileLocation: "",
        user: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUploads.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchUploadOne.fulfilled, (state, action) => {
      state.dataOne = action.payload;
    });
    builder.addCase(updateUpload.fulfilled, (state, action) => {
      const { uploadId, label } = action.payload;
      state.data = state.data.map((upload) =>
        upload.id === uploadId ? { ...upload, label } : upload
      );
    });
    builder.addCase(deleteUpload.fulfilled, (state, action) => {
      state.data = state.data.filter((upload) => upload.id !== action.payload);
    });
  },
});

export const { clearUpload } = uploadSlice.actions;
export default uploadSlice.reducer;
