import React, { useState } from 'react'
import LogInImage from '../images/login-image.jpg';
import Axios from 'axios';
const Login = () => {
    const [Username,setUsername]=useState('');
    const [Password,setPassword]=useState('');
    const handleSubmit=()=>{
        const data={
            Username,
            Password
        }
        // try{
        //     Axios.post("")
        // }
        

    }
  return (
    <div>
      
            <section className="signup mt-5">
                    <br /><br />
                <div className="container mt-5 centered-box">
                    <div className=''>
                        
                        <div className="row justify-content-center">
                            <h2 className="form-title d-flex justify-content-center">Login Form</h2>
                            
                            <div className="col-md-5">
                                <form className='registration-form container' id='registration-form'>
                                    <br /><br /><br />
                                    <div className="input-group mt-3">
                                        <label htmlFor="Username" className='input-group-text'>
                                            <i className="zmdi zmdi-account-circle zmdi-hc-2x "></i>
                                        </label>
                                        <input type="text" className="form-control" id='Username' placeholder="Enter Username" aria-label="Username" onChange={(e)=>{
                                            setUsername(e.target.value);
                                        }} aria-describedby="basic-addon1" />
                                    </div>
                                    <div className="input-group mt-3">
                                        <label htmlFor="Password" className='input-group-text'>
                                            <i className="zmdi zmdi-lock zmdi-hc-2x"></i>
                                        </label>
                                        <input type="password" className="form-control" id='Password' placeholder="Enter password" aria-label="Password" onChange={(e)=>{
                                            setPassword(e.target.value)
                                        }} aria-describedby="basic-addon1" />
                                    </div>
                                   
                                    <div className=" mt-4  d-flex justify-content-center">
                                        <button className="btn btn-dark" type="button" onClick={handleSubmit}>Log-in</button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-md-5">
                                <div className="image-container-small mt-3">
                                    <figure>
                                        <img src={LogInImage} alt="Registration-image" style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }} />
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    </div>
  )
}

export default Login
