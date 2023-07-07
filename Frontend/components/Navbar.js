import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const Navigate = useNavigate();
    // const navbar={
    //     backgroundColor:'#131921'
    // }
    return (
        <>
            <nav className="navbar navbar-expand-lg " style={{backgroundColor:"rgb(0,0,0)"}} >
                <div className="container-fluid">
                    <div className="navbar-brand text-white" href="#">PMS</div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="d-flex justify-content-end">
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">       
                            <div className="nav-item" >
                                <button className="btn "  style={{backgroundColor:"rgb(0,0,0)", color: 'rgb(180, 159, 205)'}} onClick="window.open('Aboutus.html')">
                                    <b>
                                    About us
                                    </b>
                                    </button>
                            </div>

                            <div className="nav-item">
                                <button className="btn "  style={{backgroundColor:"rgb(0,0,0)", color: 'rgb(180, 159, 205)'}} onClick={() => {
                                    Navigate('/Login')
                                }}>
                                    <b>
                                    Log in
                                    </b>
                                </button>
                            </div>
                            <div className='nav-item'>
                            <button className="btn "  style={{backgroundColor:"rgb(0,0,0)", color: 'rgb(180, 159, 205)'}} onClick={() => {
                                    sessionStorage.clear();
                                    Navigate("/");
                                }}>
                                    <b>
                                         Log out
                                    </b>
                                </button>
                                
                            </div>
                            <div className="nav-item">
                                <button className="btn "  style={{backgroundColor:"rgb(0,0,0)", color: 'rgb(180, 159, 205)'}} onClick={() => {
                                    Navigate('/Signup')
                                }}>
                                    <b>
                                    Sign up
                                    </b>
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
