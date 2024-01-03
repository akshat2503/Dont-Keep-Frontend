import React from 'react';
import './Navbar.css';
import loadingGif from '../loadingGif-unscreen.gif'
import { useNavigate, Link } from 'react-router-dom';

export default function Navbar(props) {
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  }
  if (window.innerWidth < 768) {
    props.setSidebarVisible(false);
  }
  const handleSvgCLick = () => {
    if (props.sidebarVisible) {
      props.setSidebarVisible(false);
      console.log(props.sidebarVisible)
    } else {
      props.setSidebarVisible(true);
      console.log(props.sidebarVisible)
    }
  }
  return (
    <>
      <div>
        <nav className="navbar fixed-top">
          <div className="container-fluid d-flex justify-content-between">
            <div className='d-flex align-items-center'>
              <div onClick={handleSvgCLick} className='svgDiv'>
                <svg fill="#FFFFFFDE">
                  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
                </svg>
              </div>
              <img width="40px" src="https://www.gstatic.com/images/branding/product/2x/keep_2020q4_48dp.png" alt="Logo" />
              <Link className="navbar-brand ms-2" to="/" style={{ fontFamily: "Roboto", fontWeight: "500", letterSpacing: "0.5px" }}>Don't Keep</Link>
            </div>
            {/* <div className='inputDiv d-flex align-items-center'>
              <div className="inputSvgDiv">
                <svg fill="#FFFFFFDE">
                  <path d="M20.49,19l-5.73-5.73C15.53,12.2,16,10.91,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.41,0,2.7-0.47,3.77-1.24L19,20.49L20.49,19z M5,9.5C5,7.01,7.01,5,9.5,5S14,7.01,14,9.5S11.99,14,9.5,14S5,11.99,5,9.5z"></path>
                </svg>
              </div>
              <input className='nav-input' type="text" placeholder='Search' />
            </div> */}
            <div>
              <img height="24px" className='loadingGif me-3' src={loadingGif} alt="" />
              <button className="btn btn-secondary mx-2" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </nav>
      </div>
      <div className="placeholder"></div>
    </>
  )
}
