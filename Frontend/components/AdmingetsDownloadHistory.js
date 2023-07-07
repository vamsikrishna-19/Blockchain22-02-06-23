import { useState, useEffect } from "react"
import React from 'react';
import Axios from "axios";
import Web3Contract3 from "./Web3Contract3";
import Web3Contract2 from "./Web3Contract2";
import ConnectMetaMask from "./ConnectMetaMask";
const AdmingetsDownloadHistory = () => {
  const Web3 = Web3Contract3();
  const contract3 = Web3[0];
  const Web3Contract = Web3Contract2();
  const contract2 = Web3Contract[0];
  const Account=ConnectMetaMask();
  const account=Account[0];
  console.log(contract2);
  console.log(contract3);
  const [Flag,setFlag]=useState(false);
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
      try{
        console.log(value);
          const res=await Axios.get("http://localhost:3001/getdownloadHistory/patchname",{
            params:{
              Patchname:value
            }
          })
          console.log(res.data);
          setDataArray2(res.data);
          setFlag(false);
      }
      catch(error){
        console.log(error);
        setFlag(true);
        setDataArray2([]);
      }
  }
  useEffect(() => {
    if (contract2 != "undefined" ) {
      recievepatchdata();
    }
  }, [contract2, contract3]);

  return (
    <div>
      <div className="my-5 d-flex justify-content-center ">
        <select name="selectPatch"  value={myselect} id="myselect" className="col-4 form-control-lg" onChange={(e) => {
          // let value = e.target.value;
          setMyselect(e.target.value);
          function1(e.target.value);
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
      {Flag == true &&
          (
            <>
              <div className="container-fluid my-4 mx-4">
                <h5>
                <b style={{color:"red"}}>
                  No data Available
                </b>
                </h5>
              </div>
            </>
          )
        }
      {DataArray2.map((data, dataIndex) => {
        return (
          <>
            <li className="form-control">
              <span className="text-success mx-1" style={{}}>
            <b>

              {data.Username}
            </b>
              </span>
                has downloaded the patch on 
              <span className="text-primary mx-2">
               <b>
                {data.Date.toLocaleString()}
               </b>

              </span>
            </li>
          </>
        )
      })
      }
    </div>
  )
}

export default AdmingetsDownloadHistory
