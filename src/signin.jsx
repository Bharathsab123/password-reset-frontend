import { useState } from "react"
import { Link,useNavigate } from 'react-router-dom'


function Signin() {
  const[isloading,setloading]=useState("submit")
    const [codedata,setcodedata]=useState("")
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit =async (e) => {
      setloading("Loading...")
      e.preventDefault()
        try{
            const res=await fetch("https://password-reset-3uky.onrender.com/signup",{
                method:"POST",
                body:JSON.stringify({email : email,password:password}),
                headers:{"content-Type":"application/json"},
               
            })
            .then((res)=>res.json())
            .then((data)=> allfunction(data.code))
        
        }catch(err){
          setloading("submit")
          setcodedata("Unable to fetch , try again")
            return err
            
        }}

        const allfunction=(data)=>{
            if(data===200){
              setloading("submit")
                navigate("/home")
                setcodedata("user found")
            }
           else if(data===404){
            setloading("submit")
            setcodedata("Password Incorrect")
           }
           else{
            setloading("submit")
            setcodedata("User not found")}
        }

    return (
      <form onSubmit={handleSubmit}>
        <div className="items">
        <img src="https://cdn.dribbble.com/users/1018473/screenshots/5344535/login.png" alt="" />
        <div className="items2">
      <div className="signup">
        <h1>Welcome back !</h1>
        <input
          type="email"
          placeholder="email"
          className="input"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="input"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="error">{codedata}</p>
        <button type="submit">{isloading}</button>
        <Link to="/forget" className="flink">Forget Password?</Link>
      </div>
      </div>
      </div>
      </form>
    )

            }


export default Signin