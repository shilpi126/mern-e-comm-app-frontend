import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios"


export const getAllProduct = createAsyncThunk("product/getallproduct", async (thunkAPI) => {
        try{
            const response = await axios.get("product/getallproduct");
            //console.log(response.data);
            if(response){
                
                return response.data
            }

            
        }catch(error){
            return thunkAPI.rejectWithValue(error)

        }
    }
)


export const getAProduct = createAsyncThunk("product/getproduct", async (id,thunkAPI) => {
   // console.log("11111111",id);
    try{
        const response = await axios.get(`/product/getproduct/${id}`);
        //console.log("=================>>>>",response.data);
        if(response){
            
            return response.data
        }

        
    }catch(error){
        return thunkAPI.rejectWithValue(error)

    }
}
)

const getCustomer = localStorage.getItem("user")
? JSON.parse(localStorage.getItem("user"))
: null;


const user = (getCustomer.user);
//console.log(user);


export const addToWishList = createAsyncThunk("product/wishlist", async (prodId,thunkAPI) => {
    try{
        const response = await axios.post("/product/createwishlist",{prodId},user);
        console.log(response);
        if(response){
            
            return response.data
        }

        
    }catch(error){
        return thunkAPI.rejectWithValue(error.message)

    }
}
)

export const deleteWishList = createAsyncThunk("delete/wishlist", async (prodId,thunkAPI) => {
    try{
        const response = await axios.delete("/product/deletewishlist",{prodId},user);
        console.log(response);
        if(response){
            
            return response.data
        }

        
    }catch(error){
        return thunkAPI.rejectWithValue(error.message)

    }
}
)


export const addToCart = createAsyncThunk("add/cart", async (cartData,thunkAPI) => {
    try{
        const response = await axios.post("/cart/addtocart",cartData,user);
        console.log(response.data);
        if(response){
            
            return response.data
        }

        
    }catch(error){
        return thunkAPI.rejectWithValue(error.message)

    }
}
)









const initialState ={
    products:[],
    singleProduct:{},
    
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""


}

export const productSlice = createSlice({
    name:"product",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(getAllProduct.pending,(state)=>{
            state.isLoading=true
        }).addCase(getAllProduct.fulfilled,(state, action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.products= action.payload;
            //console.log(action.payload);
        }).addCase(getAllProduct.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error
            //console.log(action.error.message);
        })
        .addCase(getAProduct.pending,(state)=>{
            state.isLoading=true
        }).addCase(getAProduct.fulfilled,(state, action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.singleProduct=action.payload;
            console.log(action.payload);
        }).addCase(getAProduct.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error
            console.log(action.error.message);
        })
        .addCase(addToWishList.pending,(state)=>{
            state.isLoading=true
        }).addCase(addToWishList.fulfilled,(state, action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.addToWishList= action.payload;
            state.message="Product Added To Wishlist !"
            console.log(action.payload);
            
        }).addCase(addToWishList.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error.message
            console.log(action.error.message);
        })
       

  


    }
})

export default productSlice.reducer