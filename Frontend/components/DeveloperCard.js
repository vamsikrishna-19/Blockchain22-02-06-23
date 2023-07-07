import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom';
import Web3Contract2 from './Web3Contract2';
function DeveloperCard() {
  const Navigate = useNavigate();
  const navbarStyle = {
    backgroundColor: '#d4bee8'
  };
  const Web3Contract = Web3Contract2();
  const contract2 = Web3Contract[0];
  const [requestNumberArr, setrequestNumberArr] = useState([]);
  let requestnoarr = [];
  const [RequestCount, setRequestedCount] = useState(0);
  // useEffect(() => {
  //   // Perform any common logic or actions needed by all child components here
  //   // This code will be executed whenever the dependency changes
  // }, [RequestedCount, RejectedCount2]);
  useEffect(() => {
    if (contract2) {
      try {


        contract2.methods.getdetails().call().then((res) => {
          console.log(res.length + 1);
          for (let i = 0; i < res.length; i++) {
            requestnoarr.push(res[i].requestnumber);
            setrequestNumberArr((reqNo) => ([...reqNo, res[i].requestnumber]));
          }
          console.log(requestnoarr);
        });

        contract2.methods.getdetailsRequest().call().then((result) => {
          let RequestCount1 = 0;
          result.map((data) => {
            console.log(data.bugs);
            if (!requestNumberArr.includes(data.requestno)) {
              RequestCount1 += 1;
            }
          })
          setRequestedCount(RequestCount1);
        });
      }
      catch (error) {
        console.log(error);
      }
    }
  }, [contract2,RequestCount])
  return (
    <div className='container my-5'>
      <nav style={navbarStyle}>
        <ul className="nav nav-pills p-1 card-header-pills">
          <li className="nav-item mx-2 col-sm">
            <button className="btn btn-dark position-relative" onClick={() => {
              Navigate("/Developer")
            }}>Patch Requests
              {RequestCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {RequestCount}
                </span>
              )}
            </button>
          </li>

          <li className="nav-item mx-2 col-sm">
            <button className="btn btn-dark position-relative" onClick={() => {
              Navigate("/Developer/Rejectedpatches");
            }}> Rejected Patches

              {/* {RejectedCount2  && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {RejectedCount2}
                </span>
              )} */}
            </button>
          </li>
          <li className="nav-item mx-2 col-sm">
            <button className="btn btn-dark" onClick={() => {
              Navigate("/Developer/transactionHistory");
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

export default DeveloperCard

