import { commonrequest } from "../Commonrequest"
import { BASE_URL } from "../Helper"


///add to cart prodct api///
export const addToCartAPi = async (data, header) => {
   
    return await commonrequest("POST", `${BASE_URL}/carts/api/addtocart/${data.productid}`, data, header, "user")
   

}
///get cart product api
export const getCartAPi = async (data, header) => {
    return await commonrequest("GET", `${BASE_URL}/carts/api/getcart`, "", header, "user")

}
///delete singlequantitycart product api
export const deleteSingleCartApi = async (data, header) => {
   
    return await commonrequest("DELETE", `${BASE_URL}/carts/api/deleteitemfromcart/${data.productid}`, data, header, "user")

}
///delete fullquantaty cart product api
export const deleteFullCartApi = async (data, header) => {
    return await commonrequest("DELETE", `${BASE_URL}/carts/api/removeallitemsfromcart/${data.productid}`, data, header, "user")

}