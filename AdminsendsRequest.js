import React, { useState, useEffect } from "react";
// import Web3contract from "./web3contract1Enduser";
import Web3Contract1 from "./Web3Contract1";
// import Web3contract2 from "./web3contract2RegisterPatch";
import Web3Contract2 from "./Web3Contract2";
// import { get } from "prompt";
function AdminsendsRequest() {
    const Web3 = Web3Contract1();
    // const Web3Contract2 = Web3Contract2();
    const [select, setSelect] = useState("");
    const [dataArray, setDataArray] = useState([]);
    const [dataArray3, setDataArray3] = useState([]);
    const contract = Web3[1];
    const account = Web3[0];

    // console.log(contract)
    const handleOnChangeselect = async (event) => {

        setSelect(event.target.value);
        contract.methods.get().call().then((result) => {
            setDataArray(result);

        })


    }
    const SelectedBugsFeatures=()=>{

    }
   
    return (
        <>
            <div className="container">
                <div className="card">
                    
                    <div className=" d-flex align-items-end my-5">
                        <div className="dropdown row mx-auto">
                            <label for="mySelect" className="col">
                                <h5>Select Software </h5>
                            </label>
                            <select
                                id="mySelect"
                                className="form-control col-6"
                                onChange={handleOnChangeselect}
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
                    <div className="container">
                        <div className="row">
                            <h3 className="col-sm-6 mt-2" id="bugs_selection">
                                Bugs
                                <table className="table">
                                    <thead className="col-12">
                                        <tr>
                                            <th scope="col-1" className="col-1 justify-content-center"> <h6> Select </h6> </th>
                                            <th scope="col-9" className="col-9 justify-content-center " > <h6> Bugs</h6> </th>
                                            <th scope="col-2" className="col-2 justify-content-center"> <h6>Priority </h6> </th>
                                        </tr>
                                    </thead>
                                    <tbody className="col-12">
                                        {dataArray.map((data, dataIndex) => {
                                            return (
                                                <>
                                                    {data.labelstatus.map((label, labelIndex) => {
                                                        if (label==0 && data.bugspriority[labelIndex]!=0 && data.environmentDetails == select) {
                                                            return (
                                                                <>
                                                                    <tr className="col-12 align-items-center">
                                                                        <td scope="col-1" className="col-1 ">
                                                                            <div className="form-check">
                                                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" />

                                                                            </div>
                                                                        </td>
                                                                        <td scope="col-9" className="col-9 justify-content-center">
                                                                            <li className="align-items-center d-flex justify-content-between col-12 list-group-item form-control" key={labelIndex}> <h6> {data.bugs[labelIndex]} </h6> </li>
                                                                        </td>
                                                                        <td scope="col-2" className="col-2 justify-content-center">
                                                                            <li className="align-items-center d-flex justify-content-between col-12 list-group-item form-control" key={labelIndex}> <h6>  Priority:{data.bugspriority[labelIndex]}  </h6> </li>

                                                                        </td>
                                                                    </tr>
                                                                </>
                                                            )
                                                        }
                                                    })}

                                                </>
                                            )
                                        })
                                        }
                                    </tbody>
                                </table>



                            </h3>
                            <h3 className="col-sm-6 mt-2" id="features_selection">
                                Features:

                                <table className="table">
                                    <thead className="col-12">
                                        <tr>
                                            <th scope="col-1" className="col-1 justify-content-center"> <h6> Select </h6> </th>
                                            <th scope="col-9" className="col-9 justify-content-center " > <h6> Features </h6> </th>
                                            <th scope="col-2" className="col-2 justify-content-center"> <h6>Priority </h6> </th>
                                        </tr>
                                    </thead>
                                    <tbody className="col-12">
                                        {dataArray.map((data, dataIndex) => {
                                            return (
                                                <>
                                                    {data.labelstatusfeatures.map((label, labelIndex) => {
                                                        if (label == 0 && data.featurespriority[labelIndex]!=0 && data.environmentDetails == select) {
                                                            return(
                                                                <>
                                                                    <tr className="col-12 align-items-center">
                                                                        <td scope="col-1" className="col-1 ">
                                                                            <div className="form-check">
                                                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" />

                                                                            </div>
                                                                        </td>
                                                                        <td scope="col-9" className="col-9 justify-content-center">
                                                                            <li className="align-items-center d-flex justify-content-between col-12 list-group-item form-control" key={labelIndex}> <h6> {data.features[labelIndex]} </h6> </li>
                                                                        </td>
                                                                        <td scope="col-2" className="col-2 justify-content-center">
                                                                            <li className="align-items-center d-flex justify-content-between col-12 list-group-item form-control" key={labelIndex}> <h6>  Priority:{data.featurespriority[labelIndex]}  </h6> </li>

                                                                        </td>
                                                                    </tr>
                                                                </>
                                                            )
                                                        }
                                                    })}
                                                </>
                                            )
                                        })
                                        }
                                    </tbody>
                                </table>
                            </h3>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center ">
                        <button
                            className="btn btn-dark mx-6 "
                            type="button"
                            onClick={SelectedBugsFeatures()}
                        >
                            selected Bugs and Features
                        </button>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <div className="container">
                        <form className="border rounded mx-auto box">
                            <div className="container">
                                <div className="row">
                                    <div className="col-6 ">
                                        <h5> REQUEST TO DEVELOPER </h5>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-6 mx-auto" id="selectedBugs">
                                        <h3>Bugs You Have Selected</h3>
                                    </div>
                                    <div className="col-6 mx-auto" id="selectedfeatures">
                                        <h3>Features You Have Selected</h3>
                                    </div>
                                </div>
                                <div className="row my-5">
                                    <div className="col-6 mx-auto my-4">
                                        <label for="">
                                            <h5>Target Date</h5>
                                        </label>
                                        <input type="date" className="mx-4" id="Date" />
                                    </div>
                                </div>
                                <div className="row my-5">
                                    <div className="col-6 mx-auto  ">
                                        <label for="">
                                            <h5>Request No</h5>
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="1"
                                            className="mx-4"
                                            id="RequestNo"
                                            readonly
                                        />
                                    </div>
                                </div>
                                <div className="row ">
                                    <div className="col-6 mx-auto  ">
                                        <button
                                            className="btn btn-dark  mx-auto col-5"
                                            type="button"
                                            onClick="requestdev()"
                                        >
                                            Send Request To Develeper
                                        </button>
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
export default AdminsendsRequest;
