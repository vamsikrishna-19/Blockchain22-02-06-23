import React from 'react'
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const LabellerCard = () => {
  const Navigate = useNavigate();
  return (
    <div className='container my-5'>
      <nav className=' bg-dark p-1'>
        <ul className="nav nav-pills card-header-pills">
          <li className="nav-item mx-2 col-sm">
            <button className="btn btn-dark" onClick={() => {
              Navigate("/Labeller");
            }}>Yet to Label
            </button>
          </li>
          <li className="nav-item mx-2 col-sm">
            <button className="btn btn-dark" onClick={() => {
              Navigate("/Labeller/labelledBugsFeatures");
            }}>Labelled Bugs
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
