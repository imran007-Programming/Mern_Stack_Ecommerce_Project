//Admin add a product///

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import toast from "react-hot-toast";
import {
  addBannerAPi,
  DeleteBannerImageApi,
  GetBannerApi,
} from "../../../api/BannerAPi/Bannerapi";

export const adminAddBanner = createAsyncThunk(
  "adminAddproduct",
  async (data, config) => {
    try {
      const { files } = data;

      const fromData = new FormData();

      files.forEach((file) => {
        fromData.append("files", file);
      });

      const response = await addBannerAPi(fromData, config);

      if (response.status == 200) {
        return response.data;
      } else if (response.response.status == 400) {
        toast.error(response.response.data.error);
        return response;
      } else {
        toast.error(response.response.data.error);
      }
    } catch (error) {
      throw error;
    }
  }
);
export const GetBanner = createAsyncThunk("GetBanner", async (thunkApi) => {
  try {
    const response = await GetBannerApi();

    if (response.status == 200) {
      return response.data;
    } else {
      return thunkApi.rejectWithValue("error");
    }
  } catch (error) {
    throw error;
  }
});

///Admin delete Bannerimages///
export const deleteBannerImages = createAsyncThunk(
  "deleteBannerImages",
  async (data) => {
    try {
      // Call the API to delete the image
      const response = await DeleteBannerImageApi(data);
      if (response.status === 200) {
        return response.data;
      } else {
        toast.error("Failed to delete image");
      }
    } catch (error) {
      toast.error("Error deleting image");
    }
  }
);

// create reducer and action//
export const BannerSlice = createSlice({
  name: "BannerSlice",
  initialState: {
    AddBannerImages: [],
    GetBannerImages: [],
    deleteBannerImages: [],
    Bannerloading: false,
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    ///Admin Add Banner
    builder
      .addCase(adminAddBanner.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminAddBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.AddBannerImages = action.payload;
      })
      .addCase(adminAddBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      ///get Banner
      .addCase(GetBanner.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.GetBannerImages = action.payload;
      })
      .addCase(GetBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      ///Admin deleteImages for Banner
      .addCase(deleteBannerImages.pending, (state) => {
        state.Bannerloading = true;
      })
      .addCase(deleteBannerImages.fulfilled, (state, action) => {
        state.Bannerloading = false;
        state.deleteBannerImages = action.payload;
      })
      .addCase(deleteBannerImages.rejected, (state, action) => {
        state.Bannerloading = false;
        state.error = action.payload;
      });
  },
});
export default BannerSlice.reducer;
