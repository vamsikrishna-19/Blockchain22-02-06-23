import React, { useEffect, useState } from 'react'
import Web3Contract2 from './Web3Contract2';
import ConnectMetaMask from './ConnectMetaMask';
const LabelledBugsandFeatures = () => {
  const [dataArray, setdataArray] = useState([]);
  const [select, setSelect] = useState("");
  const Web3Contract = Web3Contract2();
  const contract2 = Web3Contract[0];
  const Account=ConnectMetaMask();
  const account=Account[0];
  async function handleOnChange(event) {
    setSelect(event.target.value);
    contract2.methods.get().call().then((result) => {
      console.log(result);
      setdataArray(result);
    })
  }
  let i1=0;
  let i2=0;
  return (
    <div>
     <br /><br />
      <div className="container">
        <div className="text-center">
          <div className="card-body">
            <div className="container">
              <div className=" d-flex align-items-end">
                <div className="dropdown row mx-auto">
                  <select id="mySelect" className="form-control col-6"  onChange={handleOnChange}>
                    <option value="Select Software" selected>Select Software</option>
                    <option value="Windows11">Windows11</option>
                    <option value="Windows10">Windows10</option>
                    <option value="Mac12">Mac12</option>
                    <option value="Mac11">Mac11</option>
                  </select>
                </div>
              </div>
              <div className="bugs_label input-group mt-5" id="bugs_label">
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <ol>
              <h3 className='d-flex justify-content-center'>Bugs</h3>
              {dataArray.map((data, dataIndex) => {
                return (
                  <>
                    <ul className="list-group">
                     
                      {data.labelstatus.map((label, labelIndex) => {
                        if (label != 0 && data.environmentDetails == select) {
                          
                          return(
                            <>
                              <li className="align-items-center d-flex justify-content-between col-12 list-group-item form-control" key={labelIndex} >{data.bugs[labelIndex]}</li>          
                              <li className='input-group-item form-control my-select   d-inline-block d-flex justify-content-between'>
                                  Proirity:  {Number(data.bugspriority[labelIndex])}
                              </li>
                              <br />
                            </>
                          )
                        }
                      })}
                    </ul>
                  </>
                );
              })}
            </ol>
          </div>
          <div className="col-6">
            <ol>
              <h3 className='d-flex justify-content-center'>Features</h3>
              {dataArray.map((data, dataIndex) => {
                return (
                  //   <li key={dataIndex}>
                  <>
                    <ul className="list-group">
                    
                      {data.labelstatusfeatures.map((labelfeature, labelIndexfeature) => {
                        if (labelfeature != 0 && data.environmentDetails == select) {
                          
                          return (
                            <>
                              <li className="align-items-center d-flex justify-content-between col-12 list-group-item form-control" key={labelIndexfeature} >{data.features[labelIndexfeature]}</li>
                              <li className='input-group-item form-control my-select   d-inline-block d-flex justify-content-between'>
                                  Proirity:  {Number(data.featurespriority[labelIndexfeature])}
                              </li>
                              <br />
                            </>
                          )
                        }
                      })}
                     
                    </ul>
                  </>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LabelledBugsandFeatures




