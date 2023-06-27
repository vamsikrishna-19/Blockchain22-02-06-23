import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

const EndUserCard = () => {
  const Navigate = useNavigate();
  const navbarStyle = {
    backgroundColor: '#d4bee8'
  };
  return (
    <div className='container my-5'>
      <nav style={navbarStyle}>
        <ul className="nav nav-pills  p-1 card-header-pills">
          <li className="nav-item mx-2 col-sm">
            <button className="btn btn-dark" onClick={() => {
              Navigate("/EndUser")
            }}>End User Feedback
            </button>
          </li>
          <li className="nav-item mx-2 col-sm">
            <button className="btn btn-dark" onClick={() => {
              Navigate("/EndUser/getUpdates")
            }}> End User gets Updates
            </button>
          </li>
        </ul>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default EndUserCard
