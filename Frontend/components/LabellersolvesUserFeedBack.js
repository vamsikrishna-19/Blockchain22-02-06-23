import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Axios from 'axios';
import Web3Contract2 from "./Web3Contract2";
import ConnectMetaMask from "./ConnectMetaMask";
function LabellerSolvesUserFeedBack(props) {

    const [selectPrioritybug, setSelectPrioritybug] = useState("");
    const [selectPriorityfeature, setSelectPriorityfeature] = useState("");
    // const Web3 = require('web3');
    const web3 = new Web3(window.ethereum);
    const [dataArray, setdataArray] = useState([]);
    const [select, setSelect] = useState("");
    const Web3Contract = Web3Contract2();
    const Account = ConnectMetaMask();
    const account = Account[0];
    const contract2 = Web3Contract[0];
    const [BugCount, setBugCount] = useState(0);
    const [FeatureCount, setFeatureCount] = useState(0);
    async function handleOnChange(event){
        setSelect(event.target.value);
        const response = await Axios.get('http://localhost:3001/api/data', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setdataArray(response.data);
        let BugCount1 = 0;
        response.data.map((data, dataIndex) => {
            {
                data.Bugs.map((label, labelIndex) => {
                    if (data.Software == event.target.value) {
                        BugCount1++;
                    }
                }
                )
            }
        });
        setBugCount(BugCount1);
        console.log(BugCount1);
        let FeatureCount1 = 0;
        response.data.map((data, dataIndex) => {
            {
                data.Features.map((label, labelIndex) => {
                    if (data.Software == event.target.value) {
                        FeatureCount1++;
                    }
                })
            }
            setFeatureCount(FeatureCount1);
        })
        console.log(FeatureCount1);
        console.log(response.data);
    }
    const token = sessionStorage.getItem("token");
    console.log(token);
    const setBugsAndFeatures = async () => {
        const usertype = sessionStorage.getItem('Role');
        const username = sessionStorage.getItem('Username');
        console.log(tobeSentBug);
        console.log(tobeSentFeature);
        if(contract2){
        contract2.methods.feedbacks(tobeSentBug, tobeSentFeature, select).send({ from: account }).then(async (result) => {
            console.log(result);
            const receipt = await web3.eth.getTransactionReceipt(result.transactionHash);
            console.log(receipt);
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
                    typeOfTransaction: "Sent organized feedback to ethereum blockchain"
                },
                );
                console.log(res.data);
            }
            catch (error) {
                console.log(error);
            }
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
            props.showAlert(`Transaction was Successful with Transaction Hash ${result.transactionHash}.Gas Used : ${result.gasUsed}`, "success");
            window.location.reload();
        }).catch(async (error) => {
            try {
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
                        typeOfTransaction: "Transaction Failed due to wrong account in use",
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
    }
    const handleDeleteBug = async (tobeSentBug) => {
        try {
            const token = sessionStorage.getItem("token");
            console.log(token);
            const response = await Axios.delete('http://localhost:3001/deleteBug',
                {
                    data: {
                        tobeDeleted: tobeSentBug,
                    }

                    ,
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            )
            console.log(response.data);
            window.location.reload();
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
                    ,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log(response.data);
            window.location.reload();
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

            <br />
            <div className="container">
                <div className="text-center">
                    <div>
                        <div className="container">
                            <div className=" d-flex align-items-end">
                                <div className="dropdown row mx-auto">
                                    <select id="mySelect" className="form-control col-6" style={{fontWeight:"bold"}} value={select} onChange={handleOnChange}>
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
                                    <br />
                                    {
                                        
                                        BugCount == 0 && select!="Select Priority" && select!="" && (
                                            <>
                                                <b className="my-4">
                                                    No data Available
                                                </b>
                                            </>
                                        )
                                    }
                                    <br />
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

                                                                            <div className="col-9" >
                                                                                <input type="text" className="align-items-center  form-control" aria-describedby="delete" key={labelIndex} value={data.Bugs[labelIndex]}  />
                                                                            </div>
                                                                            <div className="col-1">

                                                                                <button className="input-group-text  d-flex  align-items-center" data-bs-toggle="modal" data-bs-target="#exampleModalBug" onClick={() => {
                                                                                    // handleDeleteBug(data.Bugs[labelIndex]);
                                                                                    setSelectedBugToChange(data.Bugs[labelIndex]);
                                                                                    // setNewBug("");
                                                                                }} id="bug">
                                                                                    <span>
                                                                                        <i className="zmdi zmdi-edit hc-2x " style={{color:"blue"}}></i>
                                                                                    </span>
                                                                                </button>
                                                                            </div>
                                                                            <div className="col-1">
                                                                                <button className="input-group-text c d-flex  align-items-center" onClick={() => {
                                                                                    handleDeleteBug(data.Bugs[labelIndex])
                                                                                }} id="delete">
                                                                                    <span>
                                                                                        <i className="zmdi zmdi-delete hc-2x" style={{color:"red"}}></i>
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
                                   <br />
                                    {
                                        FeatureCount == 0 && select!="Select Priority" && select!="" && (
                                            <>
                                                <b className="my-4">
                                                    No data Available
                                                </b>
                                            </>
                                        )
                                    }
                                    <br />
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
                                                                                        <i className="zmdi zmdi-edit hc-2x" style={{color:"blue"}}></i>
                                                                                    </span>
                                                                                </button>
                                                                            </div>
                                                                            <div className="col-1">

                                                                                <button className="input-group-text  d-flex justify-content-center align-items-center" onClick={() => {
                                                                                    handleDeleteFeature(data.Features[labelIndex])
                                                                                }} id="delete">
                                                                                    <span>
                                                                                        <i className="zmdi zmdi-delete hc-2x" style={{color:"red"}}></i>
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
                                <button className="btn btn-dark" onClick={setBugsAndFeatures}> submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
export default LabellerSolvesUserFeedBack