import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './Login.css'

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000'
    const response = await fetch(`${apiUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    setLoading(false);
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      navigate("/");
    } else {
      toast.error("Incorrect Credentials!", { position: "bottom-left", autoClose: 2000, hideProgressBar: true, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, theme: "dark", })
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className='container d-flex flex-column align-items-center justify-content-center' style={{ height: `${window.innerWidth>768?'100vh':'90vh'}`, maxWidth: '100vw'}}>
      <ToastContainer />
      <div className={`box-login ${window.innerWidth>768?'p-5':'p-4'}`} style={{width: `${window.innerWidth>768 ? '27rem': '22rem'}`}}>
        <div className="top-text d-flex align-items-center flex-column">
          <h1 className='mb-4'>Don't Keep</h1>
          <h3 className='mb-2'>Sign In</h3>
          <p className='mb-4'>Use your registered email to login</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input type="email" className="email-input p-3" placeholder='Email' name='email' onChange={onChange} value={credentials.email} required />
          </div>
          <div className="mb-4  ">
            <input type="password" className="email-input p-3" placeholder='Password' name='password' onChange={onChange} value={credentials.password} required />
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <Link to="/register" className='nav-link create-account'>Create Account</Link>
            <button type="submit" className="btn submit-btn">
              <img width="20px" style={{ display: `${loading ? "" : "none"}` }} src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif" alt="" />
              <p style={{ margin: "0", display: `${loading ? "none" : ""}` }}>Login</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
