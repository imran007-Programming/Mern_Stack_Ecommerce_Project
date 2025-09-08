import { BASE_URL } from "../Helper";
import { commonrequest } from "../Commonrequest";



// Add order Api//

export const orderApi = async (data) => {


  return await commonrequest("POST", `${BASE_URL}/order/api/confirmorder
`, data,"" , "user")
}




















