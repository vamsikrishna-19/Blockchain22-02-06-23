import React, { useState, useEffect } from 'react'
import Web3Contract2 from './Web3Contract2'
import Web3Contract1 from './Web3Contract1';
import { useNavigate } from 'react-router-dom';
const DevelopergetsRequest = ({ RequestCount }) => {
  const Navigate = useNavigate();
  const Web3Contract = Web3Contract2();
  const contract2 = Web3Contract[0];
  const Web3_1 = Web3Contract1();
  const contract = Web3_1[0];
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
  useEffect(() => {
    getdata();
  }, [contract2]);
  useEffect(() => {
    // Check if there are any matching requests and setting  flag

    const flag = dataArray.some((data) => !requestNumberArr.includes(data.requestno));
    setFlag(flag);
    let count = 0;

    dataArray.map((data, dataIndex) => {
      console.log(data.bugs);
      if (!requestNumberArr.includes(data.requestno)) {
        count += 1;
      }
    })
    RequestCount(count);

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
                    <div className='card'>
                      <div className='card-header bg-dark text-white d-flex justify-content-start '>
                        <b>
                          <h4>

                            Request No-{data.requestno}
                          </h4>
                        </b>
                      </div>
                      <br />
                      <div className='card-body'>
                        <h5 className='d-flex justify-content-start'>
                          <b>
                            Bugs:
                          </b>
                          <p>

                            {data.bugs.join(',')}
                          </p>

                        </h5>
                        <br />
                        <h5 className=' d-flex justify-content-start'>
                          <b>

                            Features:
                          </b>
                          <p>

                            {data.features.join(',')}
                          </p>
                        </h5>
                        <br />
                        <h5 className=' d-flex justify-content-start'>
                          <b>

                            Target date:
                          </b>
                          <p>

                            {data.date}
                          </p>
                        </h5>
                        <br />
                        <h5 className=' d-flex justify-content-start'>
                          <b>
                            Software:
                          </b>
                          {data.software}</h5>

                        <div className='d-flex justify-content-end'>

                          <button className='text-white btn btn-dark ' onClick={() => {
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
                <h4>
                  Cuurently No Requests Available
                </h4>
              </div>
            </>
          )
        }
      </div>
    </div>
  )

}

export default DevelopergetsRequest;
