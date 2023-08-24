import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios"



export const registerUser = createAsyncThunk("auth/signup", async (userData, thunkAPI) => {
        try{
            const response = await axios.post("/user/signup",userData);
           // console.log(response);
            if(response.data){
                //console.log(response.data);
                return response.data;
            }
        }catch(error){
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const loginUser = createAsyncThunk("user/login", async (userData, thunkAPI) => {
    try{
        const response = await axios.post("/user/login",userData);
        if(response.data){
            // console.log(response.data);
            return response.data;
        }
        // return response.data;
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
}
)


export const logoutUser = createAsyncThunk("user/logout", async ( thunkAPI) => {
    try{
        const response = await axios.get("/user/logout",customer);
        if(response.data){
            // console.log(response.data);
            return response.data;
        }
        // return response.data;
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
}
)


export const forgotPassword = createAsyncThunk("forgot/password", async (email, thunkAPI) => {
    console.log("from forgot passwotd redux",email);
    try{
        const response = await axios.post("/user/forgot-password",email);
        if(response.data){
            console.log(response.data);
            return response.data;
        }
        // return response.data;
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
}
)


export const resetPassword = createAsyncThunk("reset/password", async ({password,resetToken}, thunkAPI) => {
    //console.log(">>>>>>>>>>>>>>",password, resetToken);
    try{
        const response = await axios.post(`/user/resetPassword/${resetToken}`,{password});
        if(response.data){
            // console.log(response.data);
            return response.data;
        }
        // return response.data;
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
}
)


export const updateUser = createAsyncThunk("update/user", async (userData, thunkAPI) => {
    try{
        const response = await axios.patch(`/user/update/${customer._id}`,userData);
        if(response.data){
            // console.log(response.data);
            return response.data;
        }
        // return response.data;
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
}
)



export const getWishList = createAsyncThunk("user/getwishlist", async (thunkAPI) => {
    try{
        const response = await axios.get("/user/getwishlist",customer);
        //console.log(response.data);
        if(response){
            
            return response.data
        }

        
    }catch(error){
        return thunkAPI.rejectWithValue(error)

    }
}
)


export const getCart = createAsyncThunk("get/cart", async (thunkAPI) => {
    try{
        const response = await axios.get("/user/getcart",customer);
        //console.log(response.data);
        if(response){
            return response.data
        }
    }catch(error){
        return thunkAPI.rejectWithValue(error.message)

    }
}
)

export const deleteCartProduct = createAsyncThunk("delete/cart", async (id,thunkAPI) => {
    try{
        const response = await axios.delete(`/user/deletecartproduct/${id}`,customer);
        console.log(response.data);
        if(response){
            
            return response.data
        }

        
    }catch(error){
        return thunkAPI.rejectWithValue(error.message)
    }
}
)



export const updateCartQuantity = createAsyncThunk("update/cart/quantity", async (cartDetails,thunkAPI) => {

    try{
        const response = await axios.patch(`/user/updatecartquantity/${cartDetails.cartProductId}/${cartDetails.quantity}`,customer);
        console.log(response.data);
        if(response){
            
            return response.data
        }

        
    }catch(error){
        return thunkAPI.rejectWithValue(error.message)
    }
}
)






export const createOrder = createAsyncThunk("create/order", async (orderDetails,thunkAPI) => {

    try{
        const response = await axios.post("/user/createorder",orderDetails,customer);
        //console.log(response.data);
        if(response){
            return response.data
        }
    }catch(error){
        return thunkAPI.rejectWithValue(error.message)

    }
}
)

export const getMyOrder = createAsyncThunk("get/myorder", async (orderDetails,thunkAPI) => {
    console.log(orderDetails);
    try{
        const response = await axios.get("/user/getmyorder",customer);
        console.log(response.data);
        if(response){
            return response.data
        }
    }catch(error){
        return thunkAPI.rejectWithValue(error.message)

    }
}
)

const getUserFromLS = localStorage.getItem("user")
? JSON.parse(localStorage.getItem("user"))
: null;

const customer = (getUserFromLS.user);
//console.log("from auth cusomer",customer);



const initialState ={
    user:getUserFromLS,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""

}

export const authSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(registerUser.pending,(state)=>{
            state.isLoading=true
        }).addCase(registerUser.fulfilled,(state, action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.createUser= action.payload;
            //console.log(action.payload);
        }).addCase(registerUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error
            //console.log(action.error);
        })
        .addCase(loginUser.pending,(state)=>{
            state.isLoading=true
        }).addCase(loginUser.fulfilled,(state, action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.user= action.payload;
            console.log(action.payload);
            localStorage.setItem("user",JSON.stringify(action.payload))
            
        }).addCase(loginUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            console.log(action.error);
        })
        .addCase(getWishList.pending,(state)=>{
            state.isLoading=true
        }).addCase(getWishList.fulfilled,(state, action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.wishlist= action.payload;
            state.message=" WishList Product ! "
            //console.log(action.payload);
        }).addCase(getWishList.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error.message
            //console.log(action.error.message);
        })
        .addCase(getCart.pending,(state)=>{
            state.isLoading=true
        }).addCase(getCart.fulfilled,(state, action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.cartProduct= action.payload;
            state.message=" Product Added To The Cart ! "
            //console.log(action.payload);
        }).addCase(getCart.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error.message
            //console.log(action.error.message);
        })
        .addCase(deleteCartProduct.pending,(state)=>{
            state.isLoading=true
        }).addCase(deleteCartProduct.fulfilled,(state, action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.deleteCartProd= action.payload;
            state.message=" Product Deleted From The Cart ! "
            //console.log(action.payload);
        }).addCase(deleteCartProduct.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error.message
            //console.log(action.error.message);
        })
        .addCase(updateCartQuantity.pending,(state)=>{
            state.isLoading=true
        }).addCase(updateCartQuantity.fulfilled,(state, action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.updateQuantity= action.payload;
            state.message=" Product Quantity Updated ! "
            //console.log(action.payload);
        }).addCase(updateCartQuantity.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error.message
            //console.log(action.error.message);
        })
        .addCase(createOrder.pending,(state)=>{
            state.isLoading=true
        }).addCase(createOrder.fulfilled,(state, action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.order= action.payload;
            state.message="Order SuccessFully !"
            console.log(action.payload);
        }).addCase(createOrder.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error.message
            console.log(action.error.message);
        })
        .addCase(getMyOrder.pending,(state)=>{
            state.isLoading=true
        }).addCase(getMyOrder.fulfilled,(state, action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.myOrder= action.payload;
            state.message="Getting My Order SuccessFully !"
            //console.log(action.payload);
        }).addCase(getMyOrder.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error.message
            //console.log(action.error.message);
        })
        .addCase(updateUser.pending,(state)=>{
            state.isLoading=true
        }).addCase(updateUser.fulfilled,(state, action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.user= action.payload;
            state.message="User Updated SuccessFully !"
            //console.log(action.payload);
        }).addCase(updateUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error.message
            //console.log(action.error.message);
        })
        .addCase(logoutUser.pending,(state)=>{
            state.isLoading=true
        }).addCase(logoutUser.fulfilled,(state, action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.user = action.payload;
            state.message="User Logout SuccessFully !"
            //console.log(action.payload);
        }).addCase(logoutUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error.message
            //console.log(action.error.message);
        })
        .addCase(forgotPassword.pending,(state)=>{
            state.isLoading=true
        }).addCase(forgotPassword.fulfilled,(state, action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.token = action.payload;
            state.message="forgot password message sent SuccessFully !"
            console.log(action.payload);
        }).addCase(forgotPassword.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error.message
            console.log(action.error.message);
        })
        .addCase(resetPassword.pending,(state)=>{
            state.isLoading=true
        }).addCase(resetPassword.fulfilled,(state, action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.user.password = action.payload;
            state.message="password reset SuccessFully !"
            console.log(action.payload);
        }).addCase(resetPassword.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error.message
            console.log(action.error.message);
        })
    }
})

export default authSlice.reducer