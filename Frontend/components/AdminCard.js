import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Web3Contract2 from './Web3Contract2';
import PageNotFound from './PageNotFound';
import { useLocation } from 'react-router-dom';
import Axios from 'axios';
const AdminCard = () => {
    const Navigate = useNavigate();
    const navbarStyle = {
        backgroundColor: '#FFA07A'
    };
    const location = useLocation();
    const [url, setUrl] = useState(null);

    useEffect(() => {
        setUrl(location.pathname);
        console.log(location.pathname)
    }, [location]);


    const Web3Contract = Web3Contract2();
    const contract2 = Web3Contract[0];
    const [Count, setCount] = useState(0);
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
    
      
    useEffect(() => {
        if (contract2) {
            let count = 0;
            try {
                contract2.methods.getdetails().call().then((result) => {

                    result.map((data) => {
                        if (data.deploymentstatus != "Deployed" && data.verificationstatus == "Verified") {
                            count += 1;
                        }
                    })
                    console.log(count);
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
    const activeColor={
        backgroundColor:"red",
        borderColor:"red"
    }   

    return (
        <>
            {
                Role == 'Admin' && (
                    <>
                        <div className='container my-3 '>
                            <div>
                                <h3>
                                    Admin
                                </h3>
                            </div>
                            <div style={navWrapperStyle}>
                                <nav className='p-1' style={navbarStyle}>
                                    <ul className="nav nav-pills  d-flex justify-content-evenly ">
                                        <li className="nav-item mx-2">
                                            <button className={`btn btn-dark btn-block ${url == "/Admin" ? " active" : ""}`}
                                                style={url === "/Admin" ? { backgroundColor: "Indigo", borderColor: "blue" } : null}
                                              onClick={() => {
                                                Navigate("/Admin");
                                            }}>Request Patch
                                            </button>
                                        </li>
                                        <li className="nav-item mx-2">
                                            <button className={`btn btn-dark position-relative btn-block ${url == "/Admin/DeployPatches" ? " active" : ""}`}
                                            style={url === "/Admin/DeployPatches" ? { backgroundColor: "Indigo", borderColor: "blue" } : null}
                                             onClick={() => {
                                                Navigate("/Admin/DeployPatches");
                                            }}>
                                                Deploy Patches
                                                {Count > 0 && (
                                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                        {Count}
                                                    </span>
                                                )}
                                            </button>
                                        </li>
                                        <li className="nav-item mx-2">
                                            <button className={`btn btn-dark btn-block ${url == "/Admin/TrackingPatches" ? " active" : ""}`}
                                            style={url === "/Admin/TrackingPatches" ? { backgroundColor: "Indigo", borderColor: "blue"} : null}

                                            onClick={() => {
                                                Navigate("/Admin/TrackingPatches");
                                            }}>Track Patches</button>
                                        </li>
                                        <li className="nav-item mx-2">
                                            <button className={`btn btn-dark btn-block ${url == "/Admin/TrackUndevelopedRequest" ? " active" : ""}`}
                                            style={url === "/Admin/TrackUndevelopedRequest" ? { backgroundColor: "Indigo", borderColor: "blue" } : null}

                                            onClick={() => {
                                                Navigate("/Admin/TrackUndevelopedRequest");
                                            }}>Undeveloped Patches</button>
                                        </li>
                                        <li className="nav-item mx-2">
                                            <button className={`btn btn-dark btn-block ${url == "/Admin/getsDownloadHistory" ? " active" : ""}`} 
                                            // style={url==="/Admin/getsDownloadHistory" ? activeColor:""}
                                            style={url === "/Admin/getsDownloadHistory" ? { backgroundColor: "Indigo", borderColor: "blue" } : null}
 
                                            onClick={() => {
                                                Navigate("/Admin/getsDownloadHistory");
                                            }}>Download History
                                            </button>
                                        </li>
                                        <li className="nav-item mx-2">
                                            <button className={`btn btn-dark btn-block ${url == "/Admin/transactionHistory" ? " active" : ""}`} 
                                            // style={url==="/Admin/transactionHistory" ? activeColor:""} 
                                            style={url === "/Admin/transactionHistory" ? { backgroundColor: "Indigo", borderColor: "blue" } : null}

                                            onClick={() => {
                                                Navigate("/Admin/transactionHistory");
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
                    </>
                )
            }
            {
                Role==""   && (
                    <div className='container d-flex justify-content-center my-5'>
                        <br /><br />
                        <h3>
                            Loading...
                        </h3>
                    </div>
                )
            }
            {
                Role != "Admin" && Role!=""  && (
                    <div>
                        <PageNotFound />
                    </div>
                )
            }

        </>
    )
}

export default AdminCard
