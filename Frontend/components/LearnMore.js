import React from 'react'
import { useNavigate } from 'react-router-dom';
// import patchDeployments form '../images/clientSatisfaction.jpeg';
// import LogInImage from '../images/login-image.jpg';
import patchDeployments from '../images/patchDeployements.jpeg';
import clientSatisfaction from '../images/clientSatisfaction.jpeg';
const LearnMore = () => {
  const Navigate=useNavigate();
  return (
    <>
      <br /><br /><br /><br /><br /><br />
      <div>
        <br /><br /><br /><br />
        <div className="centered-container">
          <div className='p-5' style={{ backgroundColor: "rgb(155,114,207)", fontFamily: 'Arial' }}>
            <br /><br />
            <div className='container m-5'>
              <div className='row m-5'>
                <div className='col-6'>
                  <h2>
                    <b>
                      UNBREAKABLE SECURITY
                    </b>
                  </h2>
                </div>
                <div className='col-6 text-white ' style={{ fontFamily: 'Arial', }}>
                  <h5>
                    <b>
                      Welcome to the era of secure patch management, where Block Chain
                      Patch Manager emphasizes unmatched security and transparency,
                      safeguarding data every step of the way.
                    </b>
                  </h5>
                </div>
              </div>
            </div>
            <br /><br /><br />
            <div className="container mt-5">
              <div className="row">
                <div className="col">
                  <div className="card " style={{borderRadius: '30px',  border: '2px solid black'}}>
                    <div className="card-body p-3" style={{ backgroundColor: "rgb(155,114,207)", fontFamily: 'Arial', color: 'white' }}>
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <img src={clientSatisfaction} alt="Client Satisfaction" className="img-fluid" style={{ width: '70px',height:'70px',borderRadius: '100px' }} />
                        </div>
                        <div className="col">
                          <h3>Client Satisfaction</h3>
                          <b>98% Happy Clients</b>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col">
                  <div className="card  " style={{borderRadius: '30px',  border: '2px solid black' }}>
                    <div className="card-body p-3" style={{ backgroundColor: "rgb(155,114,207)", fontFamily: 'Arial', color: 'white' }}>
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <img src={patchDeployments} alt="Patch Deployments" className="img-fluid" style={{ width: '70px',height:'70px',borderRadius: '100px' }} />
                        </div>
                        <div className="col">
                          <h3>Patch Deployments</h3>
                          <b>900+ Patches Applied</b>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br /><br /><br />
            <div className='container m-4'>
              <div className='row m-4'>
                  <div className='col-7'>
                    <h2  style={{ fontFamily: 'Arial'}}>
                      <b>

                  Ready to join the new age of patch management?
                      </b>
                    </h2>
                  </div>
              </div>
              <div className='row m-4'>
                  <div className='' >
                      <button className='btn text-white p-2' style={{backgroundColor:"rgb(83,43,136)", border: '2px solid black', borderRadius:"30px"}} onClick={()=>{
                        Navigate("/Signup");
                      }}>
                         <b>Sign-Up Now</b>
                      </button>
                  </div>
              </div>
            </div>


          </div>
        </div>



      </div>

    </>
  )
}

export default LearnMore
