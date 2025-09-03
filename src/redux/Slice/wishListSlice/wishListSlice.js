import toast from "react-hot-toast";
import { addToCartAPi, getCartAPi } from "../../../api/Cartapi/CartAPi";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addWishListAPi, deleteWishListAPi, getWishListAPi } from "../../../api/WislistApi/WishListAPi";

///add to wishlist//
export const addtoWishList = createAsyncThunk("addtoWishList", async (data) => {
  
    try {
        const response = await addWishListAPi(data)
        if (response.status == 200) {
            toast.success(response.data.message)
            return response.data
        } else {
            toast.error(response.response.data.error)
        }
    } catch (error) {
        throw error
    }
})
///get wishlist product///
export const getWishList = createAsyncThunk("getWishList", async (thunkApi) => {
    try {
        const response = await getWishListAPi()
        if (response.status == 200) {

            return response.data
        } else {
            return thunkApi.rejectWithValue("error")
        }
    } catch (error) {
        throw error
    }
})


///delete from wishlist//
export const deleteWishList = createAsyncThunk("deleteWishList", async (data) => {
   
    try {
        const response = await deleteWishListAPi(data)
        if (response.status == 200) {
            toast.success(response.data.message)
            return response.data
        } else {
            toast.error(response.response.data.error)
        }
    } catch (error) {
        throw error
    }
})


///create Action and reducer///

export const WishListSlice = createSlice({
    name: "WishListSlice",
    initialState: {
        addtoWishList: [],
        getWishListProduct: [],
        deleteWishListProduct:[],
        addToWishListLoading: false,
        getWishListLoading: false,
      
        deleteWishListLoading:false,
        error: null
    },
    reducers: {
        clearWishListData: (state) => {
           
            state.getWishListProduct = [];
        }
    },
    extraReducers: (builder) => {
        ////add wishlist reducer
        builder.addCase(addtoWishList.pending, (state) => {
            state.addToWishListLoading = true;
            })
            .addCase(addtoWishList.fulfilled, (state, action) => {
                state.addToWishListLoading = false;
                state.addtoCart = action.payload
            })

            .addCase(addtoWishList.rejected, (state, action) => {
                state.addToWishListLoading = false;
                state.error = action.payload
            })

            ///get wishlist reducer 
            .addCase(getWishList.pending, (state) => {
                state.getWishListLoading = true;
            })
            .addCase(getWishList.fulfilled, (state, action) => {
                state.getWishListLoading = false;
                state.getWishListProduct = action.payload
            })

            .addCase(getWishList.rejected, (state, action) => {
                state.getWishListLoading = false;
                state.error = action.payload
            })
            

            ///delete wishlist reducer 
            .addCase(deleteWishList.pending, (state) => {
                state.deleteWishListLoading = true;
            })
            .addCase(deleteWishList.fulfilled, (state, action) => {
                state.deleteWishListLoading = false;
                state.deleteWishListProduct = action.payload
            })

            .addCase(deleteWishList.rejected, (state, action) => {
                state.deleteWishListLoading = false;
                state.error = action.payload
            })
            
            
    }
})
export const { clearWishListData } = WishListSlice.actions;

export default WishListSlice.reducer