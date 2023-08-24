import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import compare from "../images/compare.svg";
import wishlist from "../images/wishlist.svg";
import user from "../images/user.svg";
import cart from "../images/cart.svg";
import menu from "../images/menu.svg";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Typeahead } from 'react-bootstrap-typeahead'; 
import { useDispatch, useSelector } from "react-redux";
import { getCart, logoutUser } from "../context/reducers/authSlice";
import { getAProduct, getAllProduct } from "../context/reducers/productSlice";
const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const productState = useSelector(state=>state?.product?.products)
  const [totalAmount, setTotalAmount] = useState(null)
  const cartProduct = useSelector((state)=>state.auth?.cartProduct)
  const userData = useSelector((state)=>state.auth.user)
  const [paginate, setPaginate] = useState(true);
  const [productOpt, setProductOpt] = useState([])
  useEffect(()=>{
    dispatch(getCart())
    
  },[])

  
  useEffect(()=>{
    dispatch(getAllProduct())
  },[])

  //console.log("?????????????",productState);

  useEffect(() => {
    let sum = 0;
    for (let i=0;i<cartProduct?.length; i++){
      sum = sum +(Number(cartProduct[i].quantity)*cartProduct[i].price)
    }
  
    setTotalAmount(sum)
  },[cartProduct])

  useEffect(()=>{
    let data = []
    for(let i=0; i<productState.length; i++){
      const element = productState[i];
      
      data.push({id:i,prod:element?._id,name:element?.title})
    }
    setProductOpt(data)
  
  },[productState])

  

  
  // const viewProduct = (id) => {
    
  //   dispatch(getAProduct(id))
  //   navigate(`/product/${id}`)
  // }


  const handleLogout = () => {
    console.log("user logout successfully");
    dispatch(logoutUser())
    navigate("/login")
  }


  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">
                Free Shipping Over $100 & Free Returns
              </p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                Hotline:
                <a className="text-white" href="tel:+91 8264954234">
                  +91 123654789
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
              <h2>
                <Link className="text-white">E commerce</Link>
              </h2>
            </div>
            <div className="col-5">
              <div className="input-group">
              <Typeahead
        id="pagination-example"
        onPaginate={() => console.log('Results paginated')}
        options={productOpt}
        paginate={paginate}
        labelKey={"name"}
        onChange={(selected)=>{
            navigate(`/product/${selected[0]?.prod}`)//
            //viewProduct(`id:${selected[0]?.prod}`)
          
        }}
        placeholder="Search Products Here..."
      />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className="fs-6" />
                </span>
              </div>
            </div>
            <div className="col-5">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div>
                  <Link
                    to="/compare-product"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={compare} alt="compare" />
                    <p className="mb-0">
                      Compare <br /> Products
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to="/wishlist"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={wishlist} alt="wishlist" />
                    
                    <p className="mb-0">
                      Favourite <br /> wishlist
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to={userData?.user == null ? "/login" : "/my-profile"}
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={user} alt="user" />
                {
                userData?.user == null?
                   ( <p className="mb-0">
                   Log in <br /> My Account
                   </p>)
                  :
                   ( <p className="mb-0">
                   Welcome <br /> {userData?.user?.name}
                   </p>)
                  }
                  </Link>
                </div>
                <div>
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 text-white"
                    >
                    <img src={cart} alt="cart" />
                    <div className="d-flex flex-column gap-10">
                      <span className="badge bg-white text-dark">{cartProduct?.length?cartProduct?.length:0}</span>
                      <p className="mb-0">$ {totalAmount?totalAmount:0}</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={menu} alt="" />
                      <span className="me-5 d-inline-block">
                        Shop Categories
                      </span>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Another action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Something else here
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/product">Our Store</NavLink>
                    <NavLink to="/myorder">My Order</NavLink>
                    <NavLink to="/blogs">Blogs</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                    <button className="btn btn-secondary  bg-transparent border-0 gap-15 d-flex align-items-center" onClick={handleLogout}>LOGOUT</button>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
