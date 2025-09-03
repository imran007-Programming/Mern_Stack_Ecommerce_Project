import { configureStore } from "@reduxjs/toolkit"
import Adminslice from "../Slice/adminAuthslice/adminAuthslice"
import ProductSlice from "../Slice/ProductSlice/ProductSlice"
import categorySlice from "../Slice/categorySlice/categorySlice"
import brandSlice from "../Slice/brandSlice/brandSlice"
import BannerSlice from "../Slice/bannerSlice/bannerSlice"
import userAuthSlice from "../Slice/Userauthslice/userAuthSlice"
import cartSlice from "../Slice/cartSlice/cartSlice"
import ReviewSlice from "../Slice/reviewSlice/ReviewSlice"
import wishListSlice from "../Slice/wishListSlice/wishListSlice"





export const store = configureStore({
    reducer: {
        Admin: Adminslice,
        products: ProductSlice,
        category: categorySlice,
        brand: brandSlice,
        banner: BannerSlice,
        user: userAuthSlice,
        cart: cartSlice,
        wishlist: wishListSlice,
        reviews: ReviewSlice,
    },
    devTools: process.env.NODE_ENV !== 'production' 
})