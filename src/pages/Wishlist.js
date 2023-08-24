import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import {addToWishList} from "../context/reducers/productSlice"
import {useDispatch, useSelector} from "react-redux"
import { getWishList } from "../context/reducers/authSlice";

const Wishlist = () => {
  
  const dispatch = useDispatch()
  const getList = useSelector((state)=>state.auth?.wishlist?.wishlist)
  //console.log(getList);


    useEffect(()=>{
      dispatch(getWishList())
    },[])

    const removeFromWishList = (id) => {
      
      dispatch(addToWishList(id))
      console.log("item deleted");
      setTimeout(()=>{
        dispatch(getWishList())
      },100)
    }

  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />
    
      <Container className="wishlist-wrapper home-wrapper-2 py-5">
      
        <div className="row " >
        {getList == "" ? 
        <div style={{textAlign:"center",fontSize:"5rem",color:"gray"}}> wishlist is empty !</div> :
        getList?.map((item,index)=>(
           <div key={index} className=" col-xs-12 col-sm-6 col-md-6 col-lg-3">
           <div className="wishlist-card position-relative">
             <img
             onClick={(e)=>removeFromWishList(item?._id)}
               src="images/cross.svg"
               alt="cross"
               className="position-absolute cross img-fluid"
             />
             <div className="wishlist-card-image">
               <img
                 src={item?.photo}
                 className="img-fluid w-100 h-100"
                 alt={item.title}
               />
             </div>
             <div className="py-3 px-3">
               <h5 className="title">
                 {item?.title}
               </h5>
               <h6 className="price">$ {item?.price}</h6>
             </div>
           </div>
         </div>
        ))}

        

   



       </div>
     
      </Container>

      
        
    </>
  );
};

export default Wishlist;
