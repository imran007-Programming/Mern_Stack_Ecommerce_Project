import { commonrequest } from "../Commonrequest"
import { BASE_URL } from "../Helper"


///add to Wishlist prodct api///
export const addWishListAPi = async (data, header) => {
  
    return await commonrequest("POST", `${BASE_URL}/wishlist/api/addtowishlist/${data.productid}`, data, header, "user")

}
///get Wishlist product api
export const getWishListAPi = async (data, header) => {
    return await commonrequest("GET", `${BASE_URL}/wishlist/api/getwishlist`, "", header, "user")

}
///Delete cart product api
export const deleteWishListAPi = async (data, header) => {
  
    return await commonrequest("DELETE", `${BASE_URL}/wishlist/api/deleteitemfromwishlist/${data.productid}`,data, header, "user")

}