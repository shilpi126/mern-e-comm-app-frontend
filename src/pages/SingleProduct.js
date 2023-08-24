import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactImageZoom from "react-image-zoom";
import Color from "../components/Color";
import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import { Link, useLocation, useParams} from "react-router-dom";
import watch from "../images/watch.jpg";
import {useDispatch, useSelector} from "react-redux"
import Container from "../components/Container";

import 'react-medium-image-zoom/dist/styles.css'
import { addToCart, getAProduct} from "../context/reducers/productSlice";
import { getCart } from "../context/reducers/authSlice";
import { CircularProgress } from "@mui/material";



const SingleProduct = () => {
  const {id} = useParams()
  //console.log("iddddddd",id);
  
  const [alreadyAdded, setAleardyAdded]=useState(false)
  const cartState = useSelector(state => state.auth?.cartProduct)
  const getProduct = useSelector(state=>state?.product?.singleProduct)
  //console.log("??????????",getProduct);
  //console.log(">>>>>>>>>>>>>>>",getProduct?.images[0]?.url);
  const [quantity, setQuantity]= useState(1)
  const [mainImage, setMainImage] = useState(
    getProduct?.images ? 
        getProduct?.images[0]?.url 
        : ""
        ) 
  const [color,setColor]= useState(null)
  const dispatch = useDispatch()
  const location = useLocation()
  

  

  const getProductId = location.pathname.split("/")[2]
  //let imageurl = getProduct?.images[0]?.url || ""
 
 useEffect(()=>{
  dispatch(getAProduct(id))

 },[])

  useEffect(()=>{
      for(let i=0; i<cartState?.length; i++){
        if(getProductId === cartState[i]?.productId?._id){
          setAleardyAdded(true)
        }
      }

  },[])


  const [orderedProduct, setorderedProduct] = useState(true);

  // const copyToClipboard = (text) => {
  //   ///console.log("text", text);
  //   var textField = document.createElement("textarea");
  //   textField.innerText = text;
  //   document.body.appendChild(textField);
  //   textField.select();
  //   document.execCommand("copy");
  //   textField.remove();
  // };


  const closeModal = () => {};


  const addCart = (cartData) => {
    if(color===null){
      alert("please choose color")
      return false
    }else{
      dispatch(addToCart(cartData))
    }

      
  }

  return (
    <>
      <Meta title={"Product Name"} />
      <BreadCrumb title="Product Name" />
      <Container class1="main-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-6">
            <div className="main-product-image">

              
              <div >
      
               
                 <img  
                 src=
                 {
                  getProduct? 
                  (getProduct?.images ? 
                    getProduct?.images[0]?.url 
                    : "") 
                    : ""
                 }


          

          
                 />   

              </div>


            </div>
            <div className="other-product-images d-flex flex-wrap gap-15 ">
              {getProduct && getProduct?.images?.map((img,i)=>(
                   <div key={i}>
                   <img
                     
                     src={img?.url}
                     className="img-fluid"
                     alt=""
                     
                   />
                 </div>
              ))}
            
            </div>
          </div>
          <div className="col-6">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3 className="title">
                  {/* Kids Headphones Bulk 10 Pack Multi Colored For Students */}
                  {getProduct?.title}
                </h3>
              </div>
              <div className="border-bottom py-3">
                <p className="price">$ {getProduct?.price}</p>
                <div className="d-flex align-items-center gap-10">
                <ReactStars
                  count={5}
                  size={24}
                  value={getProduct?.totalrating}
                  edit={false}
                  activeColor="#ffd700"
                />
                  <p className="mb-0 t-review">(rating : {getProduct?.ratings?.length})</p>
                </div>
                <a className="review-btn" href="#review">
                  Write a Review
                </a>
              </div>
              <div className=" py-3">
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Type :</h3>
                  <p className="product-data">{getProduct?.category}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Brand :</h3>
                  <p className="product-data">{getProduct?.brand}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Category :</h3>
                  <p className="product-data">{getProduct?.category}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Tags :</h3>
                  <p className="product-data">Watch</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Availablity :</h3>
                  <p className="product-data">In Stock {getProduct?.quantity}</p>
                </div>
                <div className="d-flex gap-10 flex-column mt-2 mb-3">
                  <h3 className="product-heading">Size :</h3>
                  <div className="d-flex flex-wrap gap-15">
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      S
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      M
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      XL
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      XXL
                    </span>
                  </div>
                </div>
              {alreadyAdded === false && 
              <>
                <div className="d-flex gap-10 flex-column mt-2 mb-3">
                  <h3 className="product-heading">Color :</h3>
                  <Color colorData={getProduct?.color} setColor={setColor}/>
                </div>
              </>
              }
                <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                  {alreadyAdded === false && 
                  <>
                  <h3 className="product-heading">Quantity : </h3>
                  <div className="">
                    <input
                      type="number"
                      name=""
                      min={1}
                      max={10}
                      className="form-control"
                      style={{ width: "70px" }}
                      id=""
                      value={quantity}
                      onChange={(e)=>setQuantity(e.target.value)}
                    />
                  </div>
                  </>
                  }
                  <div className={alreadyAdded?"ms-0":"ms-5" + `d-flex align-items-center gap-30 ms-5`}>
                    {alreadyAdded?
                    <>
                      <Link to="/cart">
                      <button
                      className="button border-0"
                      //data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      type="button"
                      //onClick={(e)=>addCart({productId:getProduct?._id,price:getProduct?.price,quantity:quantity})}
                      >
                    Go To Cart
                    </button>
                    </Link>
                    <button className="button signup">Buy It Now
                    </button>
                    </> :
                    <>
                      <button
                      className="button border-0"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      type="button"
                      onClick={(e)=>addCart({productId:getProduct?._id,price:getProduct?.price,quantity,color})}
                      >
                    Add to Cart
                    </button>
                    <button className="button signup">Buy It Now
                    </button>
                    </>
                    }
                  
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <div>
                    <a href="">
                      <TbGitCompare className="fs-5 me-2" /> Add to Compare
                    </a>
                  </div>
                  <div>
                    <a href="">
                      <AiOutlineHeart className="fs-5 me-2" /> Add to Wishlist
                    </a>
                  </div>
                </div>
                <div className="d-flex gap-10 flex-column  my-3">
                  <h3 className="product-heading">Shipping & Returns :</h3>
                  <p className="product-data">
                    Free shipping and returns available on all orders! <br /> We
                    ship all US domestic orders within
                    <b>5-10 business days!</b>
                  </p>
                </div>
{/* 
                <div className="d-flex gap-10 align-items-center my-3">
                  <h3 className="product-heading">Product Link:</h3>
                  <a
                    href="javascript:void(0);"
                    onClick={() => {
                      copyToClipboard(
                        "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg"
                      );
                    }}
                  >
                    Copy Product Link
                  </a>
                </div> */}

              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="description-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4>Description</h4>
            <div className="bg-white p-3">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Tenetur nisi similique illum aut perferendis voluptas, quisquam
                obcaecati qui nobis officia. Voluptatibus in harum deleniti
                labore maxime officia esse eos? Repellat?
              </p>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="reviews-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 id="review">Reviews</h3>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <h4 className="mb-2">Customer Reviews</h4>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0">Based on 2 Reviews</p>
                  </div>
                </div>
                {orderedProduct && (
                  <div>
                    <a className="text-dark text-decoration-underline" href="">
                      Write a Review
                    </a>
                  </div>
                )}
              </div>
              <div className="review-form py-4">
                <h4>Write a Review</h4>
                <form action="" className="d-flex flex-column gap-15">
                  <div>
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={true}
                      activeColor="#ffd700"
                    />
                  </div>
                  <div>
                    <textarea
                      name=""
                      id=""
                      className="w-100 form-control"
                      cols="30"
                      rows="4"
                      placeholder="Comments"
                    >
                      
                    </textarea>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button className="button border-0">Submit Review</button>
                  </div>
                </form>
              </div>
              <div className="reviews mt-4">
                <div className="review">
                  <div className="d-flex gap-10 align-items-center">
                    <h6 className="mb-0">Ecomm</h6>
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor="#ffd700"
                    />
                  </div>
                  <p className="mt-3">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Consectetur fugit ut excepturi quos. Id reprehenderit
                    voluptatem placeat consequatur suscipit ex. Accusamus dolore
                    quisquam deserunt voluptate, sit magni perspiciatis quas
                    iste?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>
        <div className="row">
          <ProductCard />
        </div>
      </Container>

     
       <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-header py-0 border-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body py-0">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 w-50">
                  <img src={watch} className="img-fluid" alt="product imgae" />
                </div>
                <div className="d-flex flex-column flex-grow-1 w-50">
                  <h6 className="mb-3">Apple Watch</h6>
                  <p className="mb-1">Quantity: asgfd</p>
                  <p className="mb-1">Color: asgfd</p>
                  <p className="mb-1">Size: asgfd</p>
                </div>
              </div>
            </div>
            <div className="modal-footer border-0 py-0 justify-content-center gap-30">
            <Link to="/cart">
            <button type="button" className="button" data-bs-dismiss="modal">
                View My Cart
              </button>
            </Link>
           <Link to="/checkout">
           <button type="button" className="button signup">
                Checkout
              </button>
           </Link>
            </div>
            <div className="d-flex justify-content-center py-3">
              <Link
                className="text-dark"
                to="/product"
                onClick={() => {
                  closeModal();
                }}
              >
                Continue To Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
      

      

     
    </>
  );
};

export default SingleProduct;
