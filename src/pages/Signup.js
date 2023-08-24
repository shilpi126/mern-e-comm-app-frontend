import React, { useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import {useDispatch} from "react-redux"
import { registerUser } from "../context/reducers/authSlice";

const Signup = () => {
  const [name, setName] =useState("")
  const [email, setEmail] =useState("")
  const [password, setPassword] =useState("")
  const [confirmPassword, setConfirmPassword] =useState("")
  const [mobile, setMobile] =useState("")

  const dispatch = useDispatch()

  

  const handleSubmit = (e) => {
      e.preventDefault()

      dispatch(registerUser({name,email,password,confirmPassword,mobile}))

  }

  return (
    <>
      <Meta title={"Sign Up"} />
      <BreadCrumb title="Sign Up" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Sign Up</h3>
              <form action="" 
              className="d-flex flex-column gap-15"
              onSubmit={handleSubmit}
              >
                <input 
                type="text" 
                name="name" 
                placeholder="Name"  
                className="form-control"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />
                <input 
                type="email" 
                name="email" 
                placeholder="Email" 
                className="form-control"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                <input
                  type="number"
                  //pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  name="mobile"
                  placeholder="Mobile Number"
                  className="form-control"
                  value={mobile}
                  onChange={(e)=>setMobile(e.target.value)}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-control"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
                  <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e)=>setConfirmPassword(e.target.value)}
                />
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0" type="submit">Sign Up</button>
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

export default Signup;
