


import React from 'react';
import { useNavigate } from 'react-router-dom';

import patchDeployments from '../images/patchDeployements.jpeg';
import clientSatisfaction from '../images/clientSatisfaction.jpeg';
const AboutUs = () => {
  const navigate = useNavigate();

  const clientSatisfactionColor = "#FF9800"; // Replace with your desired color
  const patchDeploymentsColor = "#2196F3"; // Replace with your desired color

  return (
    <div style={{ marginBottom:'0px', backgroundColor: "#9B72CF", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div className="container text-white">
        <div className="p-5" style={{ borderRadius: '30px' }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "20px", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}>
                  UNBREAKABLE SECURITY
                </h2>
              </div>
              <div className="col-lg-6">
                <h5 style={{ fontSize: "18px", marginBottom: "40px", fontWeight: "bold", lineHeight: "2"  }}>
                  Welcome to the era of secure patch management, where Blockchain Patch Manager emphasizes unmatched security and transparency, safeguarding data every step of the way.
                </h5>
              </div>
            </div>
          </div>

          <div className="container mt-5">
            <div className="row">
              <div className="col">
                <div className="card" style={{ borderRadius: '30px', backgroundColor: clientSatisfactionColor , borderRadius: "30px", fontSize: "18px", fontWeight: "bold", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)"}}>
                  <div className="card-body p-3">
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <img src={clientSatisfaction} alt="Client Satisfaction" className="img-fluid" style={{ width: '70px', height: '70px', borderRadius: '100px' }} />
                      </div>
                      <div className="col">
                        <h3 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>Client Satisfaction</h3>
                        <p style={{ fontSize: "16px", marginBottom: "0", color: "#fff" }}>98% Happy Clients</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col">
                <div className="card" style={{ borderRadius: '30px', backgroundColor: patchDeploymentsColor , borderRadius: "30px", fontSize: "18px", fontWeight: "bold", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)"}}>
                  <div className="card-body p-3">
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <img src={patchDeployments} alt="Patch Deployments" className="img-fluid" style={{ width: '70px', height: '70px', borderRadius: '100px' }} />
                      </div>
                      <div className="col">
                        <h3 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>Patch Deployments</h3>
                        <p style={{ fontSize: "16px", marginBottom: "0", color: "#fff" }}>900+ Patches Applied</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-lg-7">
                <br /><br />
                <h2 style={{ color: "#fff", fontSize: "32px", fontWeight: "bold", marginBottom: "20px", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}>
                  Ready to join the new age of patch management?
                </h2>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col">
                <button className="btn btn-primary text-white px-4 py-2" style={{ backgroundColor: "#532B88", borderRadius: "30px", fontSize: "18px", fontWeight: "bold", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)" }} onClick={() => {
                  navigate("/Signup");
                }}>
                  Sign-Up Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
