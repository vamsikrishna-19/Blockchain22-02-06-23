import React, { useState, useEffect } from 'react'
import Web3Contract2 from './Web3Contract2';

const AdminDepolyPatches = () => {

    // const downloadpatch = (fileData) => {
    //     // const fileBlob = new Blob([new Uint8Array(web3.utils.hexToBytes(fileData))], { type: 'application/octet-stream' });
    //     // const fileUrl = URL.createObjectURL(fileBlob);
    //     // const downloadLink = document.createElement('a');
    //     // downloadLink.href = fileUrl;
        // downloadLink.download = 'file.txt';
        // downloadLink.click();        


    // }
    const [dataArray, setdataArray] = useState([])
    const setTime = (timestamp) => {
        const milliseconds = timestamp * 1000;
        const dateObject = new Date(milliseconds);
        const formattedTime = dateObject.toLocaleString();

        return formattedTime;
    }
    const Web3 = Web3Contract2();
    // console.log(Web3);
    // const [contract2,setcontract2]=useState('');
    // const [address,setAddress]=useState('');
    // setcontract2(Web3[1]);
    // setAddress(Web3[0]);
    const contract2 = Web3[1];
    const address = Web3[0];
    // console.log(Web3[1]);
    useEffect(() => {
        const getdata = () => {
            // console.log(Web3[1]);
            try{
            contract2.methods.getdetails().call().then((result) => {
                    setdataArray(result);
                    console.log(result);
                });
            }
            catch(error){
                console.log(error);
            }
        }
        getdata();
    },[contract2]);
    return (
        <div>
            <div className="container">
                <div className="text-center">
                    <br/>
                    <br/>
                    <table id="table1" className="table table-striped table-borderless">
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
                            {dataArray.map((data, dataIndex) => {
                                console.log(dataArray)
                                return (
                                    <>
                                        <tr>

                                            <td>
                                                { }
                                            </td>
                                            <td>
                                                {data.patchname}
                                            </td>
                                            {/* <td>
                                                   
                                                    <button className='btn' onClick={downloadpatch(data.fileData)}>Download</button>
                                                </td> */}
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

                                                <button className='btn btn-success'>Deploy</button>


                                            </td>
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

export default AdminDepolyPatches
