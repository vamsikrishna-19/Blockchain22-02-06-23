import React, { useState, useEffect } from 'react'
import Web3Contract2 from './Web3Contract2'

import { useNavigate } from 'react-router-dom';
const DevelopergetsRejectedPatches = () => {
  const Web3Contract = Web3Contract2();
  const contract2 = Web3Contract[0];
  const Navigate = useNavigate();
  const [patchObject, setPatchObject] = useState({});
  const [requestNumberArr, setrequestNumberArr] = useState([]);
  const [requestNumberArr2, setrequestNumberArr2] = useState([]);
  // const [dataArray, setdataArray] = useState([]);
  const [dataArray2, setdataArray2] = useState([]);
  const [flag, setFlag] = useState(false);
  const getdata = async () => {
    try {
      // await contract2.methods.getdetailsRequest().call().then((result) => {
      // });
       contract2.methods.getdetails().call().then((res) => {
        // setdataArray(result);
        console.log(res.length + 1);
        console.log(res);
        setdataArray2(res);
        for (let i = 0; i < res.length; i++) {
          setrequestNumberArr2((reqNo) => ([...reqNo, res[i].requestnumber]));
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
  }
  useEffect(() => {
    getdata();
  }, [contract2]);
  useEffect(() => {
    // Check if there are any matching requests
    let flag = false;
    let count=0;
    for (let i = 0; i < dataArray2.length; i++) {

      const data = dataArray2[i];
      if (
        patchObject[data.requestnumber] === data.patchno &&
        data.verificationstatus === 'Rejected' &&
        !requestNumberArr.includes(data.requestno)
      ) {
        flag = true;
        break;
      }
    }
    setFlag(flag);
    console.log(count);
    // RejectedCount1(count);

  }, [dataArray2, requestNumberArr]);
  return (
    <div>
      <br /><br />
      <div className="container">
        <div className="text-center">
          <div className='container'>
            {dataArray2.map((data, dataIndex) => {
             
              if (patchObject[data.requestnumber] == data.patchno && data.verificationstatus == "Rejected" && !requestNumberArr.includes(data.requestno)) {
                
                return (
                  <>
                    <div className='card'>
                      <div className='card-header bg-dark text-white d-flex justify-content-start '>
                        <h4>
                          
                        Request-{data.requestnumber}
                        </h4>
                      </div>
                      <br />
                      <div className='card-body'>
                        <h5 className='card-title d-flex justify-content-start'>
                          <b className='mx-2'>

                            Patch Name:
                          </b>
                          {data.patchname}</h5>
                        <br />
                        <h5 className='card-title d-flex justify-content-start'>
                          <b className='mx-2'>

                            Patch Features:
                          </b>
                          {data.patchfeatures}</h5>
                        <br />
                        <h5 className='card-title d-flex justify-content-start'>
                          <b className='mx-2'>

                            Rejected Due to:
                          </b>
                          {data.rejectdescription}</h5>
                        <br />
                        <h5 className='card-title d-flex justify-content-start'>
                          <b className='mx-2'>

                            Version:
                          </b>
                          {data.version}</h5>
                        <br />

                        <div className=' d-flex justify-content-end'>
                          <button className='text-white btn btn-dark' onClick={() => {
                            Navigate("/Developer/SolveRejectedPatches", {
                              state: { data: data },
                            });
                          }}>
                            UPLOAD Patch
                          </button>
                        </div>

                        <br />
                      </div>
                    </div>
                    <br />
                  </>
                );
                // }
              }


            })}

          </div>

        </div>
        {/* {
              flag==false && (
                <>
                  <div>
                    <h4>
                     Currently There are no rejected Patches Available
                    </h4>
                  </div>
                </>
              )
            } */}
      </div>
    </div>
  )

}

export default DevelopergetsRejectedPatches;
