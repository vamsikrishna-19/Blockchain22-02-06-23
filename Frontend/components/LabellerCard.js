import React from 'react'
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const LabellerCard = () => {
  const Navigate = useNavigate();
  const navbarStyle = {
    backgroundColor: '#d4bee8'
  };
  return (
    <div className='container my-5'>
      <nav className='p-1' style={navbarStyle}>
        <ul className="nav nav-pills card-header-pills">
          <li className="nav-item mx-2 col-sm">
            <button className="btn btn-dark" onClick={() => {
              Navigate("/Labeller/labellerSolvesUserFeedBack");
            }}>User Feedback
            </button>
          </li>
          <li className="nav-item mx-2 col-sm">
            <button className="btn btn-dark" onClick={() => {
              Navigate("/Labeller");
            }}>Yet To Label
            </button>
          </li>
          <li className="nav-item mx-2 col-sm">
            <button className="btn btn-dark" onClick={() => {
              Navigate("/Labeller/labelledBugsFeatures");
            }}>Labelled Bugs
            </button>
          </li>
          <li className="nav-item mx-2 col-sm">
            <button className="btn btn-dark" onClick={() => {
              Navigate("/Labeller/transactionHistory");
            }}>Transaction History
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

export default LabellerCard
