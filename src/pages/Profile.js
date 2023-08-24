import React, { useState } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Container from '../components/Container'
import {useDispatch, useSelector} from "react-redux"
import { registerUser, updateUser } from "../context/reducers/authSlice";
//import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik"
import * as yup from "yup"
import {FiEdit} from "react-icons/fi"
import { useNavigate } from 'react-router-dom';


const profileSchema = yup.object({
    name:yup.string().required("Name is Required"),
    //lastName:yup.string().required("Last Name is Required"),
    email:yup.string().required("Email is Required"),
    mobile:yup.string().required("Mobile is Required"),
    
    
  })
  

function Profile() {
    const userState = useSelector(state=>state.auth.user.user)
    //console.log(userState);
    const [edit,setEdit] = useState(true)
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const formik = useFormik({
        initialValues:{
            name:userState?.name,
            
            email:userState?.email,
            mobile:userState?.mobile,
        
        
        },
        validationSchema:profileSchema,
        onSubmit:(values) => {
           // console.log("=====>",values);
            dispatch(updateUser(values))
            setEdit(true)
            navigate("/login")
        }
    });
    
  
  
  return (
    <>
    <BreadCrumb title="My Profile"/>
    <Container class1="cart-wrapper home-wrapper-2 py-2">
    <div className='row'>
    <div className='col-12'>
        <div className='d-flex justify-content-between align-items-center'>
            
                <h3 className='my-3'>Update Profile</h3>
                <FiEdit onClick={()=>setEdit(false)}/>
            
        </div>
    <form onSubmit={formik.handleSubmit}>

    <div className="mb-3">
    <label htmlFor="example1" className="form-label">First Name</label>
    <input 
    type="text" disabled={edit} name='name' className="form-control" id="example1"
    value={formik.values.name} 
    onChange={formik.handleChange("name")} 
    onBlur={formik.handleBlur("name")}
    />
        <div className="error text-danger ms-2 my-1">
            {formik.touched.name && formik.errors.name}
        </div>
    </div>
    
    <div className="mb-3">
    <label htmlFor="mobile" className="form-label">Mobile No</label>
    <input type="number" disabled={edit} name='mobile' className="form-control" id="mobile"
        value={formik.values.mobile} 
        onChange={formik.handleChange("mobile")} 
        onBlur={formik.handleBlur("mobile")}
    />
    <div className="error text-danger ms-2 my-1">
        {formik.touched.mobile && formik.errors.mobile}
    </div>
    </div>
    <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" disabled={edit} name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
        value={formik.values.email} 
        onChange={formik.handleChange("email")} 
        onBlur={formik.handleBlur("email")}
    />
    <div className="error text-danger ms-2 my-1">
        {formik.touched.email && formik.errors.email}
    </div>
    </div>

{edit === false &&  <button type="submit" className="btn btn-primary">Update Profile</button>}
</form>
</div>
</div>

</Container>

    </>
  )
}

export default Profile