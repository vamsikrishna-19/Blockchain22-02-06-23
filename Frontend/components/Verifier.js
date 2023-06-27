import React, { useState, useEffect } from 'react'
import Web3Contract2 from './Web3Contract2'
import web3 from 'web3';

const Verifier = () => {
    const Web3 = Web3Contract2();
    const contract2 = Web3[1];
    const address = Web3[0];
    // const web3=Web3[2];
    const [dataArray, setdataArray] = useState([])
    const getdata = async () => {
        try {
            await contract2.methods.getdetails().call().then((result) => {
                setdataArray(result);
                console.log(result);
            });
        }
        catch (error) {
            console.log(error)
        }
    }
    const connectcontract1 = async (patchname) => {
        await contract2.methods.findandreply(patchname).send({ from: address }).then((result) => {
            // const transactionsuccess = document.getElementById('TransactionSuccessfull');
            // const div = document.createElement('div')
            // div.classList.add("alert", "alert-primary");
            // div.role = "alert";
            // div.innerHTML = "Transaction Successfull with Transaction ID" + `${result.transactionHash}`
            // transactionsuccess.appendChild(div)
            // setTimeout(function () {

            //     window.location.reload();
            // }, 3000);
        });

    }
    const connectcontract2 = async (patchname) => {

        await contract2.methods.findandreplynotverified(patchname).send({ from: address }).then((result) => {
            // const transactionsuccess = document.getElementById('TransactionSuccessfull');
            // const div = document.createElement('div')
            // div.classList.add("alert", "alert-primary");
            // div.role = "alert";

            // div.innerHTML = "Transaction Successfull with Transaction ID - " + `${result.transactionHash}`
            // transactionsuccess.appendChild(div)
            // setTimeout(function () {

            //     window.location.reload();
            // }, 3000);
        });
    }
    const setTime = (timestamp) => {
        const milliseconds = timestamp * 1000;
        const dateObject = new Date(milliseconds);
        const formattedTime = dateObject.toLocaleString();

        return formattedTime;
    }
    const downloadpatch = (fileData) => {
        const fileBlob = new Blob([new Uint8Array(web3.utils.hexToBytes(fileData))], { type: 'application/octet-stream' });
        const fileUrl = URL.createObjectURL(fileBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = fileUrl;
        downloadLink.download = 'file.txt';
        downloadLink.click();


    }
    useEffect(() => {
        getdata();
    }, [contract2])
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
                                                        <button className='btn' onClick={() => {
                                                            downloadpatch(data.fileData);
                                                        }
                                                        }>Download</button>
                                                    </td>
                                                    <td>
                                                        {data.patchplatform}
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
                                                            <button className='btn btn-danger' onClick={() => {
                                                                connectcontract2(data.patchname);
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default Verifier
