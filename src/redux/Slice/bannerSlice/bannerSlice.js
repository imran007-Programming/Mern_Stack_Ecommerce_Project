//Admin add a product///

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetBannerApi, addBannerAPi } from "../../../api/Productapi/Productapi";
import toast from "react-hot-toast";

export const adminAddBanner = createAsyncThunk("adminAddproduct", async (data,config) => {
    try {
        const { files } = data;


        const fromData = new FormData()

        files.forEach((file) => {
            fromData.append("files", file)
        })


        const response = await addBannerAPi(fromData,config)

        if (response.status == 200) {
            toast.success("Banner added sucessfully")
            return response.data

        }
        else if (response.response
            .status == 400) {
            toast.error(response.response.data.error)
            return response

        }
        else {
            toast.error(response.response.data.error)

        }
    } catch (error) {
        throw error
    }


})
export const GetBanner = createAsyncThunk("GetBanner", async (thunkApi) => {
    try {
        const response = await GetBannerApi()

        if (response.status == 200) {

            return response.data

        } else {

            return thunkApi.rejectWithValue("error")
        }
    } catch (error) {
        throw error
    }

})



// create reducer and action//
export const BannerSlice = createSlice({
    name: "BannerSlice",
    initialState: {

        AddBannerImages: [],
        GetBannerImages: [],
        loading: false,
        error: null
    },

    extraReducers: (builder) => {

        ///Admin Add Banner
        builder.addCase(adminAddBanner.pending, (state) => {
            state.loading = true;
        })
            .addCase(adminAddBanner.fulfilled, (state, action) => {
                state.loading = false;
                state.AddBannerImages = action.payload
            })
            .addCase(adminAddBanner.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
        ///get Banner
        .addCase(GetBanner.pending, (state) => {
            state.loading = true;
        })
            .addCase(GetBanner.fulfilled, (state, action) => {
                state.loading = false;
                state.GetBannerImages = action.payload
            })
            .addCase(GetBanner.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
    }
})
export default BannerSlice.reducer










