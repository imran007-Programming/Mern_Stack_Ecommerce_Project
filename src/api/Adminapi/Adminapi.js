import {BASE_URL} from "../Helper"
import { commonrequest } from "../Commonrequest"

// admin api register
export const adminRegisterApi=async(data,header)=>{
   
   return await commonrequest("POST",`${BASE_URL}/adminauth/api/register`,data,header,"admin")
}





// admin api Login
export const adminLogin=async(data,header)=>{
   return await commonrequest("POST",`${BASE_URL}/adminauth/api/login`,data,header,"admin")
}
// admin api verify
export const AdminLoggedInApi=async(header)=>{
   return await commonrequest("GET",`${BASE_URL}/adminauth/api/adminverify`,"",header,"admin")
}
// admin api Logout 
export const adminLoggedOut=async(header)=>{
   return await commonrequest("GET",`${BASE_URL}/adminauth/api/logout`,"",header,"admin")
}
