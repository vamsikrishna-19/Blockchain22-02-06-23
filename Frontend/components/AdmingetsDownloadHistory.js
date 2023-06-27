import { useState, useEffect } from "react"
import React from 'react';
import Web3Contract3 from "./Web3Contract3";
import Web3Contract2 from "./Web3Contract2";
const AdmingetsDownloadHistory = () => {
  const Web3 = Web3Contract3();
  const contract3 = Web3[1];
  const account3 = Web3[0];
  const Web3ContractUsers = Web3Contract2();
  const contract2 = Web3ContractUsers[1];
  const account2 = Web3ContractUsers[0];
  console.log(contract2);
  console.log(contract3);
  const [myselect, setMyselect] = useState("");
  const [DataArray, setDataArray] = useState([]);
  const [DataArray2, setDataArray2] = useState([]);
  async function recievepatchdata() {
    contract2.methods.getdetails().call().then((result) => {
      console.log(result);
      setDataArray(result);
    })
  }
  const getData = () => {
    console.log(myselect);
  }
  const setTime = (timestamp) => {
    const milliseconds = timestamp * 1000;
    const dateObject = new Date(milliseconds);
    const formattedTime = dateObject.toLocaleString();
    return (`${formattedTime}`);
  }
  const function1 = async (value) => {
    contract3.methods.getdatausingPatch(value).call().then((res) => {
      console.log(res);
      setDataArray2(res);
    })
  }
  useEffect(() => {
    if (contract2 != "undefined" && contract3 != "undefined") {
      recievepatchdata();
    }
  }, [contract2, contract3]);

  return (
    <div>
      <div className="my-5 d-flex justify-content-center ">
        <select name="selectPatch" value={myselect} id="myselect" className="col-4 form-control-lg" onChange={(e) => {
          let value = e.target.value;
          function1(value);
        }}>
          <option >Select Patch</option>
          {
            DataArray.map((data, dataIndex) => {
              if (data.deploymentstatus == "Deployed") {
                return (
                  <>
                    <option key={data.patchname} value={data.patchname}>{data.patchname}</option>
                  </>
                )
              }
            })
          }
        </select>
      </div>
      {DataArray2.map((data, dataIndex) => {
        return (
          <>
            <li className="form-control">
              {data.Username1}-{setTime(data.timeofDownload)}
            </li>
          </>
        )
      })
      }
    </div>
  )
}

export default AdmingetsDownloadHistory
