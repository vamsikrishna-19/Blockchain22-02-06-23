import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import signUpPicture from '../images/sign-up-image.avif'
import './SignUp.css'
const SignUp = () => {
    const Navigate = useNavigate()
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [Email,setEmail]=useState("");
    const handleSubmit = () => {
        const data = {
            Username: Username,
            Password: Password,
            Email:Email
        }
        console.log(data);
        console.log(Axios);
        try{
            Axios.post("http://localhost:3000/Register", data, {
                headers:{
                    'Content-Type': 'application/json'
                }
            });
            Navigate('/');
        }
        catch (error) {
            console.log("Error uploading project", error);
        }
    }
    return (
        <>  
            <br /><br /><br /><br />
            <section className="signup mt-5">
                    <br /><br />
                <div className="container mt-5 centered-box">
                    <div className=''>
                        
                        <div className="row justify-content-center">
                            <h2 className="form-title d-flex justify-content-center">Registration Form</h2>
                            <div className="col-md-5">
                                <div className="image-container-small mt-3">
                                    <figure>
                                        <img src={signUpPicture} alt="Registration-image" style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }} />
                                    </figure>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <form className='registration-form container' id='registration-form'>
                                    <div className="input-group mb-3 mt-5">
                                        <label htmlFor="Email" className='input-group-text'>
                                            <i className="zmdi zmdi-email zmdi-hc-2x"></i>
                                        </label>
                                        <input type="text" className="form-control" id='Email'  placeholder="Enter Email" onChange={(e)=>{
                                            setEmail(e.target.value)
                                        }} aria-label="Email" aria-describedby="basic-addon1" />
                                    </div>
                                    <div className="input-group mt-3">
                                        <label htmlFor="Username" className='input-group-text'>
                                            <i className="zmdi zmdi-account-circle zmdi-hc-2x "></i>
                                        </label>
                                        <input type="text" className="form-control" id='Username' placeholder="Create a username" aria-label="Username" onChange={(e)=>{
                                            setUsername(e.target.value);
                                        }} aria-describedby="basic-addon1" />
                                    </div>
                                    <div className="input-group mt-3">
                                        <label htmlFor="Password" className='input-group-text'>
                                            <i className="zmdi zmdi-lock zmdi-hc-2x"></i>
                                        </label>
                                        <input type="password" className="form-control" id='Password'  placeholder="Enter password" aria-label="Password" onChange={(e)=>{
                                            setPassword(e.target.value)
                                        }} aria-describedby="basic-addon1" />
                                    </div>
                                    <div className="input-group mt-3">
                                        <label htmlFor="ConfirmPassword" className='input-group-text'>
                                            <i className="zmdi zmdi-lock zmdi-hc-2x"></i>
                                        </label>
                                        <input type="password" className="form-control" id='ConfirmPassword'  placeholder="Re-Enter password" aria-label="ConfirmPassword" aria-describedby="basic-addon1" />
                                    </div>
                                    
                                    <div className=" mt-4  d-flex justify-content-center">
                                        <button className="btn btn-dark" type="button" onClick={handleSubmit}>Sign-up</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </section>


            {/* <form action="">
            <div className='container my-4'>
                <div>
                    <br /><br />
                    <input type="text" placeholder='Enter Username' onChange={(e) => {
                        setUsername(e.target.value);
                    }} />
                </div>
                <br />
                <div>
                    <input type="text" placeholder='Enter password' onChange={(e) => {
                        setPassword(e.target.value);
                    }} />
                </div>
                <br /><br />
                <div>
                    <button className='btn btn-dark' type='button' onClick={handleSubmit}>Sign-up</button>
                </div>
            </div>
        </form> */}
        </>
    )
}
export default SignUp
