import { Link, Route, Routes } from "react-router-dom"
import React from "react"
import Forget from "./forget"
import Signin from "./signin"
import Signup from "./Signup"
import Home from "../home"
import Otp from "./otp"
import Password from "./password"
import './App.css'

function App() {
 

  return (
    <>
     <div className="cointainer">
      <div className="header">
        <h3>welcome app</h3>
      <nav>
        <p><Link to="/" className="hlink">Sign Up</Link></p>
        <p><Link to="/signin" className="hlink">Sign In</Link></p> 
      </nav>
      </div>
      

      <Routes>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/" element={<Signup/>}/>
        <Route path="/forget" element={<Forget/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/otp" element={<Otp/>}/>
        <Route path="/otp/password/:OTP"  element={<Password/>}/>

      </Routes>
     </div>
    </>
  )
}

export default App
