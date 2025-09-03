import { commonrequest } from "../Commonrequest"
import { BASE_URL } from "../Helper"

///Add a review///
export const addReviewApi = async (data,header) => {
    return await commonrequest("POST", `${BASE_URL}/product/api/reviewproduct/${data.productid}`, data, header, "user")
  }
  ///GEt the product review///
  export const getReviewApi = async (data,header) => {
    return await commonrequest("GET", `${BASE_URL}/product/api/getproductreview/${data.productid}`, data, header, "user")
  }
  ///Delete the product review///
  export const DeleteReviewApi = async (data,header) => {
    return await commonrequest("DELETE", `${BASE_URL}/product/api/deleteproductreview/${data.reviewid}`, data, header, "user")
  }
  