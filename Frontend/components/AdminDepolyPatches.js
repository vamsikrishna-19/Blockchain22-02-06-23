import React, { useState, useEffect, useRef } from 'react'
import Web3Contract2 from './Web3Contract2';
import ConnectMetaMask from './ConnectMetaMask';
import Axios from 'axios';
import $ from 'jquery';
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
const AdminDepolyPatches = () => {
    const tableRef = useRef();
    const [dataArray, setdataArray] = useState([])
    const setTime = (timestamp) => {
        const milliseconds = timestamp * 1000;
        const dateObject = new Date(milliseconds);
        const formattedTime = dateObject.toLocaleString();
        return formattedTime;
    }
    const Web3 = require('web3');
    const web3 = new Web3('HTTP://127.0.0.1:7545');
    const Web3Contract = Web3Contract2();
    const contract2 = Web3Contract[0];
    const Account = ConnectMetaMask();
    const account = Account[0];
    const deployed = async (patchname) => {
        const usertype = sessionStorage.getItem('Role');
        const username = sessionStorage.getItem('Username');
        console.log(patchname);
        contract2.methods.Deployed(patchname).send({ from: account }).then((result) => {
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
                        typeOfTransaction: "Deployed " + patchname,
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
    const getdata = () => {
        try {
            contract2.methods.getdetails().call().then((result) => {
                setdataArray(result);
                console.log(result);
            });
            
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getdata();
    }, [contract2]);
    useEffect(() => {
        if (dataArray.length > 0) {
            $(function () {
                $('#table1').DataTable();
            });
        }
    }, [dataArray]);
    return (
        <div>
            <div className="container">
                <div className="text-center">
                    <br />
                    <br />
                    <table id="table1" className="table table-striped table-bordered table-responsive" ref={tableRef}>
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">S.No</th>
                                <th scope="col">Patch Name</th>
                                <th scope="col">Patch Platform</th>
                                <th scope="col">Patch Features</th>
                                <th scope="col">Registered Time</th>
                                <th scope="col">Deploy</th>
                            </tr>
                        </thead>
                        <tbody id="tbody">
                            {
                                dataArray.map((data, dataIndex) => {
                                    console.log(dataArray)
                                    if (data.deploymentstatus != "Deployed" && data.verificationstatus == "Verified") {
                                        return (
                                            <>
                                                <tr>

                                                    <td>
                                                        {dataIndex + 1}
                                                    </td>
                                                    <td>
                                                        {data.patchname}
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

                                                        <button className='btn btn-success' onClick={() => {
                                                            deployed(data.patchname)
                                                        }}>Deploy</button>


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
    )
}

export default AdminDepolyPatches
