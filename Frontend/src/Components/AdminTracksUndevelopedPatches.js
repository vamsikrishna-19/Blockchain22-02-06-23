// import React, { useState, useEffect } from 'react'
// import Web3Contract2 from './Web3Contract2';

// const AdminTracksUndevelopedPatches = () => {
//     const Web3Contract = Web3Contract2();
//     const contract2 = Web3Contract[0];
//     const [patchObject, setPatchObject] = useState({});
//     const [requestNumberArr, setrequestNumberArr] = useState([]);
//     const [dataArray2, setdataArray2] = useState([]);
//     const [dataArray, setdataArray] = useState([]);
//     const [requestObj, setRequestObj] = useState({});
//     let i=0;
//     const [requestNumberArr2, setrequestNumberArr2] = useState([]);
//     const getdata = async () => {
//         try {
//             contract2.methods.getdetails().call().then((res) => {
//                 // console.log(res.length + 1);
//                 console.log(res);
//                 setdataArray2(res);
//                 for (let i = 0; i < res.length; i++) {
//                     // setrequestNumberArr2((reqNo) => ([...reqNo, res[i].requestnumber]));
//                     if (res[i].verificationstatus == "Verified" || res[i].verificationstatus == "IN PROGRESS") {
//                         setrequestNumberArr((reqNo) => ([...reqNo, res[i].requestnumber]));
//                     }
//                 }
//                 res.forEach(patch => {
//                     setPatchObject((prev) => ({ ...prev, [patch.requestnumber]: patch.patchno }))
//                 });
//             });
//         }
//         catch (error) {
//             console.error(error);
//         }
//         try {
//             contract2.methods.getdetails().call().then((res) => {
//                 console.log(res.length + 1);
//                 for (let i = 0; i < res.length; i++) {
//                     setrequestNumberArr2((reqNo) => ([...reqNo, res[i].requestnumber]));
//                 }
//             });
//             contract2.methods.getdetailsRequest().call().then((result) => {
//                 setdataArray(result);
//                 console.log(result);
//                 result.forEach((item) => {
//                     setRequestObj(prev => ({
//                         ...prev,
//                         [item.requestno]: item.date
//                     }))
//                 })
//             });
//         }
//         catch (error) {
//             console.error(error);
//         }

//     }
//     const formatDate = (value) => {


//         const date = new Date(value);
//         const formattedDate = date.toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
//         console.log(formattedDate);
//         return formattedDate;
//     }
//     useEffect(() => {
//         if (contract2) {
//             getdata();
//         }
//     }, [contract2]);

//     return (
//         <div>
//             <br /><br />
//             <div className="container">
//                 <div className="text-center">
//                     <div className='container d-flex justify-content-center'>
//                         <ul className='col-md-10'>
//                             <div className='col d-flex'>
//                                 <br />
//                                 <li className="form-control">
//                                     <b>

//                                         {"Request No"}
//                                     </b>
//                                 </li>
//                                 <li className="form-control">
//                                     <b>

//                                         {"Target Date"}
//                                     </b>
//                                 </li>
//                             </div>

//                             {dataArray2.map((data, dataIndex) => {
//                                 console.log(data.requestnumber);
//                                 if (patchObject[data.requestnumber] == data.patchno && data.verificationstatus == "Rejected" && !requestNumberArr.includes(data.requestno)) {
//                                     i++
//                                     return (
//                                         <>
//                                             <div className='col d-flex ' style={{}}>
//                                                 <br />
//                                                 <li className="form-control bg-danger text-white">
//                                                     <b>
//                                                         {"Request No:" + data.requestnumber}
//                                                     </b>

//                                                 </li>
//                                                 <li className="form-control bg-danger text-white">
//                                                     <b>

//                                                         {formatDate(requestObj[data.requestnumber])}
//                                                     </b>
//                                                 </li>
//                                             </div>
//                                         </>
//                                     );

//                                 }
//                             })}
//                             {dataArray.map((data, dataIndex) => {
//                                 console.log(data.bugs);
//                                 if (!requestNumberArr2.includes(data.requestno)) {
//                                     i++;
//                                     return (
//                                         <>
//                                             <div className='col d-flex '>
//                                                 <br />
//                                                 <li className="form-control">
//                                                     <b>
//                                                         {"Request No:" + data.requestno}
//                                                     </b>
//                                                 </li>
//                                                 <li className="form-control ">
//                                                     <b>

//                                                         {formatDate(requestObj[data.requestno])}
//                                                     </b>

//                                                 </li>
//                                             </div>
//                                         </>
//                                     );
//                                 }
//                             })}
//                         </ul>
                        
//                     </div>

//                             {
//                                 i==0 && (
//                                     <>
//                                         <div>
//                                             <b>
//                                                 No data Available
//                                             </b>
//                                         </div>
//                                     </>
//                                 )
//                             }
//                 </div>

//             </div>
//         </div>
//     )
// }

// export default AdminTracksUndevelopedPatches;





import React, { useState, useEffect } from 'react';
import Web3Contract2 from './Web3Contract2';
import './AdminTracksUndevelopedPatches.css'; // Import custom CSS for styling

const AdminTracksUndevelopedPatches = () => {
      const Web3Contract = Web3Contract2();
    const contract2 = Web3Contract[0];
    const [patchObject, setPatchObject] = useState({});
    const [requestNumberArr, setrequestNumberArr] = useState([]);
    const [dataArray2, setdataArray2] = useState([]);
    const [dataArray, setdataArray] = useState([]);
    const [requestObj, setRequestObj] = useState({});
    let i=0;
    const [requestNumberArr2, setrequestNumberArr2] = useState([]);
    const getdata = async () => {
        try {
            contract2.methods.getdetails().call().then((res) => {
                
                console.log(res);
                setdataArray2(res);
                for (let i = 0; i < res.length; i++) {
                   
                    if (res[i].verificationstatus == "Verified" || res[i].verificationstatus == "IN PROGRESS") {
                        setrequestNumberArr((reqNo) => ([...reqNo, res[i].requestnumber]));
                    }
                }
                res.forEach(patch => {
                    setPatchObject((prev) => ({ ...prev, [patch.requestnumber]: patch.patchno }))
                });
            });
        }
        catch (error) {
            console.error(error);
        }
        try {
            contract2.methods.getdetails().call().then((res) => {
                console.log(res.length + 1);
                for (let i = 0; i < res.length; i++) {
                    setrequestNumberArr2((reqNo) => ([...reqNo, res[i].requestnumber]));
                }
            });
            contract2.methods.getdetailsRequest().call().then((result) => {
                setdataArray(result);
                console.log(result);
                result.forEach((item) => {
                    setRequestObj(prev => ({
                        ...prev,
                        [item.requestno]: item.date
                    }))
                })
            });
        }
        catch (error) {
            console.error(error);
        }

    }
    const formatDate = (value) => {


        const date = new Date(value);
        const formattedDate = date.toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
        console.log(formattedDate);
        return formattedDate;
    }
    useEffect(() => {
        if (contract2) {
            getdata();
        }
    }, [contract2]);

  return (
    <div className="container">
      <div className="page-title my-5">
        <b>

        Undeveloped Patches
        </b>
        </div>
      <div className="patch-list ">
        {dataArray2.map((data) => {
          if (
            patchObject[data.requestnumber] === data.patchno &&
            data.verificationstatus === "Rejected" &&
            !requestNumberArr.includes(data.requestno)
          ) {
            return (
              <div className="patch-item rejected" key={data.requestnumber}>
                <div className="request-number">Request No: {Number(data.requestnumber)}</div>
                <div className="target-date">Target Date: {formatDate(requestObj[data.requestnumber])}</div>
              </div>
            );
          }
          return null;
        })}

        {dataArray.map((data) => {
          if (!requestNumberArr2.includes(data.requestno)) {
            return (
              <div className="patch-item" key={data.requestno}>
                <div className="request-number">Request No: {Number(data.requestno)}</div>
                <div className="target-date">Target Date: {formatDate(requestObj[data.requestno])}</div>
              </div>
            );
          }


          return null;
        })}
      </div>

      {requestNumberArr.length === 0 && dataArray.length === 0 && (
        <div className="no-data-message">No data available</div>
      )}
    </div>
  );
};

export default AdminTracksUndevelopedPatches;



