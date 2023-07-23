import React, { useState, useEffect } from 'react'
import Web3Contract2 from './Web3Contract2';
import { Web3Storage } from 'web3.storage';
import Axios from 'axios';
const EndUsergetsUpdates = () => {
    const [dataArray, setdataArray] = useState([]);
    const [dataArray2, setDataArray2] = useState([]);
    const setTime = (timestamp) => {
        const milliseconds = timestamp * 1000;
        const dateObject = new Date(milliseconds);
        const formattedTime = dateObject.toLocaleString();
        return formattedTime;
    }
    const Web3 = Web3Contract2();
    const contract2 = Web3[0];
    const downloadFile = (fileDownloadURl, fileName) => {
        const link = document.createElement('a');
        link.href = fileDownloadURl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    const downloadpatch = async (fileData, patchname) => {
        console.log(fileData);
        console.log(patchname);
        console.log(sessionStorage.getItem("Username"));
        try {
            const client = new Web3Storage({ token: process.env.REACT_APP_API_KEY });
            const data = await client.get(fileData);
            const files = await data.files();
            if (files && files.length > 0) {
                const file = files[0];
                const fileName = file.name;
                const fileDownloadURl = URL.createObjectURL(file);
                downloadFile(fileDownloadURl, fileName);
                try {
                    const res = await Axios.post('http://localhost:3001/downloadPatch', {
                        Username: sessionStorage.getItem("Username"),
                        Patchname: patchname
                    })
                    console.log(res.data);
                }
                catch (error) {
                    console.log(error);
                }
            }
            else {
                console.log("No files in response");
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    let i = 1;
    const [ObjectPatchImportance, setObjectPatchImportance] = useState({});
    useEffect(() => {
        const getdata = async () => {
            console.log(contract2);
            try {
                contract2.methods.getdetails().call().then((result) => {
                    setdataArray(result);
                    console.log(result);
                }).catch((err) => {
                    console.log(err);
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
                const username = sessionStorage.getItem("Username");
                console.log(username);
                try {
                    const res = await Axios.get("http://localhost:3001/getDownloadHistory", {
                        params: {
                            Username: username,
                        },
                    });
                    console.log(res);
                    setDataArray2(res.data);
                }
                catch (error) {
                    console.log(error);
                }
            }
            catch (error) {
                console.log(error)
            }
        }
        getdata();
    }, [contract2]);
    return (
        <div>
            <div className="container">
                <div className="text-center">
                    <br />
                    <br />
                    <div className='table-responsive'>
                    <table id="table1" className="table table-striped table-bordered table-responsive">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">S.No</th>
                                <th scope="col">Patch Name</th>
                                <th scope="col">Patch Significance</th>
                                <th scope="col">Patch Platform</th>
                                <th scope="col">Patch Features</th>
                                <th scope="col">Registered Time</th>
                                <th scope="col">Download</th>
                            </tr>
                        </thead>
                        <tbody id="tbody">

                            {dataArray.map((data, dataIndex) => {
                                console.log(dataArray);
                                if (data.deploymentstatus == "Deployed" && !dataArray2.includes(data.patchname))
                                    // let sno=1;
                                    return (
                                        <>
                                            <tr>

                                                <td>

                                                    {i++}
                                                </td>
                                                <td>
                                                    {data.patchname}
                                                </td>
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
                                                    {setTime(Number(data.deployedTimeStamp))}
                                                </td>
                                                <td >
                                                    <button className='btn btn-success' onClick={() => {
                                                        downloadpatch(data.fileData, data.patchname);

                                                    }
                                                    }>Download</button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                            })}
                        </tbody>
                    </table>
                    </div>
                </div>
            {
                i == 1 && (
                    <div>
                        <b>
                            No Patches Available
                        </b>
                    </div>
                )
            }
            </div>
        </div>
    )
}
export default EndUsergetsUpdates;
