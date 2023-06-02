import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Web3Contract1 from "./Web3Contract1";

import { useNavigate } from "react-router-dom";
// import "./UserReportBugsFeatures.css";

function UserReportBugsFeatures() {
  const Web3=Web3Contract1();
  const contract=Web3[1];
  const account=Web3[0];
  console.log(contract);
  
  const Navigate = useNavigate();
  
  
  const addanother = () =>{
    
    const cell1 = document.createElement("textarea");
    const div=document.createElement('div');
    div.classList.add("input-group","mb-3");
    const btn=document.createElement("button");
    btn.classList.add("input-group-text","btn", "btn-outline-primary");
    btn.type="button";
    btn.textContent="+";
    btn.onclick=addanother;
    document.getElementById("addanother")
    .appendChild(document.createElement("br"));
    cell1.classList.add("form-control", "col-12", "col-lg-6", "input", "BUGS");
    cell1.setAttribute("placeholder", "Enter Bugs");
    // cell1.id = "bug" + `${count}`;
    // console.log(count);
    div.appendChild(cell1);
    div.appendChild(btn);
    document.getElementById("addanother").appendChild(div);
  };

  const addanotherfeature = () => {
    const cell2 = document.createElement("textarea");
    const div=document.createElement("div");
    div.classList.add("input-group","mb-3");
    const btn=document.createElement("button");
    btn.classList.add("input-group-text","btn", "btn-outline-primary");
    btn.onclick=addanotherfeature;
    btn.type="button";
    btn.textContent="+";
    document
      .getElementById("addanotherFeature")
      .appendChild(document.createElement("br"));
    cell2.classList.add("form-control", "col-12", "col-lg-6", "input","Features");
    cell2.setAttribute("placeholder", "Enter Feature");
    div.appendChild(cell2);
    div.appendChild(btn);
    document.getElementById("addanotherFeature").appendChild(div);
  };
  const sendfeedback = async () => {
    let arr = [];
    let arr2 = [];
    const bugs=document.getElementsByClassName("BUGS");
    for(let i=0;i<bugs.length;i++){
      arr.push(bugs[i].value);
    }
    const features=document.getElementsByClassName("Features");
    for(let j=0;j<features.length;j++){
      arr2.push(features[j].value);
    }
    console.log(arr,arr2);
    const environmentdetails =
      document.getElementById("environmentdetails").value;

    contract.methods
      .feedbacks(arr, arr2, environmentdetails)
      .send({ from: account })
      .then((result) => {
        console.log(result);
        document.getElementById("connection").innerHTML =
          result.transactionHash;
        const transactionsuccess = document.getElementById(
          "TransactionSuccessfull"
        );
        const div = document.createElement("div");
        div.classList.add("alert", "alert-primary");
        div.role = "alert";

        div.innerHTML =
          "Transaction Successfull with Transaction ID - " +
          `${result.transactionHash}`;
        transactionsuccess.appendChild(div);
        setTimeout(function () {
          window.location.reload();
        }, 3000);
      });
  };
  return (
    <>
    <div id="TransactionSuccessfull">

    </div>
      <div className="container my-5">
        <div className=" text-center">
          
          <div>
            <form action="/">
              <div className="container">
                <div className="form-group">
                  <div className="row mb-3 align-items-end">
                    <label for="environmentdetails1" className="col-lg-3">
                      <h5 id="environmentdetails1"> Applications:</h5>
                    </label>
                    <div className="col-12 col-lg-6 ">
                      <div className="form-group">
                        
                        <select
                          id="environmentdetails"
                          className="form-control col-6"
                        >
                          <option value="Select Software" selected>
                            Select Software
                          </option>
                          <option value="Windows11">Windows11</option>
                          <option value="Windows10">Windows10</option>
                          <option value="Mac12">Mac12</option>
                          <option value="Mac11">Mac11</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <br />

                  <div className="row mb-3 align-items-center">
                    <label className="col-lg-3">
                      <h5 id="bugs"> Bugs :</h5>
                    </label>

                    <div className="col-12 col-lg-6" id="addanother">
                      <div className="input-group mb-3">
                        <textarea
                          className="form-control input BUGS"
                          id="bug1"
                          placeholder="Enter bugs"
                        ></textarea>
                        <button
                          className="input-group-text btn btn-outline-primary "
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Click Me To Add Another Bug"
                          type="button"
                          id="basic-addon1"
                          onClick={addanother}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br />

              <div className="row mb-3 align-items-center">
                <label for="features" className="col-lg-3">
                  <h5 id="features"> Features :</h5>
                </label>
                <div className="col-12 col-lg-6" id="addanotherFeature">
                  <div className="input-group mb-3">
                    <textarea
                      className="form-control input Features"
                      id="feature1"
                      placeholder="Enter Features ..."
                    ></textarea>
                    <button
                      className="input-group-text btn btn-outline-primary "
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Click Me To Add Another Feature"
                      type="button"
                      id="basic-addon1"
                      onClick={addanotherfeature}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-12 col-lg-6 mx-auto">
                    <div>
                      <div
                        className="btn btn-dark"
                        onClick={sendfeedback}
                        type="submit"
                      >
                        Submit
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default UserReportBugsFeatures;
