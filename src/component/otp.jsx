import { Minimize } from "@mui/icons-material";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Otp(){
    const[isloading,setloading]=useState("Enter OTP")
    const [OTP,setotp]=useState("")
    const[message,setmessage]=useState("")
    const navigate = useNavigate()
    


    const handleotp=async(e)=>{
        setloading("Loading...")
        e.preventDefault()
        try{
            const res =await fetch("https://password-reset-3uky.onrender.com/reset/otp",{
                method:"POST",
                body:JSON.stringify({OTP:OTP}),
                headers:{"content-Type":"application/json"},
               
            })
            .then((res)=>res.json())
            .then((data)=> userotp(data.code))
        
        }catch(err){
            setloading("Enter OTP")
            setmessage("Unable to fetch , try again")
            console.log(err) 
        }
    }
        const userotp=(code)=>{
            if(code===405){
                setloading("Enter OTP")
                setmessage("OTP unmatch")}
            else {
                setloading("Enter OTP")
                navigate(`password/${OTP}`)
                setmessage("OTP match")}
        }
    
    
        return(
            <form onSubmit={handleotp}>
            <div className="forget">
            <div className="entermail">
            <p>Enter your OTP</p>
            <input type="text" value={OTP} onChange={(e)=>setotp(e.target.value)}minLength={6}  maxLength={6}required/>
            <p className="error">{message}</p>
            <button type="submit">{isloading}</button>
            </div>
            </div>
            </form>
        )
    }
    export default Otp