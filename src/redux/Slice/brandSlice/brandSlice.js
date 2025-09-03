import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import toast from "react-hot-toast";
import { GetBrandApi, addBrandApi } from "../../../api/Productapi/Productapi";

export const adminGetBrand = createAsyncThunk("adminGetBrand", async (thunkApi) => {
    try {
        const response = await GetBrandApi()

        if (response.status == 200) {

            return response.data

        } else {

            return thunkApi.rejectWithValue("error")
        }
    } catch (error) {
        throw error
    }
})
////Admin Add brand Slice//
export const adminAddBrand = createAsyncThunk("adminAddBrand", async (data) => {

    try {
        const response = await addBrandApi(data)

        if (response.status == 200) {
            toast.success("Brand added sucessfully")

            return response.data
        } else {
            toast.error(response.response.data.error)
        }

    } catch (error) {
        throw error
    }
})

// create reducer and action//
export const BrandSlice = createSlice({
    name: "BrandSlice",
    initialState: {
       
        GetallBrand:[],
        AddallBrand:[],
        loading: false,
        error: null
    },
    
    extraReducers: (builder) => {
       

            ///Admin Get Brand
            builder.addCase(adminGetBrand.pending, (state) => {
                state.loading = true;
            })
            .addCase(adminGetBrand.fulfilled, (state, action) => {
                state.loading = false;
                state.GetallBrand = action.payload
            })
            .addCase(adminGetBrand.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })

            ///Admin Add Brand
            .addCase(adminAddBrand.pending, (state) => {
                state.loading = true;
            })
            .addCase(adminAddBrand.fulfilled, (state, action) => {
                state.loading = false;
                state.AddallBrand = action.payload
            })
            .addCase(adminAddBrand.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })






        

    }
})
export default BrandSlice.reducer