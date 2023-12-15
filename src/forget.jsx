import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Forget(){
const[isloading,setloading]=useState("SUBMIT")
const [emails,setemail]=useState("")
const[message,setmessage]=useState("")
const navigate = useNavigate()

const handelemail=async(e)=>{
    setloading("Loading...")
    e.preventDefault()
    try{
        const res =await fetch("https://password-reset-3uky.onrender.com/reset",{
            method:"POST",
            body:JSON.stringify({email : emails}),
            headers:{"content-Type":"application/json"},
           
        })
        .then((res)=>res.json())
        .then((data)=> useremail(data.code))
    
    }catch(err){
        setmessage("Unable to fetch , try again")
        setloading("SUBMIT")
        console.log(err) 
    }
}
    const useremail=(code)=>{
        if(code===401){setmessage("Unable to Sent OTP please try again")}
        else if(code===402){
            setloading("SUBMIT")
            setmessage("user not found")}
        else if(code===503){
            setloading("SUBMIT")
            setmessage(code,"Somthing is wrong")}
        else {
            setloading("SUBMIT")
            navigate("/otp")
            setmessage("email sent successfully")
        
        }
    }


    return(
        <form onSubmit={handelemail}>
        <div className="forget">
        <div className="entermail">
        <p>Enter your Email</p>
        <input type="text" value={emails} required onChange={(e)=>setemail(e.target.value)}/>
        <p className="error">{message}</p>
        <button type="submit">{isloading}</button>
        
        </div>
        </div>
        </form>
    )
}
export default Forget