import React from "react";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { NavLink } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import { useContext } from "react";
import { adddata, updatedata } from "./context/ConetextProvider";
const Home = () => {
const [getuserdata,setuserdata] = useState([])
console.log(getuserdata)
const {udata,setUdata}  = useContext(adddata)
const [updata,setUpdata] = useState(updatedata)
  const getdata = async (e)=>{
    //below line fetch data from backend ./register comes from backend
    const res = await fetch("/getdata",{
      method:"GET",
      headers:{
        "content-Type":"application/json"
      }
        });
    const data = await res.json();
    console.log(data);
    if(res.status === 404 || !data){
      console.log("error")
    }
    else{
      setuserdata(data)
      console.log("get data")
    }
  }
 useEffect(()=>{
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
    getdata();
  }
 }
  
  return (
    <>
    { 
      udata ? 
      <>
 
 <div class="alert alert-success alert-dismissible fade show" role="alert">
 <strong>Sucess!</strong> Data submitted sucessfully.
 <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
</> : ""
    }
       { 
      updata ? 
      <>

 <div class="alert alert-success alert-dismissible fade show" role="alert">
 <strong>Sucess!</strong> Data updated sucessfully.
 <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
</> : ""
    }
   
      <div className="mt-5">
        <div className="container">
          <Link to='/register'><button className="btn btn-primary">Register</button></Link>
          <div className="add_btn mt-2">
             <NavLink to='/register' className="btn btn-primary">Add data</NavLink>
            {/*here navlink let you to the link of backend and /register come from backend route*/}
          </div>
          <table className="table mt-2">
            <thead>
              <tr className="table-dark">
                <th scope="col">id</th>
                <th scope="col">UserName</th>
                <th scope="col">Age</th>
                <th scope="col">Email</th>
                <th scope="col">Mobile</th>
                <th scope="col">Job</th>
                <th scope="col">Address</th>
                <th scope="col">Description</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
{
  //calling map method
  getuserdata.map((element,id)=>{
    return(
      <>
          <tr>
                <th scope="row">{id+1}</th>{/*id+1 start from 0+1=1 */}
                <td>{element.name}</td>
                <td>{element.age}</td>
                <td>{element.email}</td>
                <td>{element.mobile}</td>
                <td>{element.work}</td>
                <td>{element.address}</td>
                <td>{element.desc}</td>
                <td className="d-flex justify-content-between" >
                   <NavLink to={`view/${element._id}`}><button className="btn btn-success"><RemoveRedEyeIcon/></button></NavLink> 
                  <NavLink to={`edit/${element._id}`}><button className="btn btn-primary"><EditIcon/></button></NavLink>  
                    <button className="btn btn-danger" onClick={()=>deleteuser(element._id)}><DeleteIcon/></button>
                </td>
            </tr>
      </>
    )
  })
}   
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
