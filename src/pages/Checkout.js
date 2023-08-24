import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

import Container from "../components/Container";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik"
import * as yup from "yup"
import axios from "axios"
import { createOrder } from "../context/reducers/authSlice";
const {RAZORPAY_KEY} = require("../../secret")



const shoppingSchema = yup.object({
  name:yup.string().required("Name is Required"),
  //lastName:yup.string().required("Last Name is Required"),
  address:yup.string().required("Address is Required"),
  state:yup.string().required("State is Required"),
  city:yup.string().required("City is Required"),
  country:yup.string().required("Country is Required"),
  pincode:yup.number().required("Pincode is Required"),
  
})

const Checkout = () => {
  
  const user = useSelector(state=>state?.auth?.user?.user)
  const dispatch = useDispatch()
  const cartProduct = useSelector((state)=>state.auth?.cartProduct)
  const [cartProductState,setCartProductState] = useState()
  const [totalAmount, setTotalAmount] = useState(null)


  useEffect(()=>{
    let sum = 0;
    for (let i=0;i<cartProduct?.length; i++){
      sum = sum +(Number(cartProduct[i].quantity)*cartProduct[i].price)
    }
    setTotalAmount(sum)
  },[cartProduct])


  useEffect(()=>{
    let items=[]
    
    for(let i=0; i<cartProduct?.length; i++){
      //console.log(cartProduct);
      items.push({product:cartProduct[i].productId._id,quantity:cartProduct[i].quantity,color:cartProduct[i].productId?.color[i],price:cartProduct[i].price})
    }
  setCartProductState(items)
  },[])



  const formik = useFormik({
    initialValues:{
      name:"",
      //lastName:"",
      address:"",
      state:"",
      city:"",
      country:"",
      pincode:"",
    
    },
    validationSchema:shoppingSchema,
    onSubmit: (values) => {
      
    
        handleCheckout(values)
    
 
    }  
  });


  
  function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
  }


  const handleCheckout = async (values) => {
    //console.log("????",values);
    try{
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );
  
   
    if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }
  
    
    // creating a new order
    const result = await axios.post("/user/order/checkout",{amount:totalAmount},user);
    
    if (!result) {
        alert("Server error. Are you online?");
        return;
    }
  
    // Getting the order details back
    
    const { amount, id:order_id, currency } = result.data.order;
    
    const options = {
      
        key: RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
        amount: amount,
        currency: currency,
        name: "Soumya Corp.",
        description: "Test Transaction",
        //image: { logo },
        order_id: order_id,
        handler: async function (response) {
         //console.log("res",response);
      
        const razorpayPaymentId= response.razorpay_payment_id
        const razorpayOrderId= response.razorpay_order_id
        
        let paymentInfo = {razorpayPaymentId,razorpayOrderId}

        
            const data = {
                orderCreationId: order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                //razorpaySignature: response.razorpay_signature,
            };


            const result = await axios.post("/user/order/paymentverification",data,user);
            
        

            dispatch(createOrder({
              totalPrice:totalAmount,
              totalPriceAfterDiscount:totalAmount,
              shippingInfo:values,
              paymentInfo,
              user,
              orderItems:cartProductState,

            }))

          
  
        },
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: user?.mobile
      },
      notes: {
          address: "Soumya Dey Corporate Office",
      },
      theme: {
          color: "#61dafb",
      },
  };
  
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
    

}catch(error){
      console.log(error.message);
    }

  }
  
  
  
  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">Dev Corner</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark total-price" to="/cart">
                      Cart
                    </Link>
                  </li>
                  &nbsp; /&nbsp;
                  <li
                    className="breadcrumb-ite total-price active"
                    aria-current="page"
                  >
                    Information
                  </li>
                  &nbsp; /
                  <li className="breadcrumb-item total-price active">
                    Shipping
                  </li>
                  &nbsp; /
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Payment
                  </li>
                </ol>
              </nav>
              <h4 className="title total">Contact Information</h4>
              <p className="user-details total">
                KiKi  (kiki123@gmail.com)
              </p>
              <h4 className="mb-3">Shipping Address</h4>
              <form
              onSubmit={formik.handleSubmit}
                action=""
                className="d-flex gap-15 flex-wrap justify-content-between"
              >
                <div className="w-100">
                  <select 
                  
                
                  className="form-control form-select" 
                  name="country" 
                  value={formik.values.country} 
                  onChange={formik.handleChange("country")} 
                  onBlur={formik.handleBlur("country")}
                  id="" 
                  >
                    <option value="Select Country" selected disabled>
                      Select Country
                    </option>
                    <option value="India" >
                      India
                    </option>
                    <option value="America">
                      America
                    </option>
                    <option value="China" >
                      China
                    </option>
                  </select>
                <div className="error text-danger ms-2 my-1">
                    {formik.touched.country && formik.errors.country}
                  </div>   
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder=" Name"
                    className="form-control"
                    name="name" 
                    value={formik.values.name} 
                    onChange={formik.handleChange("name")} 
                    onBlur={formik.handleBlur("name")}
                  />
                  <div className="error text-danger ms-2 my-1">
                    {formik.touched.name && formik.errors.name}
                  </div>
                </div>
                {/* <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="form-control"
                    name="lastName" 
                    value={formik.values.lastName} 
                    onChange={formik.handleChange("lastName")} 
                    onBlur={formik.handleBlur("lastName")}
                  />
                      <div className="error text-danger ms-2 my-1">
                    {formik.touched.firstName && formik.errors.firstName}
                  </div>
                </div> */}
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Address"
                    className="form-control"
                    name="address" 
                    value={formik.values.address} 
                    onChange={formik.handleChange("address")} 
                    onBlur={formik.handleBlur("address")}
                  />
                      <div className="error text-danger ms-2 my-1">
                    {formik.touched.lastName && formik.errors.lastName}
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Apartment, Suite ,etc"
                    className="form-control"
                    name="other" 
                    value={formik.values.other} 
                    onChange={formik.handleChange("other")} 
                    onBlur={formik.handleBlur("other")}
                  />
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="city"
                    className="form-control"
                    name="city" 
                    value={formik.values.city} 
                    onChange={formik.handleChange("city")} 
                    onBlur={formik.handleBlur("city")}
                  />
                      <div className="error text-danger ms-2 my-1">
                    {formik.touched.city && formik.errors.city}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <select  
                   name="state" 
                   value={formik.values.state} 
                   onChange={formik.handleChange("state")} 
                   onBlur={formik.handleBlur("state")}
                  className="form-control form-select" id="">
                    <option value="" selected disabled>
                      Select State
                    </option>
                    <option value="Utter Pradesh" >
                      Utter Pradesh
                    </option>
                    <option value="Bihar" >
                      Bihar
                    </option>
                  </select>
                  <div className="error text-danger ms-2 my-1">
                    {formik.touched.state && formik.errors.state}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Zipcode"
                    className="form-control"
                    name="pincode" 
                    value={formik.values.pincode} 
                    onChange={formik.handleChange("pincode")} 
                    onBlur={formik.handleBlur("pincode")}
                  />
                      <div className="error text-danger ms-2 my-1">
                    {formik.touched.pincode && formik.errors.pincode}
                  </div>
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <BiArrowBack className="me-2" />
                      Return to Cart
                    </Link>
                    <Link to="/cart" className="button">
                      Continue to Shipping
                    </Link>
                    <button 
                    
                    type="submit" className="button "  >
                      Place Order
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

         {cartProduct && cartProduct?.map((item,index)=>(
           <div className="col-5" key={index}>
           <div className="border-bottom py-4">
             <div className="d-flex gap-10 mb-2 align-align-items-center">
               <div className="w-75 d-flex gap-10">
                 <div className="w-25 position-relative">
                   <span
                     style={{ top: "-10px", right: "2px" }}
                     className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                   >
                     {item?.quantity}
                   </span>
                   <img className="img-fluid" src={item?.productId?.images[0]?.url} alt="product" />
                 </div>
                 <div>
                   <h5 className="total-price">{item?.productId?.title}</h5>
                   <p className="total-price">#agfgfd</p>
                 </div>
               </div>
               <div className="flex-grow-1">
                 <h5 className="total">$ {item?.price*item?.quantity}</h5>
               </div>
             </div>
           </div>
           <div className="border-bottom py-4">
             <div className="d-flex justify-content-between align-items-center">
               <p className="total">Subtotal</p>
               <p className="total-price">$ {totalAmount}</p>
             </div>
             <div className="d-flex justify-content-between align-items-center">
               <p className="mb-0 total">Shipping</p>
               <p className="mb-0 total-price">$ 5</p>
             </div>
           </div>
           <div className="d-flex justify-content-between align-items-center border-bootom py-4">
             <h4 className="total">Total</h4>
             <h5 className="total-price">$ {totalAmount+5}</h5>
           </div>
         </div>
         ))}

        </div>
      </Container>
    </>
  );
};

export default Checkout;
