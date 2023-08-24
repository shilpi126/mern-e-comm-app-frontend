import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import watch from "../images/watch.jpg";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import CircularProgress from '@mui/material/CircularProgress';
import {useDispatch, useSelector} from "react-redux"
import { deleteCartProduct, getCart, updateCartQuantity } from "../context/reducers/authSlice";
import { useState } from "react";

const Cart = () => {
  const dispatch = useDispatch()
  const [cartData,setCartData] = useState()
  const [productDetails,setProductDetails] = useState(null)
  const [totalAmount, setTotalAmount] = useState(null)
  const cartProduct = useSelector((state)=>state.auth?.cartProduct)
  //console.log("===>",productDetails)

  useEffect(()=>{
    dispatch(getCart())
    //setCartData(cartProduct)
  },[])


  const deleteProduct = (id) => {
    
    dispatch(deleteCartProduct(id))
    setTimeout(()=>{
      dispatch(getCart())

    },200)
  }


  useEffect(()=>{
    //console.log(".........>>>>",productDetails);
if(productDetails !== null){
    
    dispatch(updateCartQuantity({cartProductId:productDetails?.cartProductId, quantity:productDetails?.quantity}))
    setTimeout(() => {
      dispatch(getCart())
    
    },500)
  
}


},[productDetails])


useEffect(()=>{
  let sum = 0;
  for (let i=0;i<cartProduct?.length; i++){
    sum = sum +(Number(cartProduct[i].quantity)*cartProduct[i].price)
  }


  setTotalAmount(sum)
},[cartProduct])


  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="cart-header py-3 d-flex justify-content-between align-items-center">
              <h4 className="cart-col-1">Product</h4>
              <h4 className="cart-col-2">Price</h4>
              <h4 className="cart-col-3">Quantity</h4>
              <h4 className="cart-col-4">Total</h4>
            </div>
              <>
              {cartProduct === "" ? <div style={{display:"flex", justifyContent:"center",alignContent:"center",margin:"100px"}}><CircularProgress color="secondary"/></div> : 
              cartProduct?.map((item,index) => (
                        <div key={index} className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
                        <div className="cart-col-1 gap-15 d-flex align-items-center">
                          <div className="w-25">
                            <img src={item?.productId?.images[0]?.url} className="img-fluid" alt="product image" />
                          </div>
                          <div className="w-75">
                            <p>{item?.productId?.title}</p>
                            <p>Size: hgf</p>
                            <p>Color: gfd</p>
                          </div>
                        </div>
                        <div className="cart-col-2">
                          <h5 className="price">$ {item?.price}</h5>
                        </div>
                        <div className="cart-col-3 d-flex align-items-center gap-15">
                          <div>
                            <input
                              className="form-control"
                              type="number"
                              name=""
                              min={1}
                              max={10}
                              id={item?._id}
                              value={item?.quantity}
                              //value={(productDetails?.quantity)?(productDetails?.quantity):item?.quantity}
                              onChange={(e)=>setProductDetails({cartProductId:item?._id,quantity:e.target.value})}
                              
                            />
                          </div>
                          <div >
                            <AiFillDelete className="text-danger  " onClick={(e)=>deleteProduct(item?._id)}/>
                          </div>
                        </div>
                        <div className="cart-col-4">
                          <h5 className="price">$ {item?.price*item?.quantity}</h5>
                        </div>
                      </div>
            ))}
            </>

          </div>
          <div className="col-12 py-2 mt-4">
            <div className="d-flex justify-content-between align-items-baseline">
              <Link to="/product" className="button">
                Continue To Shopping
              </Link>
              {(totalAmount !== null || totalAmount !== 0) 
              && 
                <div className="d-flex flex-column align-items-end">
                <h4>SubTotal: $ {totalAmount}</h4>
                <p>Taxes and shipping calculated at checkout</p>
                <Link to="/checkout" className="button">
                  Checkout
                </Link>
                </div>
              }
            
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
