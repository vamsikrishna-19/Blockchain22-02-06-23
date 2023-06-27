import React, { useState, useEffect } from 'react'
import Web3Contract2 from './Web3Contract2'
import { useNavigate } from 'react-router-dom';
const DevelopergetsRejectedPatches = () => {
  const Web3 = Web3Contract2();
  const contract2 = Web3[1];
  const account = Web3[0];
  const Navigate=useNavigate();
  const [requestNumberArr, setrequestNumberArr] = useState([])
  const [requestNumberArr2,setrequestNumberArr2]=useState([])
  const [dataArray, setdataArray] = useState([]);
  const getdata = async () => {
    try {
      await contract2.methods.getdetails().call().then((res) => {
        console.log(res.length + 1);
        console.log(res)
        for (let i = 0; i < res.length; i++){
          // if (res[i].verificationstatus == "Rejected") {
          //   // requestnoarr.push(res[i].requestnumber);
          //   setrequestNumberArr((reqNo) => ([...reqNo, res[i].requestnumber]));
          // }
          setrequestNumberArr2((reqNo) => ([...reqNo, res[i].requestnumber]));
          if (res[i].verificationstatus == "Verified" || res[i].verificationstatus=="IN PROGRESS") {
            // requestnoarr.push(res[i].requestnumber);
            setrequestNumberArr((reqNo) => ([...reqNo, res[i].requestnumber]));
           }
        }
        
        // console.log(requestnoarr.includes(2));
        // requestnoarr.map(value => value.toString());
        // console.log(requestnoarr.includes('2'));
        // console.log(requestnoarr);
      });
      contract2.methods.getdetailsRequest().call().then((result) => {
        setdataArray(result);
        console.log(result);
      });
    }
    catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getdata();
  }, [contract2]);

  return (
    <div>
      {/* <div className='container my-3 mx-4'>
        <button className='btn btn-dark' onClick={getdata}>Get Data</button>
      </div> */}
      <br /><br />
      <div className="container">
        <div className="text-center">
          <div className='container'>
            {dataArray.map((data, dataIndex) => {
              if (!requestNumberArr.includes(data.requestno) && requestNumberArr2.includes(data.requestno)) {
                return (
                  <>
                    <div className='card'>
                      <div className='card-header bg-dark text-white d-flex justify-content-start '>
                        Request-{data.requestno}
                      </div>
                      <br/>
                      <div className='card-body'>
                        <h5 className='card-title d-flex justify-content-start'>BUGS:{data.bugs}</h5>
                        <br/>
                        <h5 className='card-title d-flex justify-content-start'>Features:{data.features}</h5>
                        <br/>
                        <h5 className='card-title d-flex justify-content-start'>Target date:{data.date}</h5>
                        <br />
                        {/* <button className='text-white btn btn-dark d-flex justify-content-end'
                            
                        >UPLOAD Patch</button> */}
                        <div className=' d-flex justify-content-end'>
                        <button className='text-white btn btn-primary' onClick={() => {
                              Navigate("/Developer/createsPatches", {
                                state: { data: data },
                              });
                              
                            }}>
                              {/* <i class="zmdi zmdi-upload">
                              style={{ fontSize: '2em' }}
                              </i> */}
                              UPLOAD Patch
                      </button>
                        </div>
                      
                        <br />
                      </div>
                    </div>
                    <br />
                  </>
                );
              }
            })}
          </div>
        </div>


      </div>
    </div>
  )

}

export default DevelopergetsRejectedPatches;
