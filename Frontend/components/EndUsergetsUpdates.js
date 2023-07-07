import React, { useState, useEffect } from 'react'
import Web3Contract2 from './Web3Contract2';
import { Web3Storage } from 'web3.storage';
import Axios from 'axios';
const EndUsergetsUpdates = () => {


   
    const [dataArray, setdataArray] = useState([]);
    const [dataArray2,setDataArray2]=useState([]);
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
    const downloadpatch = async (fileData,patchname) => {
        console.log(fileData);
        console.log(patchname);
        console.log(sessionStorage.getItem("Username"));
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
                try{
                   const res=await Axios.post('http://localhost:3001/downloadPatch',{
                        Username:sessionStorage.getItem("Username"),
                        Patchname:patchname
                    })
                    console.log(res.data);
                }
                catch(error){
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

    useEffect(() => {
        const getdata = async() => {
            console.log(contract2);
            try{
                contract2.methods.getdetails().call().then((result) => {
                    setdataArray(result);
                    console.log(result);
                }).catch((err)=>{
                    console.log(err);
                });
                const username=sessionStorage.getItem("Username");
                console.log(username);
                try{
                    const res=await Axios.get("http://localhost:3001/getDownloadHistory",{
                        params: {
                            Username: username,
                          },
                    });
        
                    console.log("vamsi")
                    console.log(res);
                    setDataArray2(res.data);
                }
                catch(error){
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
                    <table id="table1" className="table table-striped table-bordered table-responsive">
                        <thead className="thead-dark">
                            <tr>
                                {/* <th scope="col">S.No</th> */}
                                <th scope="col">Patch Name</th>
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

                                                {/* <td>
                                                    
                                                    {dataIndex + 1}
                                                </td> */}
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
                                                    {setTime(data.deployedTimeStamp)}
                                                </td>
                                                <td >
                                                    <button className='btn btn-success' onClick={() => {
                                                            downloadpatch(data.fileData,data.patchname);
                                                           
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
        </div>
    )
}
export default EndUsergetsUpdates;
