import React from 'react'
//import { BrowserRouter  ,Routes,Route } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Navbar from './component/Navbar'
import Home from './component/Home'
import "./App.css";
import Register from './component/Register'
import Edit from './component/Edit'
import Details from './component/Details'
import { Routes,Route } from 'react-router-dom'
const App = () => {
  return (
    <>
<Navbar/>
<Routes>
  <Route exact path='/' element={<Home/>}></Route>
  <Route path='/register' element={<Register/>}></Route>
  <Route exact path='/edit/:id' element={<Edit/>}></Route>
  <Route exact path='/view/:id' element={<Details/>}></Route>
</Routes>

    </>
  )
}

export default App
