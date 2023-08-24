import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import CircularProgress from '@mui/material/CircularProgress';


import wishlist from "../images/wishlist.svg";
// import watch from "../images/watch.jpg";
// import watch2 from "../images/watch-1.avif";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";

import {useDispatch, useSelector} from "react-redux"
import { addToWishList, deleteWishList, getAProduct } from "../context/reducers/productSlice";
import { getWishList } from "../context/reducers/authSlice";

const ProductCard = (props) => {
  let [active, setActive] = useState(false)
  const getList = useSelector((state)=>state.auth?.wishlist?.wishlist)
  const [match,setMatch]= useState("")
  const dispatch = useDispatch()
  const { grid , item, key} = props;
  
  
  useEffect(()=>{
    dispatch(getWishList())
    
  },[])

  let location = useLocation();

  const addToWish = (prodId) => {
  dispatch(addToWishList(prodId))
  

  }
  
  const viewProduct = (id) => {
    
    dispatch(getAProduct(id))
  }

  return (
    <>
    
      <div
      style={{display:"flex", flexWrap:"wrap"}}
      //key={index}
        className={` ${
          location.pathname == "/product" ? `gr-${grid}` : "col-3"
        }  ` }
      >
        <div
        key={key}
        style={{border:"1px solid lightgray" ,height:"25rem", width:"18rem" , marginTop:"1.5rem" }}
        className="product-card position-relative "
        >
          <div className="wishlist-icon position-absolute">
          
          
            <button  
            className= "border-0 bg-transparent"
            onClick={(e)=>
              addToWish(item?._id)
              
              } >
          
            <img src={wish} alt="wishlist"  
              className="bg-transparent"
              //onClick={(e)=>setActive(true)}
            />
            
          </button>
          
          
          </div>
          <div className="product-image">
            <img src={item?.images[0].url}  className="img-fluid" alt="product image" />
            <img src={item?.images[1].url} className="img-fluid" alt="product image" />
          </div>
          <div className="product-details">
           <h6 className="brand">{item?.brand}</h6>
           <h5 className="product-title">
              {item?.title}
           </h5>
           <ReactStars
             count={5}
             size={24}

             value={item?.totalrating}
             edit={false}
             activeColor="#ffd700"
           />
      
           <p 
           className={`description ${grid === 12 ? "d-block" : "d-none"}` }
            dangerouslySetInnerHTML={{__html:item?.description}}
           >
            
             {/* //</div>{item.description} */}
           </p>
           <p className="price">$ {item?.price}</p>
         </div>
         <div className="action-bar position-absolute">
           <div className="d-flex flex-column gap-15">
             <button className="border-0 bg-transparent">
               <img src={prodcompare} alt="compare" />
             </button>
           <Link to={item?._id}>
           <button className="border-0 bg-transparent" onClick={(e)=>viewProduct(item?._id)}>
               <img src={view} alt="view" />
             </button>
           </Link>
             <button className="border-0 bg-transparent">
               <img src={addcart} alt="addcart" />
             </button>
           </div>
         </div>
       </div>
      
      </div>
      

        

    </>
  );
};

export default ProductCard;


