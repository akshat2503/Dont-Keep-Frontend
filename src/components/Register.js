import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './Login.css'

export default function Register() {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000'
        const response = await fetch(`${apiUrl}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        setLoading(false);
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            navigate("/");
        } else {
            toast.error("User already exists!", { position: "bottom-left", autoClose: 2000, hideProgressBar: true, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, theme: "dark", })
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='container d-flex flex-column align-items-center justify-content-center' style={{ height: '100vh' }}>
            <ToastContainer />
            <div className="box-login p-5">
                <div className="top-text d-flex align-items-center flex-column">
                    <h1 className='mb-3'>Don't Keep</h1>
                    <h3 className='mb-2'>Create Account</h3>
                    <p className='mb-4'>Use your email to register    </p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <input type="text" className="email-input p-3" name="name" placeholder='Name' onChange={onChange} value={credentials.name} required />
                    </div>
                    <div className="mb-2">
                        <input type="email" className="email-input p-3" name="email" placeholder='Email' onChange={onChange} value={credentials.email} required />
                    </div>
                    <div className="mb-2">
                        <input type="password" className="email-input p-3" name="password" placeholder='Password' onChange={onChange} value={credentials.password} required minLength={5}/>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                        <Link to="/login" className='nav-link create-account'>Login</Link>
                        <button type="submit" className="btn submit-btn">
                            <img width="20px" style={{ display: `${loading ? "" : "none"}` }} src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca.gif" alt="" />
                            <p style={{ margin: "0", display: `${loading ? "none" : ""}` }}>Create Account</p>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
