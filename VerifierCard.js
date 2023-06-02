import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const VerifierCard = () => {
  const Navigate=useNavigate();
  return (
    <div className='container my-5 '>
    <nav className='bg-dark p-1'>
        <ul className="nav nav-pills card-header-pills">
					<li className="nav-item mx-2 col-sm">
                        <button className="btn btn-dark" onClick={()=>{
                        Navigate("/Verifier");
                    }}>Yet To verify
                        </button>
                    </li>
                    
                    
				</ul>
    </nav>

    <div>
          <Outlet/>
    </div>

    </div>
  )
}

export default VerifierCard
