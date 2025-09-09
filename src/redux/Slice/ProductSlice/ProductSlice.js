import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import toast from "react-hot-toast";
import { AddproductApi, GetAllproductsApi, filterproductsApi, newarivalproductsApi, getSingleProductApi, UpdateproductApi, DeleteImageApi, deleteproductsApi, searchProductApi, getSimilarProductsApi, resetfilterproductsApi } from "../../../api/Productapi/Productapi";








///Admin add a product///

export const adminAddproduct = createAsyncThunk("adminAddproduct", async (data) => {
    try {
        const { productName, price, discount, quantity, description, brand, type, sizes, colors, files, categoryId, config } = data;
        console.log(data)

        const fromData = new FormData()
        fromData.append("productName", productName)
        fromData.append("price", price)
        fromData.append("discount", discount)
        fromData.append("quantity", quantity)
        fromData.append("description", description)
        fromData.append("brand", brand)
        fromData.append("type", type)

        sizes.forEach((size) => {
            fromData.append("sizes", size)
        })
        colors.forEach((color) => {
            fromData.append("colors", color)
        })
        files.forEach((file) => {
            fromData.append("files", file)
        })


        const response = await AddproductApi(fromData, categoryId, config)

        if (response.status === 200) {
            toast.success("product added sucessfully")
            return response.data

        }
        else if (response.response
            .status === 400) {
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

///Admin update a product//
export const adminUpdateproduct = createAsyncThunk("adminUpdateproduct", async (data) => {



    try {

        const { productName, price, discount, quantity, description, brand, type, sizes, colors, files, categoryId, config, id } = data;

        const fromData = new FormData()
        fromData.append("productName", productName)
        fromData.append("price", price)
        fromData.append("discount", discount)
        fromData.append("quantity", quantity)
        fromData.append("description", description)
        fromData.append("brand", brand)
        fromData.append("type", type)

        sizes.forEach((size) => {
            fromData.append("sizes", size)
        })
        colors.forEach((color) => {
            fromData.append("colors", color)
        })
        files.forEach((file) => {
            fromData.append("files", file)
        })





        const response = await UpdateproductApi(fromData, id, categoryId, config,)

        if (response.status === 200) {
            toast.success("product Updated sucessfully")
            return response.data

        }
        else if (response.response
            .status === 400) {
            toast.error(response.response.data.error)
            return response.data

        }
        else {
            toast.error(response.response.data.error)

        }
    } catch (error) {
        throw error
    }


})

///Admin delete images///
export const deleteImages = createAsyncThunk("deleteImages", async (data) => {

    try {
        // Call the API to delete the image
        const response = await DeleteImageApi(data);
        if (response.status === 200) {

            return response.data

        } else {

            toast.error("Failed to delete image");
        }
    } catch (error) {

        toast.error("Error deleting image");
    }

})


////Admin get all products//
export const adminGetProducts = createAsyncThunk("adminGetProducts", async (data) => {

    try {
        const response = await GetAllproductsApi(data)

        if (response.status === 200) {

            return response.data

        } else {

            toast.error(response.response.data.error)
        }
    } catch (error) {
        throw error
    }
})


////search Products////
export const searchProducts = createAsyncThunk("searchProducts", async (data) => {
    try {
        const response = await searchProductApi(data)
        return response.data


    } catch (error) {
        throw error
    }
})




////Admin delete products//
export const adminProductDelete = createAsyncThunk("adminProductDelete", async (data) => {

    try {
        const response = await deleteproductsApi(data)

        if (response.status === 200) {

            toast.success("product deleted sucessfully")
            return response.data

        } else {

            toast.error(response.response.data.error)
        }
    } catch (error) {
        throw error
    }
})

////filters products//
export const filterProducts = createAsyncThunk("filterProducts", async (data) => {

    try {
        const response = await filterproductsApi(data)

        if (response.status === 200) {

            return response.data

        } else {

            toast.error(response.response.data.error)
        }
    } catch (error) {
        throw error
    }
})



export const resetfilterProducts = createAsyncThunk("resetfilterProducts", async (data) => {
    try {
        const response = await resetfilterproductsApi(data);
        if (response.status === 200) {
            return response.data;
        } else {

            throw new Error(response.response.data.error);
            
        }
    } catch (error) {
        throw error;
    }
});

///newarivals products slice///
export const newarivalproduct = createAsyncThunk("newarivalproduct", async (data) => {
    try {

        const response = await newarivalproductsApi(data)
        if (response.status ===200) {
            return response.data
        }
        else {
            toast.error(response.response.data.error)
        }

    } catch (error) {
        throw error
    }
})


///get a single products slice///
export const getSingleProduct = createAsyncThunk("getSingleProduct", async (data) => {
    try {

        const response = await getSingleProductApi(data)
        if (response.status === 200) {
            return response.data
        }
        else {
            toast.error(response.response.data.error)
        }

    } catch (error) {
        throw error
    }
})


////get similar product//
export const getSimilarProducts = createAsyncThunk("getSimilarProducts", async (data) => {
    try {

        const response = await getSimilarProductsApi(data)
        if (response.status === 200) {
            return response.data
        }
        else {
            toast.error(response.response.data.error)
        }

    } catch (error) {
        throw error
    }
})






// create reducer and action//
export const ProductSlice = createSlice({
    name: "ProductSlice",
    initialState: {

        AddProducts: [],
        AllProducts: [],
        getsimilarproducts: [],
        filterproducts: [],
        resetFilterProductsData: [], // State property for reset filter data
        newArivalProduct: [],
        searchProductsData: [],

        productDetails: {},
        searchLoading: false,

        getsimilarproductsLoading: false,
        loading: false,
        productdetaillsLoading: false,
        error: null
    },


    extraReducers: (builder) => {







        ///Admin Add products
        builder.addCase(adminAddproduct.pending, (state) => {
            state.loading = true;
        })
            .addCase(adminAddproduct.fulfilled, (state, action) => {
                state.loading = false;
                state.AddProducts = action.payload
            })
            .addCase(adminAddproduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })


            ///Admin Get products
            .addCase(adminGetProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(adminGetProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.AllProducts = action.payload
            })
            .addCase(adminGetProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })


            ///Admin Update product
            .addCase(adminUpdateproduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(adminUpdateproduct.fulfilled, (state, action) => {
                state.loading = false;
                state.AllProducts = action.payload
            })
            .addCase(adminUpdateproduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })

            ///Admin delete product
            .addCase(adminProductDelete.pending, (state) => {
                state.loading = true;
            })
            .addCase(adminProductDelete.fulfilled, (state, action) => {
                state.loading = false;
                state.AllProducts = action.payload
            })
            .addCase(adminProductDelete.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })

            ///Admin deleteImages for product
            .addCase(deleteImages.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteImages.fulfilled, (state, action) => {
                state.loading = false;
                state.AllProducts = action.payload
            })
            .addCase(deleteImages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })

         




            ///filters products
            .addCase(filterProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(filterProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.filterproducts = action.payload
            })
            .addCase(filterProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })

            ///resetfilters products

            .addCase(resetfilterProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(resetfilterProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.resetFilterProductsData = action.payload;
                state.filterproducts = action.payload; // Reset filter products with the data received
            })
            .addCase(resetfilterProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })



            ///newarivals products
            .addCase(newarivalproduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(newarivalproduct.fulfilled, (state, action) => {
                state.loading = false;
                state.newArivalProduct = action.payload
            })
            .addCase(newarivalproduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })

            ///single  product details///
            .addCase(getSingleProduct.pending, (state) => {
                state.productdetaillsLoading = true;
            })
            .addCase(getSingleProduct.fulfilled, (state, action) => {
                state.productdetaillsLoading = false;
                state.productDetails = action.payload
            })
            .addCase(getSingleProduct.rejected, (state, action) => {
                state.productdetaillsLoading = false;
                state.error = action.payload
            })

            ///similar products ///
            .addCase(getSimilarProducts.pending, (state) => {
                state.getsimilarproductsLoading = true;
            })
            .addCase(getSimilarProducts.fulfilled, (state, action) => {
                state.getsimilarproductsLoading = false;
                state.getsimilarproducts = action.payload; // Update state with similar products array
            })
            .addCase(getSimilarProducts.rejected, (state, action) => {
                state.getsimilarproductsLoading = false;
                state.error = action.payload;
            })

            ///search  products ///
            .addCase(searchProducts.pending, (state) => {
                state.searchLoading = true;
            })
            .addCase(searchProducts.fulfilled, (state, action) => {
                state.searchLoading = false;
                state.searchProductsData = action.payload
            })
            .addCase(searchProducts.rejected, (state, action) => {
                state.searchLoading = false;
                state.error = action.payload
            })

    }
})

export default ProductSlice.reducer