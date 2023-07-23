import React, { useState, useEffect } from 'react'
import Web3Contract2 from './Web3Contract2'

import { useNavigate } from 'react-router-dom';
const DevelopergetsRejectedPatches = () => {
  const Web3Contract = Web3Contract2();
  const contract2 = Web3Contract[0];
  const Navigate = useNavigate();
  const [requestNumberArr, setrequestNumberArr] = useState([]);
  const [requestNumberArr2, setrequestNumberArr2] = useState([]);
  // const [dataArray, setdataArray] = useState([]);
  const [dataArray2, setdataArray2] = useState([]);
  const [flag, setFlag] = useState(false);
  const [patchObject, setPatchObject] = useState({});
  const getdata = async () => {
    try {
       contract2.methods.getdetails().call().then((res) => {
        // setdataArray(result);
        console.log(res.length + 1);
        console.log(res);
        setdataArray2(res);
        for (let i = 0; i < res.length; i++) {
          // setrequestNumberArr2((reqNo) => ([...reqNo, res[i].requestnumber]));
          if(res[i].verificationstatus == "Verified" || res[i].verificationstatus == "IN PROGRESS") {
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
    if(contract2){

      getdata();
    }
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
                    <div className='card' style={{ borderColor: "violet" }}>
                      <div className='card-header  text-white d-flex justify-content-start ' style={{ backgroundColor: "darkblue" }}>
                        <h4>
                          
                        Request No-{Number(data.requestnumber)}
                        </h4>
                      </div>
                      <br />
                      <div className='card-body'>
                        <div className=' d-flex justify-content-start'>
                          <h5>
                          <b className='mx-2'  style={{ color: '#' }}>
                            Patch Name:
                          </b>
                          </h5>
                          <div>
                          {data.patchname}
                          </div>
                          </div>
                        <br />
                        <div className=' d-flex justify-content-start'>
                          <h5>

                          <b className='mx-2' style={{ color: '#' }}>
                            Patch Features:
                          </b>
                          </h5>
                          <div>

                          {data.patchfeatures}
                          </div>
                          </div>
                        <br />
                        <div className=' d-flex justify-content-start'>
                          <h5>

                          <b className='mx-2' style={{ color: '#' }}>

                            Rejected Due to:
                          </b>
                          </h5>
                          <div>

                          {data.rejectdescription}
                          </div>
                          </div>
                        <br />
                        <div className=' d-flex justify-content-start'>
                          <h5>
                          <b className='mx-2' style={{ color: '#' }}>
                            Software:
                          </b>
                          </h5>
                          <div>
                          {(data.patchplatform)}
                          </div>
                          </div>
                        <div className=' d-flex justify-content-end'>
                          <button className='text-white btn' style={{ backgroundColor: "blueviolet" }} onClick={() => {
                            Navigate("/Developer/SolveRejectedPatches", {
                              state: { data: data },
                            });
                          }}>
                            UPLOAD Patch
                          </button>
                        </div>
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
        {
              flag==false && (
                <>
                  <div>
                    <b>
                     Currently there are no Rejected Patches Available
                    </b>
                  </div>
                </>
              )
            }
      </div>
    </div>
  )

}

export default DevelopergetsRejectedPatches;
