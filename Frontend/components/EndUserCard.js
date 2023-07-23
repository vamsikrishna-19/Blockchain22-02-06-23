import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import Axios from 'axios'
import { useLocation } from 'react-router-dom'
import {useState, useEffect } from 'react'
const EndUserCard = () => {
  const Navigate = useNavigate();
  const navbarStyle = {
    backgroundColor: '#FFA07A'
  };
  const [Role, setRole] = useState("");
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const fetchRole = async () => {
      try {
        const res = await Axios.get('http://localhost:3001/api/role', {
          headers: {
            authorization: `Bearer ${token}`,
          }
        })
        // const { role } = res.data;
        setRole(res.data);
        console.log(res.data);
      }
      catch (error) {
        console.log(error);
      }
    }
    if (token) {
      fetchRole();
    }
  },[])
  const location = useLocation();
  const [url, setUrl] = useState(null);

  useEffect(() => {
    setUrl(location.pathname);
    console.log(location.pathname)
  }, [location]);
  const navWrapperStyle = {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '0px 0px 60px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
};
  return (
    
    <div className='container my-3'>
      <div>
        <h3>
          End User
        </h3>
        
      </div>
      <div style={navWrapperStyle}>

   
      <nav style={navbarStyle}>
        <ul className="nav nav-pills  p-1 card-header-pills">
          <li className="nav-item mx-2 col-sm">
            <button className={`btn btn-dark btn-block ${url == "/EndUser" ? " active" : ""}`} onClick={() => {
              Navigate("/EndUser")
            }}>End User Feedback
            </button>
          </li>
          <li className="nav-item mx-2 col-sm">
            <button className={`btn btn-dark btn-block ${url == "/EndUser/getUpdates" ? " active" : ""}`} onClick={() => {
              Navigate("/EndUser/getUpdates")
            }}> End User Gets Updates
            </button>
          </li>
        </ul>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
    </div>
  
 
  )
}

export default EndUserCard
