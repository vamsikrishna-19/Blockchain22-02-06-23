
import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import signUpPicture from '../images/sign-up-image.avif';
import './SignUp.css';

const SignUp = (props) => {
  sessionStorage.clear();
  const Navigate = useNavigate();
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [Email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [misMatch, setMisMatch] = useState(false);
  // const [usernameExists,setUsernameExits]=useState(false);
  // const [emailExists,setEmailExists]=useState(false)
  const [errorMsg, setErrorMsg] = useState("");
  const handleSubmit = async () => {
    const passwordPattern = /^(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*[a-z]).{8,}$/;
    if (!passwordPattern.test(Password)) {
      setErrorMsg('Password must be at least 8 characters long ,atleast 1 uppercase letter , atleast 1 special letter');
      return;
    }
    if (Password === confirmPassword) {
      const data = {
        Username: Username,
        Password: Password,
        Email: Email
      };
      console.log(data);

      try {
        const response = await Axios.post('http://localhost:3001/Register', data, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response);
        if (response.status === 201) {
          sessionStorage.clear();
          props.showAlert("User Registration Successful", "success");
          Navigate('/');
        }
      } catch (error) {
        console.log(error);
        if (error.response && error.response.data) {
          setErrorMsg(error.response.data);
        } else {
          setErrorMsg("An error occurred. Please try again.");
        }
      }
    }
  };

  const checkMisMatch = (confirmPassword) => {
    if (Password !== confirmPassword) {
      setMisMatch(true);
    } else {
      setMisMatch(false);
    }
  };

  const checkMisMatch2 = (Password) => {
    if (Password !== confirmPassword) {
      setMisMatch(true);
    } else {
      setMisMatch(false);
    }
  };
  const [passwordVisible, setPasswordVisible] = useState(false);


  return (
    <>
      <br /><br /><br /><br />
      <section className="signup mt-5">
        <br /><br />
        <div className="container mt-5 centered-box">
          <div className="">
            <div className="row justify-content-center">
              <h2 className="form-title d-flex justify-content-center" style={{ fontFamily: 'Arial', fontStyle: 'italic',fontWeight:"bold" }}>Registration Form</h2>
              <div className="col-md-5">
                <div className="image-container-small mt-3">
                  <figure>
                    <img
                      src={signUpPicture}
                      alt="Registration-image"
                      style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }}
                    />
                  </figure>
                </div>
              </div>
              <div className="col-md-6">
                <form className="registration-form container" id="registration-form">
                  <div className="input-group mb-3 mt-5">
                    <label htmlFor="Email" className="input-group-text">
                      <i className="zmdi zmdi-email zmdi-hc-2x"></i>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="Email"
                      placeholder="Enter Email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      aria-label="Email"
                      aria-describedby="basic-addon1"
                    />
                  </div>

                  <div className="input-group mt-3">
                    <label htmlFor="Username" className="input-group-text">
                      <i className="zmdi zmdi-account-circle zmdi-hc-2x "></i>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="Username"
                      placeholder="Create a username"
                      aria-label="Username"
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                      aria-describedby="basic-addon1"
                    />
                  </div>

                  <div className="input-group mt-3">
                    <label htmlFor="Password" className="input-group-text">
                      <i className="zmdi zmdi-lock zmdi-hc-2x"></i>
                    </label>
                    <input
                      type={passwordVisible ? "text" : "password"}

                      className="form-control"
                      id="Password"
                      placeholder="Enter password"
                      aria-label="Password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                        checkMisMatch2(e.target.value);
                      }}
                      aria-describedby="basic-addon1"
                    />
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
                  <div className="input-group mt-3">
                    <label htmlFor="ConfirmPassword" className="input-group-text">
                      <i className="zmdi zmdi-lock zmdi-hc-2x"></i>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="ConfirmPassword"
                      placeholder="Re-Enter password"
                      aria-label="ConfirmPassword"
                      aria-describedby="basic-addon1"
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        checkMisMatch(e.target.value);
                      }}
                    />
                  </div>
                  {misMatch && (
                    <div className="text-danger">
                      <b>Password MisMatch</b>
                    </div>
                  )}
                  {
                    errorMsg && (
                      <div className='text-danger'>
                        {errorMsg}
                      </div>
                    )
                  }
                  <div className=" mt-4  d-flex justify-content-center">
                    <button className="btn" type="button" onClick={handleSubmit} style={{ borderColor: "rgb(180, 159, 205)", backgroundColor: "rgb(255,200,1)",fontWeight:"bold" }}>
                      Sign-up
                    </button>
                  </div>
                  {
                    
                    <div className='mx-4 my-3 d-flex justify-content-center'>
                      <div>Already have an account ?
                        <span className='mx-2 ' style={{ color: "blue", cursor: "pointer" }} onClick={() => {
                          Navigate("/Login")
                        }}>
                          Log-in
                          </span>
                      </div>

                    </div>
                  }
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
