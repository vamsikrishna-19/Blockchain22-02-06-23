import React, { useEffect, useState } from 'react'
import Web3Contract1 from './Web3Contract1';

const LabelledBugsandFeatures = () => {
  const [dataArray, setdataArray] = useState([]);
  const [select, setSelect] = useState("");
  const Web3 = Web3Contract1();
  const contract = Web3[1];
  const account = Web3[0];
  async function handleOnChange(event) {

    setSelect(event.target.value);
    contract.methods.get().call().then((result) => {
      console.log(result);
      setdataArray(result);
    })
  }

  return (
    <div>
     <br /><br />
      <div class="container">
        <div class="text-center">

          <div class="card-body">
            <div class="container">
              <div class=" d-flex align-items-end">
                <div class="dropdown row mx-auto">

                  <select id="mySelect" class="form-control col-6" onChange={handleOnChange}>
                    <option value="Select Software" selected>Select Software</option>
                    <option value="Windows11">Windows11</option>
                    <option value="Windows10">Windows10</option>
                    <option value="Mac12">Mac12</option>
                    <option value="Mac11">Mac11</option>
                  </select>
                </div>
              </div>
              <div class="bugs_label input-group mt-5" id="bugs_label">
              </div>

            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <ol>
              {dataArray.map((data, dataIndex) => {
                return (
                  <>
                    <ul className="list-group">
                      {data.labelstatus.map((label, labelIndex) => {
                        if (label != 0 && data.environmentDetails == select) {
                          return (
                            <>
                              <li className="align-items-center d-flex justify-content-between col-12 list-group-item form-control" key={labelIndex}>{data.bugs[labelIndex]}</li>          
                              <li className='input-group-item form-control my-select me-end p-2 d-inline-block d-flex justify-content-between'>

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
              {dataArray.map((data, dataIndex) => {
                return (
                  //   <li key={dataIndex}>
                  <>
                    <ul className="list-group">
                      {data.labelstatusfeatures.map((labelfeature, labelIndexfeature) => {
                        if (labelfeature != 0 && data.environmentDetails == select) {
                          return (
                            <>
                              <li className="align-items-center d-flex justify-content-between col-12 list-group-item form-control" key={labelIndexfeature}>{data.features[labelIndexfeature]}</li>
                              
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
