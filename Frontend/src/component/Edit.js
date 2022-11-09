import React,{useState} from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { json, Link } from "react-router-dom";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import {useParams,useHistory} from 'react-router-dom'
import { useContext } from "react";
import { updatedata } from "./context/ConetextProvider";
const Edit = () => {
const {updata,setUpdata} = useContext(updatedata)
 const navigate = useNavigate("")

    const[inpval,setINP] =  useState({
        name:"",
        age:"",
        email:"",
        mobile:"",
        work:"",
        address:"",
        desc:""
    })
    console.log(inpval)
    const setData = (e)=>{
console.log(e.target.value)
const {name,value} = e.target;
setINP((preval)=>{
  return{
    ...preval,
    [name]:value
  }
})
    }
    const {id} = useParams("")
    console.log(id)
    //const [getuserdata,setuserdata] = useState([])
    //console.log(getuserdata);
    const getdata = async (e)=>{
      //below line fetch data from backend ./GETUSER comes from backend
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
        setINP(data)
        console.log("get data")
        
      }
    
    }
    useEffect(() => {
      getdata()
    },[])
    const updateuser = async(e)=>{
      e.preventDefault();
      const {name,age,email,mobile,work,address,desc} = inpval;
      const res2 = await fetch(`/updateuser/${id}`,{
        method:"PATCH",
        headers:{
          "content-Type":"application/json"},
          body: JSON.stringify({name,age,email,mobile,work,address,desc})
      })
      const data2 = await res2.json();
      console.log(data2)
      if(res2.status ===422 || !data2){
        alert("fill the data")
      }else{
        alert("data added")
        setUpdata(data2)
      }
    }
  return (
    <div className="container">
      <Link to="/">
        <button className="btn btn-secondary mx-2">Home</button>
      </Link>
      <form>
        <div className="row ">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label for="Name">Name</label>
            <input
              type="text"
              onChange={setINP}
              value= {inpval.name}
              name="name"
              className="form-control"
              id="name"
              placeholder="Enter your name"
            />
           
          </div>
          <div className="form-group mb-3 col-lg-6 col-md-6 col-12">
            <label for="Age">Age</label>
            <input
              type="number"
              onChange={setINP}
              value={inpval.age}
              name="age"
              className="form-control"
              id=""
              placeholder="Enter age"
            />
          </div>
          <div className="form-group mb-3 col-lg-6 col-md-6 col-12">
            <label for="Email">Email</label>
            <input
              type="email"
              onChange={setINP}
              value={inpval.email}
              name="email"
              className="form-control"
              id=""
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mb-3 col-lg-6 col-md-6 col-12">
            <label for="Mobile">Mobile</label>
            <input
              type="number"
              onChange={setINP}
              value={inpval.mobile}
              name="mobile"
              className="form-control"
              id=""
              placeholder="Enter contact number"
            />
          </div>
          <div className="form-group mb-3 col-lg-6 col-md-6 col-12">
            <label for="work">Work</label>
            <input
              type="text"
              onChange={setINP}
              value={inpval.work}
              name="work"
              className="form-control"
              id=""
              placeholder="work profile"
            />
          </div>
          <div className="form-group mb-3 col-lg-6 col-md-6 col-12">
            <label for="Address">Address</label>
            <input
              type="text"
              onChange={setINP}
              value={inpval.address}
              name="address"
              className="form-control"
              id=""
              placeholder="Enter your address"
            />
          </div>
          <div className=" mb-3  col-12">
            <label for="description">Description</label>
            <textarea name="desc" onChange={setINP} value={inpval.desc} className="form-control" id="" cols="20" rows="5">
              description...
            </textarea>
          </div>
          <div className="mt-2 text-center">
            <button type="submit"  onClick={updateuser} name="submit" className="btn btn-primary ">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Edit;
