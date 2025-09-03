import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  DeleteReviewApi,
  addReviewApi,
  getReviewApi,
} from "../../../api/ReviewApi/reviewApi.js";
import toast from "react-hot-toast";

///add review slice///
export const addReview = createAsyncThunk("addReview", async (data) => {
  try {
    const response = await addReviewApi(data);
    if (response.status == 200) {
      toast.success("Review added successfully");
      return response.data;
    } else {
      toast.error(response.response.data.error);
    }
  } catch (error) {
    throw error;
  }
});

///get review slice///
export const getReview = createAsyncThunk("getReview", async (data) => {
  try {
    const response = await getReviewApi(data);
    if (response.status == 200) {
      return response.data;
    } else {
      toast.error(response.response.data.error);
    }
  } catch (error) {
    throw error;
  }
});

///delete review slice///
export const DeleteReview = createAsyncThunk("DeleteReview", async (data) => {
  try {
    const response = await DeleteReviewApi(data);
    if (response.status == 200) {
      toast.success("review deleted successfully");
      return response.data;
    } else {
      toast.error(response.response.data.error);
    }
  } catch (error) {
    throw error;
  }
});

export const ReviewSlice = createSlice({
  name: "ReviewSlice",
  initialState: {
    productReviewData: [],
    DeleteproductReviewData: [],
    GetproductReviewData: [],
    reviewLoading: false,
    getReviewLoading: false,
    DeleteReviewLoading: false,
    error: null,
   
   
   
   
  },

  extraReducers: (builder) => {
    /// Add product review ///
    builder
      .addCase(addReview.pending, (state) => {
        state.reviewLoading = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.reviewLoading = false;
        state.productReviewData = action.payload;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.reviewLoading = false;
        state.error = action.payload;
      })

      /// GEt product review ///
      .addCase(getReview.pending, (state) => {
        state.getReviewLoading = true;
      })
      .addCase(getReview.fulfilled, (state, action) => {
        state.getReviewLoading = false;
        state.GetproductReviewData = action.payload;
      })
      .addCase(getReview.rejected, (state, action) => {
        state.getReviewLoading = false;
        state.error = action.payload;
      })

      /// Delete product review ///
      .addCase(DeleteReview.pending, (state) => {
        state.DeleteReviewLoading = true;
      })
      .addCase(DeleteReview.fulfilled, (state, action) => {
        state.DeleteReviewLoading = false;
        state.DeleteproductReviewData = action.payload;
      })
      .addCase(DeleteReview.rejected, (state, action) => {
        state.DeleteReviewLoading = false;
        state.error = action.payload;
      });
  },
});
export default ReviewSlice.reducer