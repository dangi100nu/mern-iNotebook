import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
const Login = (props) => {
  const host = "http://localhost:5000"
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: "example@gmail.com", password: "" })

  const handleOnSubmit = async (e) => {
    e.preventDefault()  
    try {
      const response = await fetch(`${host}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password })
      })
      const jsonData = await response.json();
      console.log(jsonData);
      if (jsonData.success) {
        localStorage.setItem("token", jsonData.authtoken)
        props.showAlert("Logged in Successfully!!", "success")
        navigate("/notebook")

      } else {
        props.showAlert("Invalid Email and password!!", "danger")
      }
    } catch (error) {
      console.log('Error:', error);
    };
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className='container my-5'>
      <h2 className='mb-3'>Login first to continue to iNotebook</h2>
      <form onSubmit={handleOnSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' value={credentials.email} aria-describedby="emailHelp" onChange={onChange} />

          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <p className='mt-4'>create a new account <Link to="/signup">click here</Link> </p>
    </div>
  )
}

export default Login
