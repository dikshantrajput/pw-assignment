import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignIn({setAuth,setUser}) {
  const navigate = useNavigate();
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");

  const handleInput = (e) => {
    const contact = e.target.value;
    setContact(contact);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let data = {contact}
    try{    

        const response = await axios.post('http://localhost:8001/user/login',data);
        if(response?.data?.data === true){
            navigate("/")
            localStorage.setItem("auth", JSON.stringify(true));
            localStorage.setItem("user", JSON.stringify(response?.data?.user));
            setAuth(true)
            setUser(response?.data?.user)
        }else{
            alert(response?.data?.data)
        }

    }catch(err){
        alert("Error")
        console.log(err)
    }
  };

  return (
    <div className="login">
      <form className="login-form">
        {error && <p>{error}</p>}
        <div className="mb-3">
          <h5 className="form-label">Phone No.</h5>
          <input onChange={handleInput} type="text" className="form-control" />
        </div>
        <button onClick={handleLogin} type="submit" className="btn btn-primary" style={{width:'100%'}}>
          Login
        </button>
      </form>
    </div>
  );
}

export default SignIn;