import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom';
import Web3Contract2 from './Web3Contract2';
import Axios from 'axios';
import { useLocation } from 'react-router-dom';
import PageNotFound from './PageNotFound';
function DeveloperCard() {
  const Navigate = useNavigate();
  const navbarStyle = {
    backgroundColor: '#FFA07A'
  };
  const Web3Contract = Web3Contract2();
  const contract2 = Web3Contract[0];
  const [requestNumberArr, setrequestNumberArr] = useState([]);
  const [RequestCount, setRequestedCount] = useState(0);

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
  }, [])
  const [dataArray2, setdataArray2] = useState([]);
  const [flag, setFlag] = useState(false);
  const [patchObject, setPatchObject] = useState({});
  useEffect(() => {
    let requestnoarr = [];
    if (contract2) {
      try {
        contract2.methods.getdetails().call().then((res) => {
          console.log(res.length + 1);
          for (let i = 0; i < res.length; i++) {
            requestnoarr.push(res[i].requestnumber);
            // setrequestNumberArr((reqNo) => ([...reqNo, res[i].requestnumber]));
          }
          console.log(requestnoarr);
        });

        contract2.methods.getdetailsRequest().call().then((result) => {
          let RequestCount1 = 0;
          result.map((data) => {
            console.log(data.bugs);
            if (!requestnoarr.includes(data.requestno)) {
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
    if (contract2) {
      try {
        contract2.methods.getdetails().call().then((res) => {
          console.log(res.length + 1);
          console.log(res);
          setdataArray2(res);
          let Array = [];
          let patchObj = {};
          for (let i = 0; i < res.length; i++) {
            if (res[i].verificationstatus == "Verified" || res[i].verificationstatus == "IN PROGRESS") {
              // setrequestNumberArr((reqNo) => ([...reqNo, res[i].requestnumber]));
              Array.push(res[i].requestnumber);
            }
          }
          res.forEach(patch => {
            // setPatchObject((prev) => ({ ...prev, [patch.requestnumber]: patch.patchno }));
            patchObj[patch.requestnumber] = patch.patchno;
          });
          let count = 0;
          {
            res.map((data) => {
              if (patchObj[data.requestnumber] == data.patchno && data.verificationstatus == "Rejected" && !Array.includes(data.requestno)) {
                count++;
              }
            })
          }
          // console.log(count);

          setRejectedCount(count);

          // setFlag(true);
        });
      }
      catch (error) {
        console.error(error);
      }
    }
  }, [contract2, RequestCount])

  const [RejectedCount, setRejectedCount] = useState(0);
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
    <>
      {
        Role == "Developer" &&
        <div className='container my-3'>
          <div>
            <h3>
              Developer
            </h3>
          </div>
          <div className='navWrapperStyle' style={navWrapperStyle}>

            <nav style={navbarStyle}>
              <ul className="nav nav-pills p-1 card-header-pills">
                <li className="nav-item mx-2 col-sm">
                  <button className={`btn btn-dark position-relative btn-block ${url == "/Developer" ? " active" : ""}`}
                    style={url === "/Developer" ? { backgroundColor: "Indigo", borderColor: "blue" } : null}
 
                  onClick={() => {
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
                  <button className={`btn btn-dark position-relative btn-block ${url == "/Developer/Rejectedpatches" ? " active" : ""}`}
                    style={url === "/Developer/Rejectedpatches" ? { backgroundColor: "Indigo", borderColor: "blue" } : null}
                   onClick={() => {
                    Navigate("/Developer/Rejectedpatches");
                  }}> Rejected Patches
                    {RejectedCount > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {RejectedCount}
                      </span>
                    )}
                  </button>
                </li>
                <li className="nav-item mx-2 col-sm">
                  <button className={`btn btn-dark btn-block ${url == "/Developer/transactionHistory" ? " active" : ""}`}
                   style={url === "/Developer/transactionHistory" ? { backgroundColor: "Indigo", borderColor: "blue" } : null}

                   onClick={() => {
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
        </div>
      }
      {
                Role=="" && (
                    <div className='container d-flex justify-content-center my-5'>
                        <br /><br />
                        <h3>
                            Loading...
                        </h3>
                    </div>
                )
            }
      {
        Role != "Developer" && Role != "" && (
          <div>
            <PageNotFound />
          </div>
        )
      }
    </>
  )
}

export default DeveloperCard

