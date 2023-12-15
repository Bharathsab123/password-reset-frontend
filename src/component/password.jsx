import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Password(){
    const[isloading,setloading]=useState("SUBMIT")
    const[enable,setenable]=useState(false)
    const [cpassword,setcpassword]=useState("")
    const [npassword,setnpassword]=useState("")
    const[message,setmessage]=useState("")
    const {OTP}=useParams()
    
    const handlepass=async(e)=>{
        e.preventDefault()
        setloading("Loading...")
        console.log(OTP)
        try{
            const res =await fetch(`https://password-reset-3uky.onrender.com/reset/password/${OTP}`,{
                method:"POST",
                body:JSON.stringify({npassword:npassword,cpassword:cpassword}),
                headers:{"content-Type":"application/json"},
               
            })
            .then((res)=>res.json())
            .then((data)=> userpass(data.code))
        
        }catch(err){
            
            setmessage("Unable to fetch, try again")
            setloading("SUBMIT")
            console.log(err) 
        }
    }
        const userpass=(code)=>{
            if(code===406){
                setloading("SUBMIT")
                setmessage("Password is not match")}
            else if(code===405){
                setloading("SUBMIT")
                setmessage("Unknown error please try again")}
            else {
                setloading("SUBMIT")
                setenable(true)
                setmessage("password is reset sucessfully👍")}
        }
    
    
        return(
            <form onSubmit={handlepass}>
            <div className="forget">
            <div className="newpass">
            <p>Enter your New password</p>
            <input type="text" value={npassword} onChange={(e)=>setnpassword(e.target.value)} required/>
            <p> Retype your password</p>
            <input type="text" value={cpassword} onChange={(e)=>setcpassword(e.target.value)} required/>
            <p className="error">{message}</p>
            <button type="submit" disabled={enable} >{isloading}</button>
            <p className="flink">Go to Login page ? <Link to="/signin">Sign In</Link></p>
            </div>
            </div>
            </form>
        )
    }
    export default Password
