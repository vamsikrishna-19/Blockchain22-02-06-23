import React from 'react'
import { useNavigate } from 'react-router-dom'
import ProcessFlow from '../images/ProcessFlow.jpg'
const Navbar = () => {
    const Navigate = useNavigate();
    return (
        <>
            <div className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <img src={ProcessFlow} alt="" />
                    </div>
                </div>
            </div>
            <nav className="navbar navbar-expand-lg " style={{ backgroundColor: "rgb(0,0,0)" }} >
                <div className="container-fluid">
                    <div className='navbar_image_container' style={{ width: "100px", height: "50px" }}>

                   
                    <button className="navbar-brand text-white btn btn-dark" data-bs-toggle="modal" data-bs-target=".bd-example-modal-lg">
                        <img src={ProcessFlow} alt="" style={{ maxWidth: "100%", maxHeight: "100%" }}/>
                        
                    </button>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="d-flex justify-content-end">
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <div className="nav-item" >
                                <button className="btn " style={{ backgroundColor: "rgb(0,0,0)", color: 'rgb(180, 159, 205)' }} onClick={()=>{
                                    Navigate('/AboutUs');
                                }}>
                                    <b>
                                        About us
                                    </b>
                                </button>
                            </div>
                            {
                                !sessionStorage.getItem("Username") &&

                                <div className="nav-item">
                                    <button className="btn " style={{ backgroundColor: "rgb(0,0,0)", color: 'rgb(180, 159, 205)' }} onClick={() => {
                                        Navigate('/Login')
                                    }}>
                                        <b>
                                            Log in
                                        </b>
                                    </button>
                                </div>
                            }
                            {
                                sessionStorage.getItem("Username") &&
                                <div className='nav-item'>
                                    <button className="btn " style={{ backgroundColor: "rgb(0,0,0)", color: 'rgb(180, 159, 205)' }} onClick={() => {
                                        sessionStorage.clear();
                                        Navigate("/");
                                    }}>
                                        <b>
                                            Log out
                                        </b>
                                    </button>
                                </div>
                            }
                            
                        </div>
                    </div>
                </div>

            </nav>
        </>
    )
}

export default Navbar
