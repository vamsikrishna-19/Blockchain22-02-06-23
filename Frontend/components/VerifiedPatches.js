import React, { useState, useEffect,useRef } from 'react'
import Web3Contract2 from './Web3Contract2'
import web3 from 'web3';
import $ from 'jquery';
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
const VerifiedPatches = () => {
    const tableRef = useRef(null);
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
    useEffect(()=>{
        if(dataArray.length>0){
        $(function () {
            $('#table1').DataTable();
          });
        }
    },[dataArray]);
    return (
        <>
            <br />
            <div className="container">
                <div className=" text-center">
                    <div className="table-responsive">
                        <table id="table1" className="table table-striped table-bordered table-responsive"  ref={tableRef}>
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
                                    if (data.verificationstatus == "Verified" || data.verificationstatus=="Rejected") {
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
                                                    <td>
                                                        {data.verificationstatus}
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

export default VerifiedPatches
