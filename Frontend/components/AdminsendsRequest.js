import React, { useState, useEffect } from "react";
import Web3Contract1 from "./Web3Contract1";
import Web3Contract2 from "./Web3Contract2";
import Axios from "axios";
import ConnectMetaMask from "./ConnectMetaMask";
function AdminsendsRequest() {
    const Web3ContractAndAddress = Web3Contract1();
    const Web3ContractAndAddress2 = Web3Contract2();
    const [select, setSelect] = useState("");
    const [dataArray, setDataArray] = useState([]);
    const Web3 = require('web3');


    const web3 = new Web3('HTTP://127.0.0.1:7545');


    // const [dataArray3, setDataArray3] = useState([]);
    const contract = Web3ContractAndAddress[0];
    const contract2 = Web3ContractAndAddress2[0];
    const Account=ConnectMetaMask();
    const account=Account[0];
    const [requestNo, setRequestNo] = useState(0);
    const handleOnChangeselect = async (event) => {
        setSelect(event.target.value);
        contract.methods.get().call().then((result) => {
            setDataArray(result);
        })
        contract2.methods.getdetailsRequest().call().then((result) => {
            console.log(result);
            setRequestNo(result.length + 1);
        });
    }
    const [date, setDate] = useState("");
    const handleDate = (e) => {
        setDate(e.target.value)
    }
    const requestdev = () => {
        const usertype = sessionStorage.getItem('Role');
        const username = sessionStorage.getItem('Username');
        contract.methods.setbugfeaturelabel(bugArray, featureArray).send({ from: account }).then((result) => {

            console.log(result);

            web3.eth.getTransactionReceipt(result.transactionHash, async (error, receipt) => {
                if (error) {
                    console.log("Error occured while getting transaction Reciept", error);
                }
                console.log(receipt);
                try {
                    const res = await Axios.post('http://localhost:3001/TransactionHistory', {
                        usertype: usertype,
                        username: username,
                        status: receipt.status,
                        transactionHash: result.transactionHash,
                        blockHash: receipt.blockHash,
                        contractAddress: receipt.contractAddress,
                        blockNumber: receipt.blockNumber,
                        gasUsed: receipt.gasUsed,
                        from: receipt.from,
                        to: receipt.to,
                        typeOfTransaction: "Changed the status for bugs and features",
                    },
                    );
                    console.log(res.data);
                }
                catch (error) {
                    console.log(error);
                }
            });
        }).catch((error) => {
            // console.log(error.message);
            const jsonString = error.message;
           
            console.log(error.message);
            const hashIndex = jsonString.indexOf('"hash":"');
            
            const start = hashIndex + 8;
            const end = jsonString.indexOf('"', start);
            const hash = jsonString.substring(start, end);
            console.log("Hash value:", hash);
            web3.eth.getTransactionReceipt(hash, async (error, receipt) => {
                if (error) {
                    console.log("Error occured while getting transaction Reciept", error);
                }
                console.log(receipt);
                try {
                    const res = await Axios.post('http://localhost:3001/TransactionHistory', {
                        usertype: usertype,
                        username: username,
                        status: receipt.status,
                        transactionHash: hash,
                        blockHash: receipt.blockHash,
                        contractAddress: receipt.contractAddress,
                        blockNumber: receipt.blockNumber,
                        gasUsed: receipt.gasUsed,
                        from: receipt.from,
                        to: receipt.to,
                        typeOfTransaction: "Transaction failed",
                    },
                    );
                    console.log(res.data);
                }
                catch (error) {
                    console.log(error);
                }
            });

        });
        contract2.methods.setRequest(bugArray, featureArray, date, requestNo, select)
            .send({ from: account })
            .then((result) => {
                web3.eth.getTransactionReceipt(result.transactionHash, async (error, receipt) => {
                    if (error) {
                        console.log("Error occurred while getting transaction Receipt", error);
                    } else {
                        console.log(receipt);
                        try {
                            const res = await Axios.post('http://localhost:3001/TransactionHistory', {
                                usertype: usertype,
                                username: username,
                                status: receipt.status,
                                transactionHash: result.transactionHash,
                                blockHash: receipt.blockHash,
                                contractAddress: receipt.contractAddress,
                                blockNumber: receipt.blockNumber,
                                gasUsed: receipt.gasUsed,
                                from: receipt.from,
                                to: receipt.to,
                                typeOfTransaction: "Sent Request to Developer of Request-No" + requestNo,
                            });
                            console.log(res.data);
                        } catch (error) {
                            console.log(error);
                        }
                    }
                });
            })
            .catch((error) => {
                const jsonString = error.message;
                console.log(error.message);
                const hashIndex = jsonString.indexOf('"hash":"');
                
                const start = hashIndex + 8;
                const end = jsonString.indexOf('"', start);
                const hash = jsonString.substring(start, end);
                console.log("Hash value:", hash);
                web3.eth.getTransactionReceipt(hash, async (error, receipt) => {
                    if (error) {
                        console.log("Error occured while getting transaction Reciept", error);
                    }
                    console.log(receipt);
                    try {
                        const res = await Axios.post('http://localhost:3001/TransactionHistory', {
                            usertype: usertype,
                            username: username,
                            status: receipt.status,
                            transactionHash: hash,
                            blockHash: receipt.blockHash,
                            contractAddress: receipt.contractAddress,
                            blockNumber: receipt.blockNumber,
                            gasUsed: receipt.gasUsed,
                            from: receipt.from,
                            to: receipt.to,
                            typeOfTransaction: "Transaction failed (Wrong Account)",
                        },
                        );
                        console.log(res.data);
                    }
                    catch (error) {
                        console.log(error);
                    }
                });
    
            });

        // contract2.methods.setRequest(bugArray, featureArray, date, requestNo,select ).send({ from: account }).then((result) => {
        //     // console.log(result);
        //     web3.eth.getTransactionReceipt(result.transactionHash, async (error, receipt) => {
        //         if (error) {
        //             console.log("Error occured while getting transaction Reciept", error);
        //         }
        //         console.log(receipt);
        //         try {
        //             const res = await Axios.post('http://localhost:3001/TransactionHistory', {
        //                 usertype: usertype,
        //                 username: username,
        //                 status: receipt.status,
        //                 transactionHash: result.transactionHash,
        //                 blockHash: receipt.blockHash,
        //                 contractAddress: receipt.contractAddress,
        //                 blockNumber: receipt.blockNumber,
        //                 gasUsed: receipt.gasUsed,
        //                 from: receipt.from,
        //                 to: receipt.to,
        //                 typeOfTransaction: "Sent Request to Developer of Request-No"+requestNo,
        //             },
        //             );
        //             console.log(res.data);
        //         }
        //         catch (error) {
        //             console.log(error);

        //         }
        //     });
        // }).catch((error)=>{
        //     console.log("vamsi");
        //     console.log(error);
        // })
    }
    const [bugArray, setBugArray] = useState([]);
    const handleOnChangeBugs = (bug) => (event) => {
        console.log(bugArray);
        const isChecked = event.target.checked;
        if (isChecked){
            setBugArray((prevbugs) => [...prevbugs, bug]);
        }
        else {
            setBugArray((prevbugs) => prevbugs.filter((name) => name != bug));
        }
    }
    const [featureArray, setfeatureArray] = useState([]);
    const handleOnChangeFeatures = (feature) => (event) => {
        const isCheckedfeature = event.target.checked;
        console.log(featureArray);
        if (isCheckedfeature) {
            setfeatureArray((prevFeatures) => [...prevFeatures, feature]);
        }
        else {
            setfeatureArray((prevFeatures) => prevFeatures.filter((name) => name != feature));
        }
    }
    const [showBugsFeatures, setShowBugsFeatures] = useState(false);
    useEffect(() => {

    }, [])

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
                                                        if (label == 0 && data.bugspriority[labelIndex] != 0 && data.environmentDetails == select) {
                                                            return (
                                                                <>
                                                                    <tr className="col-12 align-items-center">
                                                                        <td scope="col-1" className="col-1 ">
                                                                            <div className="form-check">
                                                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" onChange={handleOnChangeBugs(data.bugs[labelIndex])} />
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
                                                        if (label == 0 && data.featurespriority[labelIndex] != 0 && data.environmentDetails == select) {
                                                            return (
                                                                <>
                                                                    <tr className="col-12 align-items-center">
                                                                        <td scope="col-1" className="col-1 ">
                                                                            <div className="form-check">
                                                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" onChange={handleOnChangeFeatures(data.features[labelIndex])} />
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
                            onClick={() =>
                                setShowBugsFeatures(true)
                            }
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
                                    <div className="col-6" id="selectedBugs">
                                        <h3>Bugs You Have Selected</h3>
                                        {
                                            showBugsFeatures && (
                                                <ul>
                                                    {bugArray.map((item, index) => (
                                                        <div>
                                                            <br />
                                                            <li key={index} className="form-control">
                                                                {item}
                                                            </li>
                                                        </div>
                                                    )
                                                    )}
                                                </ul>
                                            )
                                        }
                                    </div>

                                    <div className="col-6" id="selectedfeatures">
                                        <h3>Features You Have Selected</h3>

                                        {
                                            showBugsFeatures && (
                                                <ul>
                                                    {
                                                        featureArray.map((item, index) => (
                                                            <div>
                                                                <br />
                                                                <li key={index} className="form-control">
                                                                    {item}
                                                                </li>

                                                            </div>
                                                        ))
                                                    }
                                                </ul>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="row my-5">
                                    <div className="col-6 mx-auto my-4">
                                        <label for="">
                                            <h5>Target Date</h5>
                                        </label>
                                        <input type="date" onChange={handleDate} className="mx-4" id="Date" />
                                    </div>
                                </div>
                                <div className="row my-5">
                                    <div className="col-6 mx-auto  ">
                                        <label for="">
                                            <h5>Request No</h5>
                                        </label>
                                        <input
                                            type="number"
                                            placeholder={requestNo}
                                            value={requestNo}
                                            readOnly={true}
                                            className="mx-4"
                                            id="RequestNo"
                                            readonly
                                        />
                                    </div>
                                </div>
                                <div className="row ">
                                    <div className="col-6 mb-4 mx-auto  ">
                                        <button
                                            className="btn btn-dark  mx-auto col-5"
                                            type="button"
                                            onClick={requestdev}
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
