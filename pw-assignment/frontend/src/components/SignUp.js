import React,{useState} from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios"

function SignUp() {
  const navigate = useNavigate();

  const [contact,setContact]=useState('');
  const [name,setName]=useState('');

  const handleInput = (e) => {
    const contact = e.target.value;
    setContact(contact)
  }

  const handleNameInput = (e) => {
    const name = e.target.value;
    setName(name)
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    let data = {
        name,contact
    }
    try{

        const response = await axios.post('http://localhost:8001/user/register',data);
        if(response?.data?.data === true){
            navigate("/sign-in")
            localStorage.setItem("auth", JSON.stringify(true));
            localStorage.setItem("user", JSON.stringify({name,contact}));
        }else{
            alert(response?.data?.data)
        }

    }catch(err){
        alert("Error")
        console.log(err)
    }
  }

  return (
    <div className="register">
      <form className="register-form">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Phone No.
          </label>
          <input onChange={handleInput} type="text" class="form-control" />
          <label for="exampleInputEmail1" class="form-label">
            Name
          </label>
          <input onChange={handleNameInput} type="text" class="form-control" />
        </div>
        <button onClick={handleRegister} type="submit" class="btn btn-primary" style={{width:'100%'}}>
          Register
        </button>
      </form>
    </div>
  );
}

export default SignUp;