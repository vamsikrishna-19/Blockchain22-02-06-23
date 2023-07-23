import React, { useState, useEffect } from 'react'
import Web3Contract2 from './Web3Contract2'
// import Web3Contract1 from './Web3Contract1';
import { useNavigate } from 'react-router-dom';
const DevelopergetsRequest = () => {
  const Navigate = useNavigate();
  const Web3Contract = Web3Contract2();
  const contract2 = Web3Contract[0];
  // const Web3_1 = Web3Contract1();
  // const contract = Web3_1[0];
  const [flag, setFlag] = useState(false);
  let requestnoarr = [];
  const [requestNumberArr, setrequestNumberArr] = useState([])
  const [dataArray, setdataArray] = useState([]);
  const getdata = async () => {
    try {
      contract2.methods.getdetails().call().then((res) => {
        console.log(res.length + 1);
        for (let i = 0; i < res.length; i++) {
          requestnoarr.push(res[i].requestnumber);
          setrequestNumberArr((reqNo) => ([...reqNo, res[i].requestnumber]));
        }
        console.log(requestnoarr);
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
  const formatDate = (value) => {
    const transactionTimeString = value;
    const transactionTime = new Date(transactionTimeString);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    return transactionTime.toLocaleDateString('en-US', options);
  };
  useEffect(() => {
    getdata();
  }, [contract2]);
  useEffect(() => {
    // Check if there are any matching requests and setting  flag

    const flag = dataArray.some((data) => !requestNumberArr.includes(data.requestno));
    setFlag(flag);
    let count = 0;
    dataArray.map((data) => {
      console.log(data.bugs);
      if (!requestNumberArr.includes(data.requestno)) {
        count += 1;
      }
    })
    // RequestCount(count);

  }, [dataArray, requestNumberArr]);
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
              console.log(data.bugs);
              if (!requestNumberArr.includes(data.requestno)) {
                return (
                  <>
                    <div className='card' style={{ borderColor: "darkviolet" }}>
                      <div className='card-header  text-white d-flex justify-content-start ' style={{ backgroundColor: "violet" }}>
                        <b>
                          <h4>

                            Request No-{Number(data.requestno)}
                          </h4>
                        </b>
                      </div>
                      <br />
                      <div className='card-body'>
                        <div className='row'>
                          <div className='col-6'>
                            <div className='d-flex justify-content-start'>
                              <h5 className='col-4'>

                                <b style={{ color: '' }}>
                                  Bugs:
                                </b>
                              </h5>
                              <div className=' d-flex justify-content-start col-8'>

                                <ul>

                                  {data.bugs.map((d, dIndex) => {
                                    return (
                                      <>
                                        <li key={dIndex}>
                                          {d}
                                        </li>

                                      </>
                                    );
                                  })}

                                </ul>
                                {/* {data.bugs.join(',')} */}
                              </div>
                            </div>
                          </div>
                          {/* style={{ color: '' }} */}
                          <div className='col-6'>
                            <div className='d-flex justify-content-start'>
                              <h5 className='mx-2 col-3'>
                                <b style={{ color: '' }}>
                                  Features:
                                </b>
                              </h5>
                              <div className='d-flex justify-content-start col-9'>
                                <ul>
                                  {data.features.map((d, dIndex) => {
                                    return (
                                      <>
                                        <li key={dIndex}>
                                          {d}
                                        </li>

                                      </>
                                    );
                                  })}
                                </ul>
                                {/* {data.features.join(',')} */}
                              </div>
                            </div>
                          </div>
                        </div>
                        <br />
                        <div className=' d-flex justify-content-start align-items-center'>
                          <h5 className='mx-2'>

                            <b style={{ color: '' }}>

                              Target date:
                            </b>
                          </h5>
                          <div className=''>

                            {formatDate(data.date)}
                          </div>
                        </div>
                        <br />
                        <div className=' d-flex justify-content-start'>
                          <h5 className='mx-2'>

                            <b style={{ color: '' }}>
                              Software:
                            </b>
                          </h5>
                          <div>

                            {data.software}
                          </div>
                        </div>

                        <div className='d-flex justify-content-end'>

                          <button className='text-white btn ' style={{ backgroundColor: "blueviolet" }} onClick={() => {
                            Navigate("/Developer/createsPatches", {
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
              }
            })}
          </div>
        </div>
        {flag == false &&
          (
            <>
              <div>
                <b>
                  Currently No Requests Available
                </b>
              </div>
            </>
          )
        }
      </div>
    </div>
  )

}

export default DevelopergetsRequest;
