import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';

const Signup = (props) => {
  const host = "http://localhost:5000"
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ name: "", email: "example@gmail.com", password: "", cpassword: "" })
  const { name, email, password, cpassword } = credentials;

  const handleOnSubmit = async (e) => {
    e.preventDefault()  
    if (password !== cpassword) {
      props.showAlert("Confirm Password & Password must be same!!", "danger")
      return;
    }
    try {
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      })
      const jsonData = await response.json();
      console.log(jsonData);
      if (jsonData.success) {
        localStorage.setItem("token", jsonData.authtoken)
        props.showAlert("Account Created Successfully!!", "success")
        navigate("/notebook")

      } else {
        props.showAlert("This email Id already in use Please login!!", "danger")
      }
    } catch (error) {
      console.log('Error:', error);
    };
  }

  const onChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value })
  }
  return (
    <div className='container my-5'>
      <h2 className='mb-3'>Create Account to continue to iNotebook</h2>
      <form  onSubmit={handleOnSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name='name' onChange={onChange} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' value={email} aria-describedby="emailHelp" onChange={onChange} required />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} minLength={5} required />
          
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <p className='mt-4'>Already have a account  <Link to="/login">login here</Link> </p>
    </div>
  )
}

export default Signup
