import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Web3Contract2 from './Web3Contract2';
const AdminCard = () => {
    const Navigate = useNavigate();
    const navbarStyle = {
        backgroundColor: '#d4bee8'
    };
    const Web3Contract=Web3Contract2();
    const contract2=Web3Contract[0];
    
    const [Count, setCount] = useState(0);
    useEffect(() => {
        if(contract2){
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
    return (
        <div className='container my-5 '>
            <nav className=' p-1' style={navbarStyle}>
                <ul className="nav nav-pills card-header-pills">
                    <li className="nav-item mx-2 col-sm">
                        <button className="btn btn-dark" onClick={() => {
                            Navigate("/Admin");
                        }}>Admin Request Form
                        </button>
                    </li>
                    <li className="nav-item mx-2 col-sm">
                        <button className="btn btn-dark position-relative" onClick={() => {
                            Navigate("/Admin/DeployPatches");
                        }}>
                            Deploy Patches
                            {Count>0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {Count}
                                </span>
                            )}
                        </button>

                    </li>
                    <li className="nav-item mx-2 col-sm">
                        <button className="btn btn-dark" onClick={() => {
                            Navigate("/Admin/TrackingPatches");
                        }}>Tracking
                            Patches</button>
                    </li>
                    <li className="nav-item mx-2 col-sm">
                        <button className="btn btn-dark" onClick={() => {
                            Navigate("/Admin/getsDownloadHistory");
                        }}>Get Download History
                        </button>
                    </li>
                    <li className="nav-item mx-2 col-sm">
                        <button className="btn btn-dark" onClick={() => {
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
    )
}

export default AdminCard
