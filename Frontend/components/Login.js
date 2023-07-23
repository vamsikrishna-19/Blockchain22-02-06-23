import React, { useState } from 'react'
import LogInImage from '../images/login-image.jpg';
import Axios from 'axios';
import './Login.css'
import { useNavigate } from 'react-router-dom';
const Login = (props) => {
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
            const { token, Username, Role } = await response.data;
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('Username', Username);
            setToken(token);
            console.log(token);
            sessionStorage.setItem("Role", Role);
            props.role(Role);
            console.log(Role);
            if (Role == 'Admin') {
                props.showAlert("Admin login successful", "success")
                Navigate('/Admin'
                );
            } else if (Role == 'Developer') {
                props.showAlert("Developer login successful", "success")
                Navigate('/Developer');
            } else if (Role == 'Labeller') {
                props.showAlert("Labeller login successful", "success")

                Navigate('/Labeller');
            } else if (Role == 'Verifier') {
                props.showAlert("Verifier login successful", "success")

                Navigate('/Verifier');
            } else {
                // Handle other roles or redirect to a default route
                props.showAlert("User login successful", "success")

                Navigate('/EndUser');
            }
        }
        catch (error) {
            console.log(error);
            setToken(undefined);
        }


    }
    const [passwordVisible, setPasswordVisible] = useState(false)
    return (
        <div>

            <section className="signup mt-5">
                <br /><br />
                <div className="container mt-5 centered-box">
                    <div className=''>

                        <div className="row justify-content-center">
                            <h3 className="form-title d-flex justify-content-center" style={{ fontFamily: 'Arial', fontStyle: 'italic' }}>
                                <b>

                                Login Form
                                </b>
                                </h3>

                            <div className="col-md-5">
                                <form className='registration-form container' id='registration-form'>
                                    <br /><br /><br />
                                    <div className="input-group mt-3">
                                        <label htmlFor="Username" className='input-group-text'>
                                            <i className="zmdi zmdi-account-circle zmdi-hc-2x "></i>
                                        </label>
                                        <input type="text" className="form-control" id='Username' placeholder="Enter Username" aria-label="Username"  onChange={(e) => {
                                            setUsername(e.target.value);
                                        }} aria-describedby="basic-addon1" />
                                    </div>
                                    <div className="input-group mt-3">
                                        <label htmlFor="Password" className='input-group-text'>
                                            <i className="zmdi zmdi-lock zmdi-hc-2x"></i>
                                        </label>
                                        <input type={passwordVisible ? "text" : "password"} className="form-control" id='Password' placeholder="Enter password" aria-label="Password"  onChange={(e) => {
                                            setPassword(e.target.value);

                                        }} aria-describedby="basic-addon1" />
                                        <label htmlFor="Password" className='input-group-text'
                                        >

                                            <i
                                                className={`toggle-password zmdi  ${passwordVisible ? " zmdi-eye-off zmdi-hc-2x" : " zmdi-eye zmdi-hc-2x"}`}
                                                onClick={() => {
                                                    setPasswordVisible(!passwordVisible);
                                                }}
                                            ></i>
                                        </label>
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
                                    <br />
                                    <div>
                                        Don't have an account ?
                                        <span className='mx-2 hover-button' style={{ color: "blue", cursor: "pointer" }} onClick={() => {
                                            Navigate("/Signup")
                                        }}>
                                            Sign up
                                        </span>
                                    </div>
                                    <div className=" mt-4  d-flex justify-content-center">
                                        <button className="btn btn-primary " type="button" onClick={handleSubmit} style={{ borderColor: "rgb(180, 159, 205)" ,fontWeight:"bold"}}>Log In</button>
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
