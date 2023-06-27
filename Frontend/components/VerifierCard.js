import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const VerifierCard = () => {
  const Navigate = useNavigate();
  const navbarStyle = {
    backgroundColor: '#d4bee8'
  };
  return (
    <div className='container my-5 '>
      <nav className=' p-1' style={navbarStyle}>
        <ul className="nav nav-pills card-header-pills">
          <li className="nav-item mx-2 col-sm">
            <button className="btn btn-dark" onClick={() => {
              Navigate("/Verifier");
            }}>Yet To verify
            </button>
          </li>
          <li className="nav-item mx-2 col-sm">
            <button className="btn btn-dark" onClick={() => {
              Navigate("/Verifier/verified");
            }}>Verified Patches
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

export default VerifierCard
