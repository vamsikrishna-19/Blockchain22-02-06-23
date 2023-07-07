import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Web3Contract2 from './Web3Contract2';
const VerifierCard = () => {
  const Web3Contract=Web3Contract2();
  const contract2=Web3Contract[0];
  const [count,setCount]=useState(0);
  const Navigate = useNavigate();
  const navbarStyle = {
    backgroundColor: '#d4bee8'
  };
  useEffect(() => {
    if (contract2) {
      try {
        contract2.methods.getdetails().call().then((result) => {


          let count = 0;
          result.map((data, dataIndex) => {
            if (data.verificationstatus == "IN PROGRESS") {
              count += 1;
            }
          })
          setCount(count);
        });
      }
      catch (error) {
        console.log(error);
      }
    }
  }, [contract2])
  return (
    <div className='container my-5 '>
      <nav className=' p-1' style={navbarStyle}>
        <ul className="nav nav-pills card-header-pills">
          <li className="nav-item mx-2 col-sm">
            <button className="btn btn-dark position-relative" onClick={() => {
              Navigate("/Verifier");
            }}>Yet To verify
              {count > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {count}
                </span>
              )}

            </button>
          </li>
          <li className="nav-item mx-2 col-sm">
            <button className="btn btn-dark" onClick={() => {
              Navigate("/Verifier/verified");
            }}>Verified Patches
            </button>
          </li>
          <li className="nav-item mx-2 col-sm">
            <button className="btn btn-dark" onClick={() => {
              Navigate("/Verifier/transactionHistory");
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

export default VerifierCard
