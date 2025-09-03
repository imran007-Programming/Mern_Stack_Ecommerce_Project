import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
    userForgotPasswordApi,
    userForgotPasswordFinalApi,
    userForgotPasswordValidityApi,
    userLoggedInApi,
    userLoginApi,
    userLogoutApi,
    userPasswordResetApi,
    userRegisterApi,
} from "../../../api/Userapi/userAPi";

///user Register Slice
export const userRegister = createAsyncThunk("userRegister", async (data) => {
    try {
        const {
            firstname,
            lastname,
            password,
            confirmPassword,
            email,
            file,
            config,
        } = data;

        const fromData = new FormData();
        fromData.append("firstname", firstname);
        fromData.append("lastname", lastname);
        fromData.append("email", email);
        fromData.append("password", password);
        fromData.append("confirmPassword", confirmPassword);
        fromData.append("file", file);
      
        const response = await userRegisterApi(fromData, config);

        if (response.status == 200) {
            toast.success("Register sucessfully");

            return response.data;
        } else if (response.response.status == 400) {
            toast.error(response.response.data.error);
            return response;
        } else {
            toast.error(response.response.data.error);
        }
    } catch (error) {
        throw error;
    }
});

///user Login Slice
export const userLogin = createAsyncThunk("userLogin", async (data) => {
    try {
        const response = await userLoginApi(data);

        if (response.status == 200) {
            toast.success("User Sucessfully Login");
            localStorage.setItem("usertoken", response.data.token);
            return response.data;
        } else if (response.response.status == 400) {
            toast.error(response.response.data.error);
            return response;
        } else {
            toast.error(response.response.data.error);
        }
    } catch (error) {
        throw error;
    }
});

// user LoggedIn Slice
export const userLoggedIn = createAsyncThunk(
    "userLoggedIn",
    async (thunkApi) => {
        try {
            const response = await userLoggedInApi();

            if (response.status == 200) {
                return response.data;
            } else {
                return thunkApi.rejectWithValue("error");
            }
        } catch (error) {
            throw error;
        }
    }
);

///user Logout Slice
export const userLogout = createAsyncThunk("userLogout", async (thunkApi) => {
    try {
        const response = await userLogoutApi();

        if (response.status == 200) {
            toast.success("Logout Sucessfully");
            localStorage.removeItem("usertoken");

            return response.data;
        } else {
            toast.success("Logout Sucessfully");
            localStorage.removeItem("usertoken");

            return thunkApi.rejectWithValue("error");
        }
    } catch (error) {
        throw error;
    }
});

///user ForgotPassword reset Slice
export const userForgotPassword = createAsyncThunk("userForgotPassword", async (data) => {
    try {
        const response = await userForgotPasswordApi(data);

        if (response.status == 200) {
            toast.success("password reset link send in your email");

            return response.data;
        } else {
            toast.error("invalid details");

            return response.data;
        }
    } catch (error) {
        throw error;
    }
}
);


///user validity for Password reset Slice
export const userForgotPasswordValidity = createAsyncThunk("userForgotPasswordValidity", async (data) => {
    try {
        const response = await userForgotPasswordValidityApi(data);

        if (response.status == 200) {


            return response.data;
        } else {
            toast.error("token expired please try again");

            return response.data;
        }
    } catch (error) {
        throw error;
    }
}
);

///user ForgotPassword reset Slice
export const userForgotPasswordFinal = createAsyncThunk("userForgotPasswordFinal", async (data) => {
  
    try {
        const response = await userForgotPasswordFinalApi(data);

        if (response.status == 200) {
            toast.success("password chnage Sucessfully,login with your new password")

            return response.data;
        } else {
            toast.error("token expired please try again");

            return response.data;
        }
    } catch (error) {
        throw error;
    }
}
);

// create reducer and action//
export const UserSlice = createSlice({
    name: "UserSlice",
    initialState: {
        userRegisterData: [],
        userLoginData: [],
        userLoggedInData: [],
        userLogoutData: [],
        userForgotPasswordData: [],
        userForgotPasswordValidityData: [],
        userForgotPasswordFinalData: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearuserLogInData: (state) => {
            state.userLoginData = [];
        },
        clearuserLoggedInData: (state) => {
            state.userLoggedInData = [];
        }
    },

    extraReducers: (builder) => {
        ///user Register//
        builder
            .addCase(userRegister.pending, (state) => {
                state.loading = true;
            })
            .addCase(userRegister.fulfilled, (state, action) => {
                state.loading = false;
                state.userRegisterData = action.payload;
            })
            .addCase(userRegister.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            ////USer LOgin///
            .addCase(userLogin.pending, (state) => {
                state.loading = true;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.userLoginData = action.payload;
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            ////User LoggedIn////
            .addCase(userLoggedIn.pending, (state) => {
                state.loading = true;
            })
            .addCase(userLoggedIn.fulfilled, (state, action) => {
                state.loading = false;
                state.userLoggedInData = [action.payload];
            })
            .addCase(userLoggedIn.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            ////User Logout////
            .addCase(userLogout.pending, (state) => {
                state.loading = true;
            })
            .addCase(userLogout.fulfilled, (state, action) => {
                state.loading = false;
                state.userLogoutData = [action.payload];
              
            })
            .addCase(userLogout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            ////User Forgot password////
            .addCase(userForgotPassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(userForgotPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.userForgotPasswordData = action.payload;
            })
            .addCase(userForgotPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            ////User validity for Forgot password////
            .addCase(userForgotPasswordValidity.pending, (state) => {
                state.loading = true;
            })
            .addCase(userForgotPasswordValidity.fulfilled, (state, action) => {
                state.loading = false;
                state.userForgotPasswordValidityData = action.payload;
            })
            .addCase(userForgotPasswordValidity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            ////User validity for Forgot password////
            .addCase(userForgotPasswordFinal.pending, (state) => {
                state.loading = true;
            })
            .addCase(userForgotPasswordFinal.fulfilled, (state, action) => {
                state.loading = false;
                state.userForgotPasswordFinalData = action.payload;
            })
            .addCase(userForgotPasswordFinal.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


    },
});
export const { clearuserLoggedInData,clearuserLogInData} = UserSlice.actions;
export default UserSlice.reducer;
