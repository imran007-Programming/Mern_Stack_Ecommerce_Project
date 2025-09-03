import { BASE_URL } from "../Helper";
import { commonrequest } from "../Commonrequest";

// user Register  APi
export const userRegisterApi = async (data, header) => {
    return await commonrequest("POST", `${BASE_URL}/userauth/api/register`, data, header, "user"
    );
};
// user Login  APi
export const userLoginApi = async (data, header) => {
    return await commonrequest("POST", `${BASE_URL}/userauth/api/login`, data, header, "user"
    );
};
// user LoggedIn  APi
export const userLoggedInApi = async (header) => {
    return await commonrequest("GET", `${BASE_URL}/userauth/api/userverify`, "", header, "user"
    );
};
// user Logout  APi
export const userLogoutApi = async (header) => {
    return await commonrequest("GET", `${BASE_URL}/userauth/api/logout`, "", header, "user"
    );
};
// user forgot password   APi
export const userForgotPasswordApi = async (data, header) => {
    return await commonrequest("POST", `${BASE_URL}/userauth/api/forgotpassword`, data, header, "user"
    );
};
// user validity for reset paswword  APi
export const userForgotPasswordValidityApi = async (data, header) => {
    return await commonrequest("GET", `${BASE_URL}/userauth/api/forgotpassword/${data.id}/${data.token}`, "", header, "user"
    );
};


// user reset password  APi
export const userForgotPasswordFinalApi = async (data, header) => {
    return await commonrequest("PUT", `${BASE_URL}/userauth/api/resetpassword/${data.id}/${data.token}`, data, header, "user"
    );
};