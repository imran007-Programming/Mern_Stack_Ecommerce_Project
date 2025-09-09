// ADD Banner  Api//

import { commonrequest } from "../Commonrequest"
import { BASE_URL } from "../Helper"

export const addBannerAPi = async (data, header) => {
  return await commonrequest("POST", `${BASE_URL}/product/api/addbannerimage`, data, header, "admin")
}

// GEt Banner  Api//

export const GetBannerApi = async (header) => {
  return await commonrequest("GET", `${BASE_URL}/product/api/getbannerimages`, "", header, "admin")
}
// Delete Banner  Api//

export const DeleteBannerImageApi = async (data,header) => {
    console.log(data)
  return await commonrequest("DELETE", `${BASE_URL}/product/api/deletebannerImages`, data, header, "admin")
}
