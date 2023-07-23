// import React from 'react'
// import NoAccess from '../images/NoAccess.jpg';
// const PageNotFound = () => {
//   return (
//     <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", backgroundColor: "rgb(187, 222, 251)" }}>
//       <div className="container">
//         <div className="mx-4 text-center row d-flex align-items-center">
//           <h2 className='col-6 '>
//             <span  style={{color:"red"}}>

//             Access Denied!! 
//             </span>
//             <br />
//             Unauthorized access. you cant access the page
//           </h2>
//           <img src={NoAccess} alt="No Access" className='col-6' style={{ width: "85%", height: "auto", maxWidth: "400px" }} />
          
//         </div>
//       </div>
//     </div>

//   )
// }

// export default PageNotFound
import React from 'react';
import NoAccess from '../images/NoAccess.jpg';

const PageNotFound = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <div className="container">
        <div className="row mx-4 text-center d-flex align-items-center">
          <div className="col-md-6">
            <h2 style={{ color: "#dc3545", fontSize: "32px", fontWeight: "bold", marginBottom: "20px", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}>
              Access Denied!
            </h2>
            <p style={{ fontSize: "14px", color: "#6c757d", marginTop: "20px" }}>
            Unauthorized access. You are not authorized to access this page.
            </p>
           
            <a href="/" className="btn btn-primary" style={{ fontSize: "18px", borderRadius: "24px", padding: "12px 24px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)" }}>Go Back to Homepage</a>
          </div>
          <div className="col-md-6">
            <img src={NoAccess} alt="No Access" style={{ width: "100%", height: "auto", maxWidth: "400px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)", borderRadius: "8px" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
