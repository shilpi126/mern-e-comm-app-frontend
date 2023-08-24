import React, { useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../context/reducers/authSlice";
const Forgotpassword = () => {
  const [email, setEmail] = useState()
  const navigate = useNavigate
  const dispatch = useDispatch()

  const resetToken = useSelector(state=>state.auth.token)
  console.log("............",resetToken);

  const handleClick = () => {
    console.log(">>>>>>>>>>>>>>>>>",email);
    dispatch(forgotPassword({email}))
    //navigate(`/resetPassword/${resetToken}`)

  }

  return (
    <>
      <Meta title={"Forgot Password"} />
      <BreadCrumb title="Forgot Password" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Reset Your Password</h3>
              <p className="text-center mt-2 mb-3">
                We will send you an email to reset your password
              </p>
              <form onSubmit={handleClick} action="" className="d-flex flex-column gap-15">
                <input type="email" name="email" placeholder="Email" 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="form-control"
                />

                <div>
                  <div className="mt-3 d-flex justify-content-center flex-column gap-15 align-items-center">
                    <button className="button border-0" type="submit" >
                      Submit
                    </button>
                    <Link to="/login">Cancel</Link>
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

export default Forgotpassword;
