import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Web3Contract2 from './Web3Contract2';
import Axios from 'axios';
import { useLocation } from 'react-router-dom';
import PageNotFound from './PageNotFound';
const VerifierCard = () => {
  const Web3Contract=Web3Contract2();
  const contract2=Web3Contract[0];
  const [count,setCount]=useState(0);
  const Navigate = useNavigate();
  const navbarStyle = {
    backgroundColor: '#FFA07A'
  };
  const [Role,setRole]=useState("");
  useEffect(() => {
      const token = sessionStorage.getItem("token");
      const fetchRole = async () => {
          try {
              // http://localhost:3001/api/data
              const res =await Axios.get('http://localhost:3001/api/role', {
                  headers:{
                      authorization: `Bearer ${token}`,
                  }
              })
              // const { role } = res.data;
              setRole(res.data);
              console.log(res.data);
          }
          catch(error){
              console.log(error);
          }
          
      }
      if(token){
          fetchRole();
      }
  })
  const location = useLocation();
  const [url, setUrl] = useState(null);

  useEffect(() => {
    setUrl(location.pathname);
    console.log(location.pathname)
  }, [location]);
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
  const navWrapperStyle = {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '0px 0px 60px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
  };
  return (
    <>
    {
      Role == "Verifier" &&
    
    <div className='container my-5 '>
      <div>
        <h3>
          Verifier
        </h3>
      </div>
      <div  style={navWrapperStyle}>
      <nav className=' p-1' style={navbarStyle}>
        <ul className="nav nav-pills card-header-pills">
          <li className="nav-item mx-2 col-sm">
            <button className="btn btn-dark position-relative" 
            style={url === "/Verifier" ? { backgroundColor: "Indigo", borderColor: "blue" } : null}
            onClick={() => {
              Navigate("/Verifier");
            }}>Yet To Verify
              {count > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {count}
                </span>
              )}

            </button>
          </li>
          <li className="nav-item mx-2 col-sm">
            <button className="btn btn-dark"
              style={url === "/Verifier/verified" ? { backgroundColor: "Indigo", borderColor: "blue" } : null}

             onClick={() => {
              Navigate("/Verifier/verified");
            }}>Verified Patches
            </button>
          </li>
          <li className="nav-item mx-2 col-sm">
            <button className="btn btn-dark"
                style={url === "/Verifier/VerifierRejected" ? { backgroundColor: "Indigo", borderColor: "blue" } : null}

             onClick={() => {
              Navigate("/Verifier/VerifierRejected");
            }}>Verifier Rejected
            </button>
          </li>
          <li className="nav-item mx-2 col-sm">
            <button className="btn btn-dark" 
            style={url === "/Verifier/transactionHistory" ? { backgroundColor: "Indigo", borderColor: "blue" } : null}

            onClick={() => {
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
                Role != "Verifier"   && Role!="" && (
                    <div>
                        <PageNotFound />
                    </div>
                )
            }
  </>
  )
}

export default VerifierCard
