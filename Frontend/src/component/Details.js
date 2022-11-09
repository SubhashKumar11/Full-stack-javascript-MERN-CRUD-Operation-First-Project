import React from "react";
import {useParams} from 'react-router-dom'
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import { NavLink } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import MobileFriendlyIcon from "@mui/icons-material/MobileFriendly";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DeleteIcon from '@mui/icons-material/Delete';
import { useState,useEffect } from "react";
const Details = () => {
 
  const [getuserdata,setuserdata] = useState([])
  console.log(getuserdata);
  const {id} = useParams("")
  console.log(id)
  const getdata = async (e)=>{
    //below line fetch data from backend ./register comes from backend
    const res = await fetch(`/getuser/${id}`,{
      method:"GET",
      headers:{
        "content-Type":"application/json"
      }
        });
    const data = await res.json();
    console.log(data);
    if(res.status === 422 || !data){
      console.log("error")
    }
    else{
      setuserdata(data)
      console.log("get data")
    }
  }
useEffect(() => {
  getdata()
},[])
//for delete user function
const deleteuser = async(id)=>{
  const res2 = await fetch(`/deleteuser/${id}`,{
    method:"DELETE",
    headers:{
      "content-Type":"application/json"}
  })
  const deletedata = await res2.json()
  console.log(deletedata)

  if (res2.status ===422 || !deletedata) {
console.log("error")    
  } else {
    console.log("user deleted");

  }
 }
  return (
    
    <div className="container mt-3">
      <NavLink to='/'>Home</NavLink>
      <h1 style={{ fontWeight: 400 }}>Welcome Ram</h1>
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
        <div className="add_btn ">
                <NavLink to={`/edit/${getuserdata._id}`}>
                <button className="btn btn-primary mx-2">
                  <EditIcon />
                </button>
                </NavLink>
                <button onClick={()=>deleteuser(getuserdata._id)} className="btn btn-danger">
                  <DeleteIcon />
                </button>
              </div>
          <div className="row">
            <div className="left_view col-lg-6 col-md-6 col-12">
              <img
                src={require("../images/profile.png")}
                style={{ width: 50 }}
                alt=""
              />
              <h3 className="mt-3">
                Name: <span>{getuserdata.name}</span>
              </h3>
              <h3 className="mt-3">
                Age: <span>{getuserdata.age}</span>
              </h3>
              <p>
                <EmailIcon />
                Email: <span>{getuserdata.email}</span>
              </p>
              <p>
                <WorkIcon />
                Occupation: <span>{getuserdata.work}</span>
              </p>
            </div>
            <div className="right_view col-lg-6 col-md-6 col-12">
            
              <p className="mt-3">
                <MobileFriendlyIcon />
                Mobile:<span>{getuserdata.mobile}</span>
              </p>
              <p className="mt-3">
                <LocationOnIcon />
                Location:<span>{getuserdata.address}</span>
              </p>
              <p className="mt-3">
                Description:<span>{getuserdata.desc}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Details;
