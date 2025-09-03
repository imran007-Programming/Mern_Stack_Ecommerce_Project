import toast from "react-hot-toast";
import {
  addToCartAPi,
  deleteCartApi,
  getCartAPi,
  deleteFullCartApi,
  deleteSingleCartApi,
} from "../../../api/Cartapi/CartAPi";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";

///add to cart//
// Add to Cart Thunk
export const addtoCart = createAsyncThunk(
  "addtoCart",
  async (data, { dispatch }) => {
    try {
      const response = await addToCartAPi(data);
      if (response.status == 200) {
        // Assuming response.data contains product image and name
        const { productImage, productName, price } =
          response.data.productDetails; // Adjust this based on your API's response
        console.log(response);
        // Custom toast with product image, name, and buttons
        toast.custom((t) => (
          <div className="toast-container flex items-center bg-white p-4 rounded-lg shadow-md w-72">
            <img
              src={productImage[0]}
              alt={productName}
              className="w-12 h-12 mr-3 "
            />
            <div className="flex flex-col">
              <span className="font-semibold">
                {productName.length > 20
                  ? productName.substring(0, 50)
                  : productName}
              </span>

              <span className="text-sm text-gray-500">${price}</span>
              <div className="flex space-x-2 mt-2">
                <Link to="/Viewcart">
                  <button
                    // onClick={() => {
                    //   toast.dismiss(t.id); // Dismiss the toast
                    //   // Navigate to View Cart page (or any other action)
                    // }}
                    className="bg-black text-white p-2 uppercase text-sm "
                  >
                    View Cart
                  </button>
                </Link>
                <button
                  onClick={() => {
                    toast.dismiss(t.id); // Dismiss the toast
                    // Implement any additional action for dismissing
                  }}
                  className="bg-gray-600 text-white p-2 uppercase text-sm"
                >
                  CheckOut
                </button>
              </div>
            </div>
          </div>
        ),
    
     {
        duration:1000
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

///create Action and reducer///

export const CartSlice = createSlice({
  name: "CartSlice",
  initialState: {
    addtoCart: [],
    getCartProduct: [],
    deleteCartProduct: [],
    deleteCartLoading: false,
    deleteAllquantityCartProduct: [],
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
      });
  },
});
export const { clearCartData } = CartSlice.actions;

export default CartSlice.reducer;
