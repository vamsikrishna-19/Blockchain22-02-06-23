import React, { useState, useEffect } from "react";
import Web3 from "web3";

import Axios from 'axios';
import Web3Contract1 from "./Web3Contract1";
import ConnectMetaMask from "./ConnectMetaMask";
function LabellerSolvesUserFeedBack() {
    
    const [selectPrioritybug, setSelectPrioritybug] = useState("");
    const [selectPriorityfeature, setSelectPriorityfeature] = useState("");
    const Web3 = require('web3');


    const web3 = new Web3('HTTP://127.0.0.1:7545');



    const [dataArray, setdataArray] = useState([]);
    const [select, setSelect] = useState("");
    const Web3Contract = Web3Contract1();
    const Account=ConnectMetaMask();
    const account=Account[0];
    const contract = Web3Contract[0];
    async function handleOnChange(event) {
        setSelect(event.target.value);
        // contract.methods.get().call().then((result) => {
        // 	console.log(result);
        // 	setdataArray(result);
        // })http://localhost:3001/api/data
        const response = await Axios.get('http://localhost:3001/api/data', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setdataArray(response.data);
        console.log(response.data);
    }


   
    const token = sessionStorage.getItem("token");
    console.log(token);
    const setBugsAndFeatures = async () => {
        const usertype = sessionStorage.getItem('Role');
        const username = sessionStorage.getItem('Username');
        console.log(tobeSentBug);
        console.log(tobeSentFeature);
        contract.methods.feedbacks(tobeSentBug, tobeSentFeature, select).send({ from: account }).then(async (result) => {
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
                        typeOfTransaction: "Sent organized feedback to ethereum blockchain"
                    },
                    );
                    console.log(res.data);
                }
                catch (error) {
                    console.log(error);
                }
            });
            try {
                const response = await Axios.delete('http://localhost:3001/deleteBugsFeatures', {
                    data: {
                        tobeDeletedBugs: tobeSentBug,
                        tobeDeletedFeatures: tobeSentFeature
                    }
                },
                );
                console.log(response.data);
            }
            catch (error) {
                console.error(error);
            }

        });

    }
    const handleDeleteBug = async (tobeSentBug) => {
        // delete Bug from mongo database
        try {
            const token = sessionStorage.getItem("token");
            console.log(token);
            const response = await Axios.delete('http://localhost:3001/deleteBug',
                {
                    data: {
                        tobeDeleted: tobeSentBug,
                    }
                },
                {

                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log(response.data);
        }
        catch (error) {
            console.error(error);
        }
    }
    const handleDeleteFeature = async (tobeSentFeature) => {
        //deleteFeature from mongo database
        try {
            const token = sessionStorage.getItem("token");
            console.log(token);
            const response = await Axios.delete('http://localhost:3001/deleteFeature',
                {
                    data: {
                        tobeDeleted: tobeSentFeature,
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log(response.data);
        }
        catch (error) {
            console.error(error);
        }
        setNewFeature("");
    }
    const [tobeSentBug, settobeSentBugs] = useState([]);
    const handleCheckedInputsBugs = (e, bug) => {
        if (e.target.checked) {

            settobeSentBugs((prev) => [...prev, bug]);
        }
        else {
            settobeSentBugs((prev) => prev.filter((bugIterator) => bugIterator != bug));
        }
    }
    const [tobeSentFeature, settobeSentFeatures] = useState([]);
    const handleCheckedInputsFeature = (e, feature) => {
        if (e.target.checked) {
            settobeSentFeatures((prev) => [...prev, feature]);
        }
        else {
            settobeSentFeatures((prev) => prev.filter((FeatureIterator) => FeatureIterator != feature));
        }
    }



    useEffect(() => {

    }, []);
    const [selectedBugToChange, setSelectedBugToChange] = useState("");
    const [selectedFeatureToChange, setSelectedFeatureToChange] = useState("");
    const [newBug, setNewBug] = useState("");
    const [newFeature, setNewFeature] = useState("");

    //Updating the old Bug with the modified one
    const ChangeBugInMongo = async (prev, change) => {
        console.log(prev, change);
        try {
            setNewBug("");
            const token = sessionStorage.getItem("token");
            console.log(token);
            const response = await Axios.post('http://localhost:3001/UpdateBug',
                {
                    data: {
                        OldBug: prev,
                        NewBug: change,

                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }


                }
            );
            console.log(response.data);
            window.location.reload();

        }
        catch (err) {
            console.log("Error updating in Updating bug")
        }
    }


    //Updating the Old Feature with Modified Feature
    const ChangeFeatureInMongo = async (prev, change) => {
        console.log(prev, change);
        try {
            setNewFeature("");
            const token = sessionStorage.getItem("token");
            console.log(token);
            //http://localhost:3001/deleteFeature
            const response = await Axios.post('http://localhost:3001/UpdateFeature', {
                data: {
                    OldFeature: prev,
                    NewFeature: change,

                }
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log(response.data);
            window.location.reload();
        }

        catch (err) {
            console.log("error updating the feature")
        }
    }




    return (
        <>

            <br /><br /><br />

            <div className="container">
                <div className="text-center">

                    <div>
                        <div className="container">
                            <div className=" d-flex align-items-end">
                                <div className="dropdown row mx-auto">
                                    <select id="mySelect" className="form-control col-6" value={select} onChange={handleOnChange}>
                                        <option value="Select Software" selected>Select Software</option>
                                        <option value="Windows11">Windows11</option>
                                        <option value="Windows10">Windows10</option>
                                        <option value="Mac12">Mac12</option>
                                        <option value="Mac11">Mac11</option>
                                    </select>
                                </div>
                            </div>
                            <br /><br />
                            <div className="row">
                                <div className="col-md-6">
                                    <h2 className="">Bugs</h2>
                                    <ol className="bordered-list">
                                        {dataArray.map((data, dataIndex) => {
                                            return (
                                                <>
                                                    <ul className="list-group">
                                                        {data.Bugs.map((label, labelIndex) => {
                                                            if (data.Software == select) {

                                                                return (
                                                                    <>
                                                                        <div className="row form-group">
                                                                            <div className="col-1">
                                                                                <div className="form-check">
                                                                                    <input className="form-check-input form-control-md" type="checkbox"

                                                                                        onChange={(e) => {
                                                                                            handleCheckedInputsBugs(e, data.Bugs[labelIndex]);
                                                                                        }}
                                                                                        style={{ width: '30px', height: '30px' }} />
                                                                                </div>
                                                                            </div>

                                                                            <div className="col-9">
                                                                                <input type="text" className="align-items-center  form-control" aria-describedby="delete" key={labelIndex} value={data.Bugs[labelIndex]} />
                                                                            </div>
                                                                            <div className="col-1">

                                                                                <button className="input-group-text  d-flex  align-items-center" data-bs-toggle="modal" data-bs-target="#exampleModalBug" data-bs-whatever="@mdo" onClick={() => {
                                                                                    // handleDeleteBug(data.Bugs[labelIndex]);
                                                                                    setSelectedBugToChange(data.Bugs[labelIndex]);
                                                                                    // setNewBug("");
                                                                                }} id="delete">
                                                                                    <span>
                                                                                        <i className="zmdi zmdi-edit hc-2x"></i>
                                                                                    </span>
                                                                                </button>
                                                                            </div>
                                                                            <div className="col-1">

                                                                                <button className="input-group-text c d-flex  align-items-center" onClick={() => {
                                                                                    handleDeleteBug(data.Bugs[labelIndex])
                                                                                }} id="delete">
                                                                                    <span>
                                                                                        <i className="zmdi zmdi-delete hc-2x"></i>
                                                                                    </span>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                        <br />
                                                                        {/* <button type="button" className="btn btn-primary" >Open modal for @mdo</button> */}


                                                                    </>
                                                                )
                                                            }
                                                        })}
                                                    </ul>
                                                    <div className="modal fade" id="exampleModalBug" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                        <div className="modal-dialog">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Bug</h1>
                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                </div>
                                                                <div className="modal-body">
                                                                    <form>
                                                                        <div className="mb-3">
                                                                            <label for="bug-name" className="col-form-label">
                                                                                <h5>
                                                                                    Original Bug Description
                                                                                </h5>
                                                                            </label>
                                                                            <input type="text" className="form-control" value={selectedBugToChange} />
                                                                        </div>
                                                                        <div className="mb-3">
                                                                            <label for="message-text" className="col-form-label">
                                                                                <h5>
                                                                                    Enter Modified Bug Description
                                                                                </h5>
                                                                            </label>
                                                                            <textarea className="form-control" id="message-text" onChange={(e) => {
                                                                                setNewBug(e.target.value);
                                                                            }}>
                                                                            </textarea>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                                <div className="modal-footer">
                                                                    {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                                                                    <button type="button" className="btn " onClick={() =>
                                                                        ChangeBugInMongo(selectedBugToChange, newBug)

                                                                    }>
                                                                        <span>
                                                                            {/* <i className="zmdi zmdi-send hc-2x"></i> */}
                                                                            <i className="zmdi zmdi-mail-send hc-2x" style={{ fontSize: '2em' }} ></i>
                                                                        </span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </>
                                            );
                                        })}
                                    </ol>
                                </div>
                                <div className="col-md-6">
                                    <h2 className="">Features</h2>
                                    <ol className="bordered-list" >
                                        {dataArray.map((data, dataIndex) => {
                                            return (
                                                <>
                                                    <ul className="list-group">
                                                        {data.Features.map((label, labelIndex) => {
                                                            if (data.Software == select) {

                                                                return (
                                                                    <>
                                                                        <div className="row form-group">
                                                                            <div className="col-1">
                                                                                <div className="form-check">
                                                                                    <input className="form-check-input form-control-md" type="checkbox" value=""
                                                                                        onChange={(e) => {
                                                                                            handleCheckedInputsFeature(e, data.Features[labelIndex]);
                                                                                        }}
                                                                                        style={{ width: '30px', height: '30px' }} />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-9">
                                                                                <input type="text" className="align-items-center form-control" key={labelIndex} value={data.Features[labelIndex]} />
                                                                            </div>
                                                                            <div className="col-1">

                                                                                <button className="input-group-text d-flex justify-content-center align-items-center" data-bs-toggle="modal" data-bs-target="#exampleModalFeature" data-bs-whatever="@mdo" onClick={() => {
                                                                                    // handleDeleteFeature(data.Features[labelIndex])
                                                                                    // handleEdit(labelIndex);
                                                                                    setSelectedFeatureToChange(data.Features[labelIndex]);
                                                                                    setNewFeature("");
                                                                                }} id="Edit">
                                                                                    <span>
                                                                                        <i className="zmdi zmdi-edit hc-2x"></i>
                                                                                    </span>
                                                                                </button>
                                                                            </div>
                                                                            <div className="col-1">

                                                                                <button className="input-group-text  d-flex justify-content-center align-items-center" onClick={() => {
                                                                                    handleDeleteFeature(data.Features[labelIndex])
                                                                                }} id="delete">
                                                                                    <span>
                                                                                        <i className="zmdi zmdi-delete hc-2x"></i>
                                                                                    </span>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                        <br />
                                                                    </>
                                                                )
                                                            }

                                                        })}
                                                    </ul>
                                                    <div className="modal fade" id="exampleModalFeature" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                        <div className="modal-dialog">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Feature</h1>
                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                </div>
                                                                <div className="modal-body">
                                                                    <form>
                                                                        <div className="mb-3">
                                                                            <label for="original-feature" className="col-form-label">
                                                                                <h5>
                                                                                    Original Feature Description
                                                                                </h5>
                                                                            </label>
                                                                            <input type="text" className="form-control" id="original-feature" value={selectedFeatureToChange} />
                                                                        </div>
                                                                        <div className="mb-3">
                                                                            <label for="Change-Description" className="col-form-label">
                                                                                <h5>
                                                                                    Enter Modified Feature Description
                                                                                </h5>
                                                                            </label>
                                                                            <textarea className="form-control" id="Change-Description" onChange={(e) => {
                                                                                setNewFeature(e.target.value);
                                                                            }}></textarea>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                                <div className="modal-footer">
                                                                    {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                                                                    <button type="button" className="btn " onClick={() => {
                                                                        ChangeFeatureInMongo(selectedFeatureToChange, newFeature)
                                                                    }}>
                                                                        <span>
                                                                            {/* <i className="zmdi zmdi-send hc-2x"></i> */}
                                                                            <i className="zmdi zmdi-mail-send hc-2x" style={{ fontSize: '2em' }} ></i>
                                                                        </span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            );
                                        })}
                                    </ol>
                                </div>
                            </div>

                            <div>
                                <button className="btn btn-dark" onClick={setBugsAndFeatures}> Select user feedback</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
export default LabellerSolvesUserFeedBack