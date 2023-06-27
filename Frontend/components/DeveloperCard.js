import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom';
function DeveloperCard() {
 const Navigate=useNavigate();
 const navbarStyle = {
  backgroundColor: '#d4bee8'
};
  return (
    <div className='container my-5  '>
    <nav style={navbarStyle}>
        <ul className="nav nav-pills p-1 card-header-pills">
					<li className="nav-item mx-2 col-sm">
                        <button className="btn btn-dark" onClick={()=>{
                          Navigate("/Developer")
                        }}>Developer gets Request
                        </button>
                    </li>
                    {/* <li className="nav-item mx-2 col-sm">
                        <button className="btn btn-dark" onClick={()=>{
                          Navigate("/Developer/createsPatches")
                        }}>   Developer Patch Creation
                          </button>
                    </li> */}
                    <li className="nav-item mx-2 col-sm">
                        <button className="btn btn-dark" onClick={()=>{
                          Navigate("/Developer/Rejectedpatches");
                        }}>Developer Gets Rejected patches
                            Patches</button>
                    </li>
				</ul>
    </nav>
    <div>
      <Outlet/>
    </div>
    </div>
  )
}

export default DeveloperCard

