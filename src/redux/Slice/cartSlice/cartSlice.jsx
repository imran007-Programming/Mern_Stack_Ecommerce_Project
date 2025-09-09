import toast from "react-hot-toast";

import {
  addToCartAPi,
  getCartAPi,
  deleteFullCartApi,
  deleteSingleCartApi,
  emptyFullCartApi,
} from "../../../api/Cartapi/CartAPi";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import CustomToast from "../../../Components/Share/customToast";

///add to cart//
// Add to Cart Thunk
export const addtoCart = createAsyncThunk(
  "addtoCart",
  async (data, { dispatch }) => {
   
    try {
      const response = await addToCartAPi(data);
      if (response.status == 200) {
         
        const { productImage, productName, price } =
          response.data.productDetails;

        
        toast.custom(
          (t) => (
            <CustomToast productImage={productImage} productName={productName} price={price} t={t} />
            
          ),
          {
            duration: Infinity, 
          }
        );

        return response.data;
      } else {
        toast.error(response.response.data.error);
      }
    } catch (error) {
      throw error;
    }
  }
);

export const getCart = createAsyncThunk("getCart", async (thunkApi) => {
  try {
    const response = await getCartAPi();
    if (response.status == 200) {
      return response.data;
    } else {
      return thunkApi.rejectWithValue("error");
    }
  } catch (error) {
    throw error;
  }
});

///delete cart product///
export const deleteCart = createAsyncThunk("deleteCart", async (data) => {
  try {
    const response = await deleteSingleCartApi(data);
    if (response.status == 200) {
      toast.success(response.data.message);
      return response.data;
    } else {
      toast.error(response.response.data.error);
    }
  } catch (error) {
    throw error;
  }
});

///delete fullquantity cart product///
export const deletefulquantityCart = createAsyncThunk(
  "deletefulquantityCart",
  async (data) => {
    try {
      const response = await deleteFullCartApi(data);
      if (response.status == 200) {
        return response.data;
      } else {
        toast.error(response.response.data.error);
      }
    } catch (error) {
      throw error;
    }
  }
);
///delete fullquantity cart product///
export const emptyFullquantityCart = createAsyncThunk(
  "emptyFullquantityCart",
  async (data) => {
    try {
      const response = await emptyFullCartApi(data);
      if (response.status == 200) {
        return response.data;
      } else {
        toast.error(response.response.data.error);
      }
    } catch (error) {
      throw error;
    }
  }
);




///create Action and reducer///

export const CartSlice = createSlice({
  name: "CartSlice",
  initialState: {
    addtoCart: [],
    getCartProduct: [],
    deleteCartProduct: [],
    deleteCartLoading: false,
    deleteAllquantityCartProduct: [],
    emptyCartProduct: [],

    emptyCartLoading: false,
    deleteAllquantityCartLoading: false,
    addToCartLoading: false,
    getCartLoading: false,
    error: null,
  },
  reducers: {
    clearCartData: (state) => {
      state.getCartProduct = [];
    },
  },
  extraReducers: (builder) => {
    ////add cart
    builder
      .addCase(addtoCart.pending, (state) => {
        state.addToCartLoading = true;
      })
      .addCase(addtoCart.fulfilled, (state, action) => {
        state.addToCartLoading = false;
        state.addtoCart = action.payload;
      })

      .addCase(addtoCart.rejected, (state, action) => {
        state.addToCartLoading = false;
        state.error = action.payload;
      })

      ///get cart product
      .addCase(getCart.pending, (state) => {
        state.getCartLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.getCartLoading = false;
        state.getCartProduct = action.payload;
      })

      .addCase(getCart.rejected, (state, action) => {
        state.getCartLoading = false;
        state.error = action.payload;
      })

      ///delete cart product
      .addCase(deleteCart.pending, (state) => {
        state.deleteCartLoading = true;
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.deleteCartLoading = false;
        state.deleteCartProduct = action.payload;
      })

      .addCase(deleteCart.rejected, (state, action) => {
        state.deleteCartLoading = false;
        state.error = action.payload;
      })

      ///delete  cart product with all quantity
      .addCase(deletefulquantityCart.pending, (state) => {
        state.deleteAllquantityCartLoading = true;
      })
      .addCase(deletefulquantityCart.fulfilled, (state, action) => {
        state.deleteAllquantityCartLoading = false;
        state.deleteAllquantityCartProduct = action.payload;
      })

      .addCase(deletefulquantityCart.rejected, (state, action) => {
        state.deleteAllquantityCartLoading = false;
        state.error = action.payload;
      })

      ///empty  cart product with all quantity
      .addCase(emptyFullquantityCart.pending, (state) => {
        state.emptyCartLoading = true;
      })
      .addCase(emptyFullquantityCart.fulfilled, (state, action) => {
        state.emptyCartLoading = false;
        state.emptyCartProduct = action.payload;
      })

      .addCase(emptyFullquantityCart.rejected, (state, action) => {
        state.emptyCartLoading = false;
        state.error = action.payload;
      });
  },
});
export const { clearCartData } = CartSlice.actions;

export default CartSlice.reducer;
