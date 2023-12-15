import React from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useState } from "react";

function Signup() {
  const[isloading,setloading]=useState("Submit")
  const [user, setuser] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const createuser = async (e) => {
    setloading("Loading...")
    e.preventDefault();
    try {
      const res = await fetch("https://password-reset-3uky.onrender.com/user", {
        method: "POST",
        body: JSON.stringify({ email: email, password: password }),
        headers: { "content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => userdata(data.code));
    } catch (err) {
      setloading("Submit")
      setuser("Unable to fetch , try again");
    }
  };

  const userdata = (data) => {
    if (data === 200) {
      setloading("Submit")
      navigate("/home")
      
    } else if (data === 405) {
      setloading("Submit")
      setuser("user already exist");
    } else {
      setloading("Submit")
      setuser("error in signup");
    }
  };

  return (
<form onSubmit={createuser}>
    <div className="items">
      <img src="https://static.vecteezy.com/system/resources/previews/003/689/228/original/online-registration-or-sign-up-login-for-account-on-smartphone-app-user-interface-with-secure-password-mobile-application-for-ui-web-banner-access-cartoon-people-illustration-vector.jpg" alt="" />
      <div className="items2">
    <div className="signup">
      
      <h1>Create Account</h1>
      <input
        type="email"
        placeholder="email"
        className="input"
        value={email}
        required
        onChange={(e) => setemail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        className="input"
        value={password}
        required
        onChange={(e) => setpassword(e.target.value)}
      />
      <p className="error">{user}</p>
      <button type="submit" >{isloading}</button>
    
      <p className="sulink">Do you have Account ?<Link to="/signin" className="link">Sign In</Link></p>
      
    </div>
    </div>
    </div>
    </form>
  );
}

export default Signup;
