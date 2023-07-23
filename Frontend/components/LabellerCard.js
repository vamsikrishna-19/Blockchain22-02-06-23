import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import PageNotFound from './PageNotFound';
import { useLocation } from 'react-router-dom';
const LabellerCard = () => {
  const Navigate = useNavigate();
  const navbarStyle = {
    backgroundColor: '#FFA07A'
  };
  const token = sessionStorage.getItem("token")
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
      {/* {isLabeller && */}
      {
        Role == "Labeller" &&

        <div className='container my-3'>
          <div>
            <h3>
              Labeller
            </h3>
          </div>
          <div className='nav-wrapper ' style={navWrapperStyle}>
            <nav className='p-1 flex-wrap' style={navbarStyle}>
              <ul className="nav nav-pills card-header-pills">
                <li className="nav-item mx-2 col-sm">
                  <button className={`btn btn-dark btn-block ${url == "/Labeller/labellerSolvesUserFeedBack" ? " active" : ""}`}
                    style={url === "/Labeller/labellerSolvesUserFeedBack" ? { backgroundColor: "Indigo", borderColor: "blue" } : null}

                    onClick={() => {
                      Navigate("/Labeller/labellerSolvesUserFeedBack");

                    }}>User Feedback
                  </button>
                </li>
                <li className="nav-item mx-2 col-sm">
                  <button className={`btn btn-dark btn-block ${url == "/Labeller" ? " active" : ""}`}
                    style={url === "/Labeller" ? { backgroundColor: "Indigo", borderColor: "blue" } : null}

                    onClick={() => {
                      Navigate("/Labeller");
                    }}>Yet To Label
                  </button>
                </li>
                <li className="nav-item mx-2 col-sm">
                  <button className={`btn btn-dark btn-block ${url == "/Labeller/labelledBugsFeatures" ? " active" : ""}`}
                    style={url === "/Labeller/labelledBugsFeatures" ? { backgroundColor: "Indigo", borderColor: "blue" } : null}

                    onClick={() => {
                      Navigate("/Labeller/labelledBugsFeatures");
                    }}>Labelled Bugs
                  </button>
                </li>
                <li className="nav-item mx-2 col-sm">
                  <button className={`btn btn-dark btn-block ${url == "/Labeller/transactionHistory" ? " active" : ""}`}
                    style={url === "/Labeller/transactionHistory" ? { backgroundColor: "Indigo", borderColor: "blue" } : null}

                    onClick={() => {
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
        </div>
      }
      {
        Role == "" && (
          <div className='container d-flex justify-content-center my-5'>
            <br /><br />
            <h3>
              Loading...
            </h3>
          </div>
        )
      }
      {
        Role != "Labeller" && Role != "" && (
          <div>
            <PageNotFound />
          </div>
        )
      }
      {/* }  */}
    </>
  )
}

export default LabellerCard
