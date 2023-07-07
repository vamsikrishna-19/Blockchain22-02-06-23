import React, { useState } from 'react'
import LogInImage from '../images/login-image.jpg';
import Axios from 'axios';
import './Login.css'
import { useNavigate } from 'react-router-dom';
const Login = ({role}) => {
    const Navigate = useNavigate();
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [token, setToken] = useState("");
    const handleSubmit = async () => {
        sessionStorage.clear();
        const data = {
            Username: Username,
            Password: Password
        }
        try{
            const response = await Axios.post("http://localhost:3001/authentication", data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response);
            const { token,Username,Role } = await response.data;
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('Username',Username);
            setToken(token);
            console.log(token);
            sessionStorage.setItem("Role", Role);
            role(Role);
            console.log(Role);
            if (Role == 'Admin'){
                Navigate('/Admin'
                );
            } else if (Role == 'Developer') {
                Navigate('/Developer');
            } else if (Role == 'Labeller') {
                Navigate('/Labeller');
            } else if (Role == 'Verifier') {
                Navigate('/Verifier');
            } else {
                // Handle other roles or redirect to a default route
                Navigate('/EndUser');
            }
        }
        catch (error) {
            console.log(error);
            setToken(undefined);
        }
       

    }

    return (
        <div>

            <section className="signup mt-5">
                <br /><br />
                <div className="container mt-5 centered-box">
                    <div className=''>

                        <div className="row justify-content-center">
                            <h2 className="form-title d-flex justify-content-center" style={{fontFamily: 'Arial', fontStyle: 'italic' }}>Login Form</h2>

                            <div className="col-md-5">
                                <form className='registration-form container' id='registration-form'>
                                    <br /><br /><br />
                                    <div className="input-group mt-3">
                                        <label htmlFor="Username" className='input-group-text'>
                                            <i className="zmdi zmdi-account-circle zmdi-hc-2x "></i>
                                        </label>
                                        <input type="text" className="form-control" id='Username' placeholder="Enter Username" aria-label="Username" onChange={(e) => {
                                            setUsername(e.target.value);
                                        }} aria-describedby="basic-addon1" />
                                    </div>
                                    <div className="input-group mt-3">
                                        <label htmlFor="Password" className='input-group-text'>
                                            <i className="zmdi zmdi-lock zmdi-hc-2x"></i>
                                        </label>
                                        <input type="password" className="form-control" id='Password' placeholder="Enter password" aria-label="Password" onChange={(e) => {
                                            setPassword(e.target.value);
                                            setToken("..");
                                        }} aria-describedby="basic-addon1" />
                                    </div>
                                    {
                                        token == undefined && (
                                            <div className='text-danger'>
                                                <div>
                                                    Enter Valid User Credentials!!!
                                                </div>
                                            </div>
                                        )
                                    }
                                    <div className=" mt-4  d-flex justify-content-center">
                                        <button className="btn btn-primary " type="button" onClick={handleSubmit} style={{borderColor:"rgb(180, 159, 205)"}}>Log In</button>
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
