import React,{useState} from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { adddata } from "./context/ConetextProvider";
const Register = () => {
  //usecontext
  const {udata,setUdata}  = useContext(adddata)
    const[inpval,setINP] =  useState({
        name:"",
        age:"",
        email:"",
        mobile:"",
        work:"",
        address:"",
        desc:""
    })
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
    const addinpdata = async (e)=>{
      e.preventDefault();
      const {name,age,email,mobile,work,address,desc} = inpval;
      //below line fetch data from backend ./register comes from backend
      const res = await fetch("/register",{
        method:"POST",
        headers:{
          "content-Type":"application/json"
        },
        body:JSON.stringify({
          name,age,email,mobile,work,address,desc
        })
      })
      const data = await res.json();
      console.log(data);
      if(res.status === 404 || !data){
      alert("error while writting data")
        console.log("error")
      }
      else{
        alert("data added successfully");
        setUdata(data)
        console.log("data added sucessfully")
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
              onChange={setData}
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
              onChange={setData}
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
              onChange={setData}
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
              onChange={setData}
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
              onChange={setData}
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
              onChange={setData}
              value={inpval.address}
              name="address"
              className="form-control"
              id=""
              placeholder="Enter your address"
            />
          </div>
          <div className=" mb-3  col-12">
            <label for="description">Description</label>
            <textarea name="desc" onChange={setData} value={inpval.desc} className="form-control" id="" cols="20" rows="5">
              description...
            </textarea>
          </div>
          <div className="mt-2 text-center">
            <button type="submit" onClick={addinpdata} name="submit" className="btn btn-primary ">
              Submit
            </button>
           
          </div>
        </div>
      </form>
    </div>
  
  );
};

export default Register;
