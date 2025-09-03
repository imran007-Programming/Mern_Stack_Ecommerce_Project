import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { adminLogin ,adminLoggedOut, AdminLoggedInApi, adminRegisterApi } from "../../../api/Adminapi/Adminapi";
import toast from "react-hot-toast";

////Admin login Slice//
export  const AdminauthLogin=createAsyncThunk("adminlogin",async(data)=>{
  
    try {
        const response=await adminLogin(data)
        if(response.status==200){
            toast.success("Admin login sucessfully")
            localStorage.setItem("admintoken",response.data.token)
            return response.data
        }else{
            toast.error(response.response.data.error)
        }
       
    } catch (error) {
        throw error
    }
})

///Admin register Slice///
export const adminRegisterSlice = createAsyncThunk("adminRegisterSlice", async (data) => {
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
       
        const response = await adminRegisterApi(fromData, config);

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






// Admin LoggedIn Slice
export const AdminLoggedIn = createAsyncThunk("AdminLoggedIn",async(thunkApi)=>{
    try {
        const response = await AdminLoggedInApi();
      
        if(response.status == 200){
            return response.data
        }else{
            return thunkApi.rejectWithValue("error");
        }
    } catch (error) {
        throw error;
    }
})

//admin loggedout Slice//
export const adminLoggedout=createAsyncThunk("AdminLoggedOut",async(thunkApi)=>{
    try {
       const response= await adminLoggedOut()
       // ("response",response)
       if(response.state==200){
           toast.success("Admin Logout Sucessfully")
           localStorage.removeItem("admintoken")
           return response.data
           
       }else{
           toast.success("Admin Logout Sucessfully")
           localStorage.removeItem("admintoken")
           return thunkApi.rejectWithValue("error")
       }
    } catch (error) {
        throw error
    }
   })
   



// create reducer and action//
export const Adminslice=createSlice({
    name:"AdminSlice",
    initialState:{
        adminLogin:[],
        adminRegisterData: [],
        adminLoggedINData:[],
        adminLoggedOut:[],
        loading:false,
        error:null
    },

    reducers: {
        clearadminLogInData: (state) => {
            state.adminLogin = [];
        },
        clearadminLoggedINData: (state) => {
            state.adminLoggedINData = [];
        }
    },





    extraReducers:(builder)=>{
        ///Admin login
        builder.addCase(AdminauthLogin.pending,(state)=>{
            state.loading=true;
        })
        .addCase(AdminauthLogin.fulfilled,(state,action)=>{
            state.loading=false;
            state.adminLogin=action.payload
        })
        .addCase(AdminauthLogin.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
        ////  ///admin Register//
        .addCase(adminRegisterSlice.pending, (state) => {
            state.loading = true;
        })
        .addCase(adminRegisterSlice.fulfilled, (state, action) => {
            state.loading = false;
            state.adminRegisterData = action.payload;
        })
        .addCase(adminRegisterSlice.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // ///Admin Verify///
        .addCase(AdminLoggedIn.pending,(state)=>{
            state.loading=true;
        })
        .addCase(AdminLoggedIn.fulfilled,(state,action)=>{
            state.loading=false;
            state.adminLoggedINData=[action.payload]
        })
        .addCase(AdminLoggedIn.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
        // ///Admin Logout///
        .addCase(adminLoggedout.pending,(state)=>{
            state.loading=true;
        })
        .addCase(adminLoggedout.fulfilled,(state,action)=>{
            state.loading=false;
            state.adminLoggedOut=[action.payload]
            state.adminLoggedINData=[]
        })
        .addCase(adminLoggedout.rejected,(state,action)=>{
            state.loading=false;
            state.adminLoggedINData=[]
            state.error=action.payload
        })
    }
})
export const { clearadminLogInData,clearadminLoggedINData} = Adminslice.actions;
export default Adminslice.reducer