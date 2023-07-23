import React, { useState, useEffect } from "react";
import Web3 from 'web3';
// import Web3Contract1 from "./Web3Contract1";
import Web3Contract2 from "./Web3Contract2";
import Axios from "axios";
import ConnectMetaMask from "./ConnectMetaMask";
function AdminsendsRequest(props) {
    const Web3ContractAndAddress2 = Web3Contract2();
    const [select, setSelect] = useState("");
    const [dataArray, setDataArray] = useState([]);
    const web3 = new Web3(window.ethereum);
    const contract2 = Web3ContractAndAddress2[0];
    const Account = ConnectMetaMask();
    const account = Account[0];
    console.log(account);
    const [requestNo, setRequestNo] = useState(0);
    const [countBugs, setCountBugs] = useState(0);
    const [countFeatures, setCountFeatures] = useState(0);
    const handleOnChangeselect = async (event) => {
        try {
            setSelect(event.target.value);
            contract2.methods.get().call().then((result) => {
                setDataArray(result);

                let countBugs1 = 0;
                result.map((data, dataIndex) => {
                    {
                        data.labelstatus.map((label, labelIndex) => {
                            if (label == 0 && data.bugspriority[labelIndex] != 0 && data.environmentDetails == event.target.value) {
                                countBugs1++;

                            }

                        })
                    }
                })
                setCountBugs(countBugs1);
                let countFeatures1 = 0;
                {
                    result.map((data, dataIndex) => {
                        {
                            data.labelstatusfeatures.map((label, labelIndex) => {
                                if (label == 0 && data.featurespriority[labelIndex] != 0 && data.environmentDetails == event.target.value) {
                                    countFeatures1++;
                                }
                            })
                        }
                    })
                }
                setCountFeatures(countFeatures1);

            })
            contract2.methods.getdetailsRequest().call().then((result) => {
                console.log(result);
                setRequestNo(result.length + 1);
            });

        }
        catch (error) {
            console.log(error);
        }
    }
    const [date, setDate] = useState("");
    const handleDate = (e) => {
        setDate(e.target.value)
    }
    const requestdev = () => {
        const usertype = sessionStorage.getItem('Role');
        const username = sessionStorage.getItem('Username');
        
        contract2.methods.setRequest(bugArray, featureArray, date, requestNo, select,bugArray, featureArray)
            .send({ from: account })
            .then(async (result) => {
                const receipt = await web3.eth.getTransactionReceipt(result.transactionHash);
                try {
                    const res = await Axios.post('http://localhost:3001/TransactionHistory', {
                        usertype: usertype,
                        username: username,
                        status: Number(receipt.status),
                        transactionHash: result.transactionHash,
                        blockHash: receipt.blockHash,
                        contractAddress: receipt.contractAddress,
                        blockNumber: Number(receipt.blockNumber),
                        gasUsed: Number(receipt.gasUsed),
                        from: receipt.from,
                        to: receipt.to,
                        typeOfTransaction: "Sent Request to Developer with Request No:" + requestNo,
                    });
                    console.log(res.data);
                } catch (error) {
                    console.log(error);
                }


                props.showAlert(`Transaction successful with Transaction Hash ${result.transactionHash}.Gas Used : ${result.gasUsed}`, "success");

            })
            .catch(async (error) => {
                console.log(error);
                try {

                    console.log(error);
                    const jsonString = error.message;
                    console.log(error.message);
                    const hashIndex = jsonString.indexOf('"hash":"');
                    const start = hashIndex + 8;
                    const end = jsonString.indexOf('"', start);
                    const hash = jsonString.substring(start, end);
                    console.log("Hash value:", hash);
                    const receipt = await web3.eth.getTransactionReceipt(hash);
                    console.log(receipt);
                    try {
                        const res = await Axios.post('http://localhost:3001/TransactionHistory', {
                            usertype: usertype,
                            username: username,
                            status: Number(receipt.status),
                            transactionHash: hash,
                            blockHash: receipt.blockHash,
                            contractAddress: receipt.contractAddress,
                            blockNumber: Number(receipt.blockNumber),
                            gasUsed: Number(receipt.gasUsed),
                            from: receipt.from,
                            to: receipt.to,
                            typeOfTransaction: "Transaction failed due to wrong account in use",
                        },
                        );
                        console.log(res.data);
                        props.showAlert(`Transaction failed with Transaction Hash ${hash}.Gas Used : ${receipt.gasUsed}`, "warning");

                    }
                    catch (error) {
                        console.log(error);
                    }
                }
                catch (error) {
                    console.log(error);
                }

            });
         
    }
    const [bugArray, setBugArray] = useState([]);
    const handleOnChangeBugs = (bug) => (event) => {
        console.log(bugArray);
        const isChecked = event.target.checked;
        if (isChecked) {
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


    return (
        <>
            <div className="container">
                <div className="">
                    <div className=" d-flex align-items-end my-5">
                        <div className="dropdown row mx-auto">
                            <label htmlFor="mySelect" className="col">
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
                                <span >

                                    Bugs
                                </span>
                                <table className="table">
                                    <thead className="col-12">
                                        <tr>
                                            <th scope="col-1" className="col-1 justify-content-center"> <h6> Select </h6> </th>
                                            <th scope="col-9" className="col-9 justify-content-center " > <h6> Bugs</h6> </th>
                                            <th scope="col-2" className="col-2 justify-content-center"> <h6>Priority </h6> </th>
                                        </tr>
                                    </thead>
                                    {
                                        countBugs == 0 && select != "Select Software" && select != "" && (
                                            <>
                                                <td colSpan={2} style={{  fontSize: "24px" }}>
                                                    No data Available
                                                </td>
                                            </>
                                        )
                                    }
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
                                                                            <li className="align-items-center d-flex justify-content-between col-12 list-group-item form-control" key={labelIndex}> <h6>  Priority:{Number(data.bugspriority[labelIndex])}  </h6> </li>
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
                                <span >

                                    Features:
                                </span>

                                <table className="table">
                                    <thead className="col-12">
                                        <tr>
                                            <th scope="col-1" className="col-1 justify-content-center"> <h6> Select </h6> </th>
                                            <th scope="col-9" className="col-9 justify-content-center " > <h6> Features </h6> </th>
                                            <th scope="col-2" className="col-2 justify-content-center"> <h6>Priority </h6> </th>
                                        </tr>
                                    </thead>
                                    {
                                        countFeatures == 0 && select != "Select Software" && select != "" && (
                                            <>
                                                <td colSpan={2} style={{  fontSize: '24px' }}>
                                                    No data Available
                                                </td>
                                            </>
                                        )
                                    }
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
                                                                            <li className="align-items-center d-flex justify-content-between col-12 list-group-item form-control" key={labelIndex}> <h6>  Priority:{Number(data.featurespriority[labelIndex])}  </h6> </li>

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
                                        <label htmlFor="Date">
                                            <h5>Target Date</h5>
                                        </label>
                                        <input type="date" onChange={handleDate} className="mx-4" id="Date" min={new Date().toISOString().split('T')[0]} />
                                    </div>
                                </div>
                                <div className="row my-5">
                                    <div className="col-6 mx-auto  ">
                                        <label htmlFor="RequestNo">
                                            <h5>Request No</h5>
                                        </label>
                                        <input
                                            type="number"
                                            placeholder={requestNo}
                                            value={requestNo}
                                            readOnly={true}
                                            className="mx-4"
                                            id="RequestNo"
                                            // readOnly
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 d-flex justify-content-center p-4">
                                        <button
                                            className="btn btn-dark"
                                            type="button"
                                            onClick={requestdev}
                                        >
                                            Send Request
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
