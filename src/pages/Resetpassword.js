import React, { useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import { useDispatch } from "react-redux"
import { resetPassword } from "../context/reducers/authSlice";

const Resetpassword = () => {
  const location = useLocation()
  const resetToken = location.pathname.split("/")[2]
  //console.log("====>",resetToken);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [password,setPassword]= useState()
  
  const handleSubmit = () =>{
    
    dispatch(resetPassword({password,resetToken}))
    navigate("/login")
  }

  return (
    <>
      <Meta title={"Reset Password"} />
      <BreadCrumb title="Reset Password" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Reset Password</h3>
              <form action="" 
              onSubmit={handleSubmit}
              className="d-flex flex-column gap-15">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-control"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
                {/* <input
                  type="password"
                  name="confpassword"
                  placeholder="Confirm Password"
                /> */}
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0" type="submit">Ok</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Resetpassword;
