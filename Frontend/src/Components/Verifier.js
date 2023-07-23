import React, { useState, useEffect } from 'react'
import Web3Contract2 from './Web3Contract2'
import Web3 from 'web3';
import { Web3Storage } from 'web3.storage';
import "./Verifier.css"
import Axios from 'axios';
import ConnectMetaMask from './ConnectMetaMask';
const Verifier = (props) => {
    const web3 = new Web3(window.ethereum);
    const Web3Contract = Web3Contract2();
    const contract2 = Web3Contract[0];
    const Account = ConnectMetaMask();
    const address = Account[0];
    const [patchName, setPatchName] = useState("");
    const [dataArray, setdataArray] = useState([]);
    const [description, setDescription] = useState("");
    const [ObjectPatchImportance, setObjectPatchImportance] = useState({});
    const [countTobeVerified,setcountTobeVerified]=useState(0);
    const [waitingForDownload,setWaitingForDownload]=useState(false);
    const getdata = async () => {
        try {
            contract2.methods.getdetails().call().then((result) => {
                setdataArray(result);
                console.log(result);
                let c=0;
                result.map((data)=>{
                    if(data.verificationstatus == "IN PROGRESS"){
                        c+=1;
                    }
                })
                setcountTobeVerified(c);

            });
            contract2.methods.getImportance().call().then((result) => {
                console.log(result);
                result.forEach(item => {
                    setObjectPatchImportance(prevState => ({
                        ...prevState,
                        [item.patchname]: item.crutiality
                    }));
                });

            })
            // console.log(ObjectPatchImportance.pa);
            console.log(ObjectPatchImportance);
        }
        catch (error) {
            console.log(error)
        }
    }
    const connectcontract1 = async (patchname) => {
        const usertype = sessionStorage.getItem('Role');
        const username = sessionStorage.getItem('Username');
        contract2.methods.VerifyPatch(patchname).send({ from: address }).then(async (result) => {
            console.log(result);
            
            const receipt=await web3.eth.getTransactionReceipt(result.transactionHash);
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
                    typeOfTransaction: "verified " + patchname,
                },
                );
                console.log(res.data);
            }
            catch (error) {
                console.log(error);
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





    const connectcontract2 = async (patchname) => {
        const usertype = sessionStorage.getItem('Role');
        const username = sessionStorage.getItem('Username');
        console.log(patchname);
        const Description = description;
        console.log(Description);
        contract2.methods.RejectPatch(patchname, Description).send({ from: address }).then(async(result) => {
            console.log(result);
            const receipt=await web3.eth.getTransactionReceipt(result.transactionHash);
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
                    typeOfTransaction: "Rejected " + patchName + " because of " + Description,
                },
                );
                console.log(res.data);
            }
            catch (error) {
                console.log(error);
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
    const setTime = (timestamp) => {
        const milliseconds = Number(timestamp) * 1000;
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
        setWaitingForDownload(true);
        console.log(fileData);
        try {
            const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDhDMEM5NjY3QThhNzQzMkNEQWU1Mzk1NDBBOWFiMUVFRmQwRjg0QzEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODI2ODA4MzI1MzAsIm5hbWUiOiJwYXRjaG1hbmFnZW1lbnRibG9ja2NoYWluIn0.dzfBAy3YnAQ2xayUCm8o3jpht8xWVHdVDbovUno_9qM";
            const client = new Web3Storage({ token: apiKey });
            const data = await client.get(fileData);
            const files = await data.files();
            if (files && files.length > 0){
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
        setWaitingForDownload(false);
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

                        {
                            countTobeVerified==0 && (
                                <>
                                    <div>
                                        <b>
                                            No data Available
                                        </b>
                                    </div>
                                </>
                            )
                        }
                {dataArray.map((data, dataIndex) => {

                    if (data.verificationstatus == "IN PROGRESS") {
                        return (
                            <>
                                <div className='card' style={{ borderColor: "darkviolet" }}>
                                    <div className='card-header  text-white d-flex justify-content-start bg-secondary' style={{ backgroundColor: "    " }}>
                                        <b>
                                            <h4>

                                                Request No-{Number(data.requestnumber)}
                                            </h4>
                                        </b>
                                    </div>

                                    <div className='card-body' style={{paddingBottom:"20px"}}>
                                        <div className='row'>
                                            <div className=' d-flex justify-content-start align-items-center col-6'>
                                                <div className='mx-2 '>
                                                    <b style={{ color: '' }}>
                                                        Patch Id:
                                                    </b>
                                                </div>
                                                <div className=''>
                                                    {Number(data.patchno)}
                                                </div>
                                            </div>
                                            <div className=' d-flex justify-content-start align-items-center col-6'>
                                                <div className='mx-2 '>
                                                    <b style={{ color: '' }}>
                                                        Registered Time:
                                                    </b>
                                                </div>
                                                <div className=''>

                                                    {setTime(data.time)}
                                                </div>
                                            </div>


                                        </div>
                                        <div className='row'>
                                        <div className=' d-flex justify-content-start align-items-center  col-6'>
                                            <div className='mx-2'>

                                                <b style={{ color: '' }}>

                                                    Patch Name:
                                                </b>
                                            </div>
                                            <div className=''>

                                                {data.patchname}
                                            </div>
                                        </div>
                                        <div className=' d-flex justify-content-start align-items-center my-3 col-6'>
                                            <div className='mx-2'>

                                                <b style={{ color: '' }}>

                                                    Patch Significance:
                                                </b>
                                            </div>
                                            <b className=''>

                                                {
                                                    ObjectPatchImportance[data.patchname] == "High" && (
                                                        <>
                                                            <td style={{ color: "#FF00FF" }}>
                                                                {
                                                                    ObjectPatchImportance[data.patchname]
                                                                }
                                                            </td>
                                                        </>

                                                    )
                                                }
                                                {
                                                    ObjectPatchImportance[data.patchname] == "Critical" && (
                                                        <>
                                                            <td style={{ color: "red" }}>
                                                                {
                                                                    ObjectPatchImportance[data.patchname]
                                                                }
                                                            </td>
                                                        </>
                                                    )
                                                }
                                                {
                                                    ObjectPatchImportance[data.patchname] == "Medium" && (
                                                        <>
                                                            <td style={{ color: "yellow" }}>
                                                                {
                                                                    ObjectPatchImportance[data.patchname]
                                                                }
                                                            </td>
                                                        </>

                                                    )
                                                }
                                                {
                                                    ObjectPatchImportance[data.patchname] == "Low" && (
                                                        <>
                                                            <td style={{ color: "blue" }}>
                                                                {
                                                                    ObjectPatchImportance[data.patchname]
                                                                }
                                                            </td>
                                                        </>

                                                    )
                                                }
                                            </b>
                                        </div>
                                    </div>
                                        <div className=' d-flex justify-content-start my-3'>
                                            <div className='mx-2'>

                                                <b style={{ color: '' }}>
                                                    Patch Features:
                                                </b>
                                            </div>
                                            <div>

                                                {data.patchfeatures}
                                            </div>
                                        </div>

                                        <div className=' d-flex justify-content-start my-3'>
                                            <div className='mx-2'>

                                                <b style={{ color: '' }}>
                                                    Patch Platform:
                                                </b>
                                            </div>
                                            <div>

                                                {data.patchplatform}
                                            </div>
                                        </div>

                                        <div className=' d-flex justify-content-start align-items-center'>
                                            <div className='mx-2'>

                                                <b style={{ color: '' }}>
                                                    Download Patch :
                                                </b>
                                            </div>
                                            <button className='btn btn-dark' onClick={() => {
                                                downloadpatch(data.fileData);
                                                setPatchName(data.patchName);
                                            }
                                            }>Download</button>
                                        </div>
                                        {
                                            waitingForDownload==true && (
                                                <>
                                                <br />
                                                <div className='mx-5'>
                                                    <b className='mx-4' style={{color:"orange"}}>
                                                        Processing Download Request...
                                                    </b>
                                                </div>
                                                </>
                                            )
                                        }
                                        <div className='d-flex justify-content-end my-3'>

                                            <button className='btn btn-success mx-1' onClick={() => {
                                                connectcontract1(data.patchname);
                                            }}>
                                                Verify
                                            </button>
                                            <button className='btn text-white mx-1'
                                                data-bs-toggle="modal" data-bs-target="#exampleModalDescription" data-bs-whatever="@mdo" style={{ backgroundColor: "red" }}
                                                onClick={() => {
                                                    // connectcontract2(data.patchname);
                                                    setModalPatchName(data.patchName);
                                                }}>

                                                Reject
                                            </button>
                                        </div>

                                    </div>
                                </div>
                                <br />
                            </>

                        );
                    }
                })}

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
                                        <label htmlhtmlFor="bug-name" className="col-form-label">
                                            <h5>
                                                Patch Name
                                            </h5>
                                        </label>
                                        <input type="text" className="form-control" value={modalPatchName} onChange={(e) => setPatchName(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="message-text" className="col-form-label">
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
                                    onClick={() => connectcontract2(patchName)}
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

        </>
    )
}

export default Verifier
