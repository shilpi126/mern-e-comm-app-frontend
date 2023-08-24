import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import {useDispatch, useSelector} from "react-redux"
import { loginUser } from "../context/reducers/authSlice";

const Login = () => {
  const user = useSelector(state=>state.auth?.user?.user)
  //const user = useAuth()
  //console.log(">>>>>>>>>>>> from login ",user);
  const navigate = useNavigate()
  const [email, setEmail] =useState("")
  const [password, setPassword] =useState("")


  const dispatch = useDispatch()

  // useEffect(()=>{
  //   if(user){
  //     navigate("/")
  //   }

  // },[user])

  const handleSubmit = (e) => {
      e.preventDefault()

      dispatch(loginUser({email,password}))
      
  }


  return (
    <>
      <Meta title={"Login"} />
      <BreadCrumb title="Login" />

      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Login</h3>
              <form action="" onSubmit={handleSubmit} className="d-flex flex-column gap-15">
                <input type="email" name="email" placeholder="Email"
                  className="form-control"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)} 
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-control"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
                <div>
                  <Link to="/forgot-password">Forgot Password?</Link>

                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0" type="submit">
                      Login
                    </button>
                    <Link to="/signup" className="button signup">
                      SignUp
                    </Link>
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

export default Login;
