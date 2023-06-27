import React, { useState, useEffect, useRef } from 'react'
import Web3Contract2 from './Web3Contract2';
import $, { data } from 'jquery';
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
const AdminTrackingPatches = () => {
    const tableRef = useRef(null);
    const Web3 = Web3Contract2();
    const contract2 = Web3[1];
    const address = Web3[0];
    // const web3=Web3[2];
    const [dataArray, setdataArray] = useState([])
    const getdata = () => {
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
    const setTime = (timestamp) => {
        const milliseconds = timestamp * 1000;
        const dateObject = new Date(milliseconds);
        const formattedTime = dateObject.toLocaleString();
        return formattedTime;
    }
    // const downloadpatch = (fileData) => {
    //     // const fileBlob = new Blob([new Uint8Array(web3.utils.hexToBytes(fileData))], { type: 'application/octet-stream' });
    //     // const fileUrl = URL.createObjectURL(fileBlob);
    //     // const downloadLink = document.createElement('a');
    //     // downloadLink.href = fileUrl;
    //     // downloadLink.download = 'file.txt';
    //     // downloadLink.click();
    // }
    const [TableCreated,setTableCreated]=useState(false);
    useEffect(() => {
        getdata();
    }, [contract2]);
    useEffect(()=>{
        if(dataArray.length>0){
        $(function () {
            $('#table1').DataTable();
          });
        }
    },[dataArray]);
        return (
            <div>
                <br /><br /><br />
                <div className="container">
                    <div className="text-center">
                        <table id="table1" className="table table-striped table-bordered table-responsive" ref={tableRef}>
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">S.No</th>
                                    <th scope="col">Patch Name</th>
                                    <th scope="col">Request No</th>
                                    <th scope="col">Patch Platform</th>
                                    <th scope="col">Patch Features</th>
                                    <th scope="col">Registered Time</th>
                                    <th scope="col">Verification Status</th>
                                    <th scope="col">Deployment Status</th>
                                </tr>
                            </thead>
                            <tbody id="tbody">
                                {dataArray.map((data, dataIndex) => {
                                    return (
                                        <>
                                            <tr>
                                                <td>{dataIndex + 1}</td>
                                                <td>{data.patchname}</td>
                                                <td> Request No: {data.requestnumber}</td>
                                                {/* <td>
                                                   
                                                    <button className='btn' onClick={downloadpatch(data.fileData)}>Download</button>
                                                </td> */}
                                                <td>{data.patchplatform}</td>
                                                <td>{data.patchfeatures}</td>
                                                <td>{setTime(data.time)}</td>
                                                <td>{data.verificationstatus}</td>
                                                <td>{data.deploymentstatus}</td>

                                            </tr>
                                        </>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>


            </div>
        )
    

}

export default AdminTrackingPatches;