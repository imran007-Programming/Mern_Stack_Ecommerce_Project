import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import toast from "react-hot-toast";
import {
    GetCategoryApi,
    addCategoryApi,
} from "../../../api/Productapi/Productapi";

export const adminAddCategory = createAsyncThunk(
    "adminAddCategory",
    async (data) => {
        try {
            const response = await addCategoryApi(data.formdata, data.config);

            if (response.status == 200) {
                toast.success("Category added sucessfully");

                return response.data;
            } else {
                toast.error(response.response.data.error);
            }
        } catch (error) {
            throw error;
        }
    }
);

// Admin get Category slice

export const adminGetCategory = createAsyncThunk(
    "adminGetCategory",
    async (thunkApi) => {
        try {
            const response = await GetCategoryApi();

            if (response.status == 200) {
                return response.data;
            } else {
                return thunkApi.rejectWithValue("error");
            }
        } catch (error) {
            throw error;
        }
    }
);

export const CategorySlice = createSlice({
    name: "CategorySlice",
    initialState: {
        CategoryData: [],

        AddCategoryData: [],

        loading: false,
        error: null,
    },

    extraReducers: (builder) => {
        ///Admin Add category
        builder
            .addCase(adminAddCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(adminAddCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.AddCategoryData = action.payload;
            })
            .addCase(adminAddCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            ///Admin Get category
            .addCase(adminGetCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(adminGetCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.CategoryData = action.payload;
            })
            .addCase(adminGetCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

           
    },
});
export default CategorySlice.reducer;
