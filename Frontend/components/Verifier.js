import React, { useState, useEffect } from 'react'
import Web3Contract2 from './Web3Contract2'
import web3 from 'web3';
import { Web3Storage } from 'web3.storage';
// import e from 'express';
import Axios from 'axios';
import ConnectMetaMask from './ConnectMetaMask';
const Verifier = () => {
    const Web3 = require('web3');
    const web3 = new Web3('HTTP://127.0.0.1:7545');
    const Web3Contract = Web3Contract2();
    const contract2 = Web3Contract[0];
    const Account=ConnectMetaMask();
    const address = Account[0];
    const [patchName,setPatchName]=useState("");
    const [dataArray, setdataArray] = useState([]);
    const [description,setDescription]=useState("");
    const getdata = async () => {
        try {
             contract2.methods.getdetails().call().then((result) => {
                setdataArray(result);
                console.log(result);
            });
        }
        catch (error) {
            console.log(error)
        }
    }
    const connectcontract1 = async (patchname) => {
        const usertype = sessionStorage.getItem('Role');
		const username = sessionStorage.getItem('Username');
        await contract2.methods.findandreply(patchname).send({ from: address }).then((result) => {
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
                        typeOfTransaction: "verified " + patchName,
                    },
                    );
                    console.log(res.data);
                }
                catch (error) {
                    console.log(error);
                }
            });
            window.location.reload();
        });
    }
    const connectcontract2 = async (patchname) => {
        const usertype = sessionStorage.getItem('Role');
		const username = sessionStorage.getItem('Username');
        console.log(patchname);
        const Description=description;
        console.log(Description);
        await contract2.methods.findandreplynotverified(patchname,Description).send({ from: address }).then((result) => {
            console.log(result)
            console.log(result);
            web3.eth.getTransactionReceipt(result.transactionHash, async (error, receipt) => {
                if(error){
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
                        typeOfTransaction: "Rejected " + patchName+" because of "+Description,
                    },
                    );
                    console.log(res.data);
                }
                catch (error) {
                    console.log(error);
                }
            });
            window.location.reload();
        });
    }
    const setTime = (timestamp) => {
        const milliseconds = timestamp * 1000;
        const dateObject = new Date(milliseconds);
        const formattedTime = dateObject.toLocaleString();
        return formattedTime;
    }
    const downloadFile = (fileDownloadURl, fileName) => {
        const link = document.createElement('a');
        link.href = fileDownloadURl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    const downloadpatch = async (fileData) => {
        console.log(fileData);
        try {
            const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDhDMEM5NjY3QThhNzQzMkNEQWU1Mzk1NDBBOWFiMUVFRmQwRjg0QzEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODI2ODA4MzI1MzAsIm5hbWUiOiJwYXRjaG1hbmFnZW1lbnRibG9ja2NoYWluIn0.dzfBAy3YnAQ2xayUCm8o3jpht8xWVHdVDbovUno_9qM";
            const client = new Web3Storage({ token: apiKey });
            const data = await client.get(fileData);
            const files = await data.files();
            if (files && files.length > 0) {
                const file = files[0];
                const fileName = file.name;
                const fileDownloadURl = URL.createObjectURL(file);
                downloadFile(fileDownloadURl, fileName);
            }
            else {
                console.log("No files in response");
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    const [modalPatchName, setModalPatchName] = useState("");
    useEffect(() => {
        setModalPatchName(modalPatchName);
    }, [modalPatchName]);
    useEffect(() => {
        getdata();
    }, [contract2]);
    return (
        <>
            <br />
            <div className="container">
                <div className=" text-center">
                    <div className="table-responsive">
                        <table id="table1" className="table table-striped table-bordered table-responsive">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">S.No</th>
                                    <th scope="col">Patch No</th>
                                    <th scope="col">Download Patch</th>
                                    <th scope="col">Patch Platform</th>
                                    <th scope="col">Patch Name</th>
                                    <th scope="col">Patch Features</th>
                                    <th scope="col">Registered Time</th>
                                    <th scope="col">Accept/Reject</th>
                                </tr>
                            </thead>
                            <tbody id="tbody">
                                {dataArray.map((data, dataIndex) => {
                                    if (data.verificationstatus == "IN PROGRESS") {
                                       
                                        return (
                                            <>
                                                <tr>
                                                    <td>
                                                        {dataIndex + 1}
                                                    </td>
                                                    <td>
                                                        Patch- {data.patchno}
                                                    </td>
                                                    <td>
                                                        <button className='btn btn-dark' onClick={() => {
                                                            downloadpatch(data.fileData);
                                                            setPatchName(data.patchName);
                                                        }
                                                        }>Download</button>
                                                    </td>
                                                    <td>
                                                        {data.patchplatform}
                                                    </td>
                                                    <td >
                                                        {data.patchname}
                                                    </td>
                                                    <td>
                                                        {data.patchfeatures}
                                                    </td>
                                                    <td>

                                                        {setTime(data.time)}
                                                    </td>
                                                    <td >
                                                        <div className='d-flex'>
                                                            <button className='btn btn-success' onClick={() => {
                                                                connectcontract1(data.patchname);
                                                            }}>
                                                                Verify
                                                            </button>
                                                            <button className='btn btn-danger'
                                                             data-bs-toggle="modal" data-bs-target="#exampleModalDescription" data-bs-whatever="@mdo" 
                                                            onClick={() => {
                                                                // connectcontract2(data.patchname);
                                                               
                                                                setModalPatchName(data.patchName);
                                                                
                                                            }}>

                                                                Reject
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    }
                                })}
                            </tbody>
                        </table>
                         <div className="modal fade" id="exampleModalDescription" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Description</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <form>
                                                <div className="mb-3">
                                                    <label for="bug-name" className="col-form-label">
                                                        <h5>
                                                            Patch Name
                                                        </h5>
                                                    </label>
                                                    <input type="text" className="form-control" value={modalPatchName} onChange={(e)=>setPatchName(e.target.value)} />
                                                </div>
                                                <div className="mb-3">
                                                    <label for="message-text" className="col-form-label">
                                                        <h5>
                                                            Describe the reason for Rejection
                                                        </h5>
                                                    </label>
                                                    <textarea className="form-control" id="message-text" onChange={(e) => {
                                                        // setNewBug(e.target.value);
                                                        setDescription(e.target.value);
                                                    }}>
                                                    </textarea>
                                                </div>
                                            </form>
                                        
                                        
                                    </div>
                                    <div className="modal-footer">
                                        {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                                        <button type="button" className="btn "
                                            onClick={()=>connectcontract2(patchName)}
                                        >
                                            <span>
                                                {/* <i className="zmdi zmdi-send hc-2x"></i> */}
                                                <i className="zmdi zmdi-mail-send hc-2x" style={{ fontSize: '2em' }} ></i>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Verifier
