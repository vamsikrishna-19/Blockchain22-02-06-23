import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const Navigate = useNavigate();
    // const navbar={
    //     backgroundColor:'#131921'
    // }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark" >
                <div className="container-fluid">
                    <div className="navbar-brand text-white" href="#">PMS</div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="d-flex justify-content-end">
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <div className="nav-item">
                                <button className="btn btn-dark" onClick={() => {
                                    Navigate("/EndUser");
                                }}>End User</button>
                            </div>
                            <div className="nav-item">
                                <button className="btn btn-dark" onClick={() => {
                                    Navigate("/Admin");
                                }}>Admin</button>
                            </div>
                            <div className="nav-item">
                                <button className="btn btn-dark" onClick={() => {
                                    Navigate("/Labeller");
                                }}>Labeller</button>
                            </div>
                            <div className="nav-item">
                                <button className="btn btn-dark" onClick={() => {
                                    Navigate("/Developer");
                                }}>Developer</button>
                            </div>
                            <div className="nav-item">
                                <button className="btn btn-dark" onClick={() => {
                                    Navigate("/Verifier");
                                }}>Verifier</button>
                            </div>
                            <div className="nav-item">
                                <button className="btn btn-dark" onClick="window.open('Aboutus.html')">ABOUT US</button>
                            </div>

                            <div className="nav-item">
                                <button className="btn btn-dark" onClick={()=>{
                                    Navigate('/Login')
                                }}>
                                    LOG-IN
                                </button>
                            </div>
                            <div className="nav-item">
                                <button className="btn btn-dark" onClick={()=>{
                                    Navigate('/Signup')
                                }}>
                                    Sign-up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </nav>
        </>
    )
}

export default Navbar
