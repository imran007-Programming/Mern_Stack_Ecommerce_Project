import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import toast from "react-hot-toast";
import { orderApi } from "../../../api/orderapi/Orderapi";
import { error } from "ajv/dist/vocabularies/applicator/dependencies";
// import { AddproductApi, GetAllproductsApi, filterproductsApi, newarivalproductsApi, getSingleProductApi, UpdateproductApi, DeleteImageApi, deleteproductsApi, searchProductApi, getSimilarProductsApi, resetfilterproductsApi } from "../../../api/Productapi/Productapi";

///Admin add a product///

export const confirmAOrder = createAsyncThunk("confirmAOrder", async (data) => {
  try {
    const response = await orderApi(data);

    if (response.status === 200) {
      
      return response.data;
    } else if (response.response.status === 400) {
      return response;
    } else {
         return response;
    }
  } catch (error) {
    throw error;
  }
});

// create reducer and action//
export const OrderSlice = createSlice({
  name: "OrderSlice",
  initialState: {
    AddOrders: [],
    loading: false,
    error: null,
    // AllProducts: [],
    // getsimilarproducts: [],
    // filterproducts: [],

    // productDetails: {},
    // searchLoading: false,

    // getsimilarproductsLoading: false,

    // productdetaillsLoading: false,
  },

  extraReducers: (builder) => {
    ///Admin Add products
    builder
      .addCase(confirmAOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(confirmAOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.AddOrders = action.payload;
      })
      .addCase(confirmAOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //   ///Admin Get products
    //   .addCase(adminGetProducts.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(adminGetProducts.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.AllProducts = action.payload;
    //   })
    //   .addCase(adminGetProducts.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   })

    //   ///Admin Update product
    //   .addCase(adminUpdateproduct.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(adminUpdateproduct.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.AllProducts = action.payload;
    //   })
    //   .addCase(adminUpdateproduct.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   })

    //   ///Admin delete product
    //   .addCase(adminProductDelete.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(adminProductDelete.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.AllProducts = action.payload;
    //   })
    //   .addCase(adminProductDelete.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   })

    //   ///Admin deleteImages for product
    //   .addCase(deleteImages.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(deleteImages.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.AllProducts = action.payload;
    //   })
    //   .addCase(deleteImages.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   })

    //   ///filters products
    //   .addCase(filterProducts.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(filterProducts.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.filterproducts = action.payload;
    //   })
    //   .addCase(filterProducts.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   })

    //   ///resetfilters products

    //   .addCase(resetfilterProducts.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(resetfilterProducts.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.resetFilterProductsData = action.payload;
    //     state.filterproducts = action.payload; // Reset filter products with the data received
    //   })
    //   .addCase(resetfilterProducts.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   })

    //   ///newarivals products
    //   .addCase(newarivalproduct.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(newarivalproduct.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.newArivalProduct = action.payload;
    //   })
    //   .addCase(newarivalproduct.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   })

    //   ///single  product details///
    //   .addCase(getSingleProduct.pending, (state) => {
    //     state.productdetaillsLoading = true;
    //   })
    //   .addCase(getSingleProduct.fulfilled, (state, action) => {
    //     state.productdetaillsLoading = false;
    //     state.productDetails = action.payload;
    //   })
    //   .addCase(getSingleProduct.rejected, (state, action) => {
    //     state.productdetaillsLoading = false;
    //     state.error = action.payload;
    //   })

    //   ///similar products ///
    //   .addCase(getSimilarProducts.pending, (state) => {
    //     state.getsimilarproductsLoading = true;
    //   })
    //   .addCase(getSimilarProducts.fulfilled, (state, action) => {
    //     state.getsimilarproductsLoading = false;
    //     state.getsimilarproducts = action.payload; // Update state with similar products array
    //   })
    //   .addCase(getSimilarProducts.rejected, (state, action) => {
    //     state.getsimilarproductsLoading = false;
    //     state.error = action.payload;
    //   })

    //   ///search  products ///
    //   .addCase(searchProducts.pending, (state) => {
    //     state.searchLoading = true;
    //   })
    //   .addCase(searchProducts.fulfilled, (state, action) => {
    //     state.searchLoading = false;
    //     state.searchProductsData = action.payload;
    //   })
    //   .addCase(searchProducts.rejected, (state, action) => {
    //     state.searchLoading = false;
    //     state.error = action.payload;
    //   });
  },
});

export default OrderSlice.reducer;
