import React, { useState } from 'react';
import './InitialPage2.css';
import Image from '../images/image2.jpg';
import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';
const InitialPage = () => {
  // const [Role,setRole]=useState('no');
  const Navigate = useNavigate();
  return (
    <>
      <div className='p-5'>
      <div className="d-flex flex-row justify-content-center align-items-center p-5 " style={{ position: 'absolute',backgroundColor:"rgb(0,0,0)"
      ,
      // background: 'linear-gradient(to right, rgb(38,91,237), rgb(212,56,245),rgb(243,178,62))',
       top: 50, left: 0, right: 0, bottom: 0, borderRadius: 0, overflowX: 'hidden' ,backgroundColor:"rgb(0,0,0)"}}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <br /><br /><br />
              <div className="d-flex flex-column justify-content-center align-items-start">
                <h1 className="text-white font-weight-normal" style={{ fontFamily: 'Arial',   }}>Revolutionizing</h1>
                <h1 className="text-white font-weight-normal" style={{ fontFamily: 'Arial', }}>Patch Management</h1>
                <h1 className="text-white font-weight-normal" style={{ fontFamily: 'Arial',  }}>Using
                <span  className='mx-2' style={{color:"red"}}>

                 BlockChain
                </span>
                 Technology</h1>
                <div className="mt-4 d-flex flex-wrap">
                  <div className='mr-3'>
                    <button className="btn btn-light m-2" style={{ borderRadius: "25px", color: 'rgb(180, 159, 205)', fontSize: '18px' }} onClick={() => Navigate("/Login")}>
                      <b>Get Started</b>
                    </button>
                  </div>
                  <div>
                    <button className="btn btn-light text-white  m-2" style={{ borderRadius: "25px", backgroundColor: 'rgb(180, 159, 205)', fontSize: '18px' }} onClick={()=>{
                      Navigate('/Aboutus');
                    }}>
                      <b>Learn More</b>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center">
              <img src={Image} alt="image" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
      </div>
      
      {/* <div className=' p-5' style={{ backgroundColor: "rgb(155,114,207)" }}>
        <div className='container'>
          <div>
            <div className='text-white' style={{ color: 'white' }}>
              UNBREAKABLE SECURITY
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default InitialPage;


