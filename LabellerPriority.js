import React, { useState, useEffect } from "react";
import Web3 from "web3"
import Web3Contract1 from "./Web3Contract1";
function Labellerpriority() {
    const [selectPrioritybug, setSelectPrioritybug] = useState("");
    const [selectPriorityfeature, setSelectPriorityfeature] = useState("");
    const [dataArray, setdataArray] = useState([]);
    const [select, setSelect] = useState("");
    const Web3 = Web3Contract1();
    const contract = Web3[1];
    const account = Web3[0];
    async function handleOnChange(event) {
        setSelect(event.target.value);
        contract.methods.get().call().then((result) => {
            console.log(result);
            setdataArray(result);
        })
    }
    const [bugsdict, setBugdict] = useState({});
    const [featuredict, setFeaturedict] = useState({});
    const setDictionarybug = (selectedOption, selectedbug) => {
        setBugdict((bugsdict)=>({ ...bugsdict, [selectedbug]: selectedOption }));
    }
    const setDictionaryfeature = (selectedOption, selectedfeature) => {
        setFeaturedict((featuredict)=>({ ...featuredict, [selectedfeature]: selectedOption }));
    }
    const setprioritybugsfeatures = () => {
        console.log(bugsdict);
        console.log(featuredict);
        console.log(Object.entries(bugsdict), Object.entries(featuredict))
        if (Object.keys(bugsdict).length != 0 || Object.keys(featuredict).length != 0) {
            contract.methods.setbugfeaturePriority(Object.entries(bugsdict), Object.entries(featuredict)).send({ from: account }).then((result) => {
                console.log(result);
                // const transactionsuccess = document.getElementById('TransactionSuccessfull');
                // const div = document.createElement('div');
                // div.classList.add("alert", "alert-primary");
                // div.role = "alert";
                // div.innerHTML = "Transaction Successfull with Transaction ID - " + `${result.transactionHash}`;
                // transactionsuccess.appendChild(div);
                // setTimeout(function () {
                //     window.location.reload();
                // }, 3000);
            });
        }
    }
    useEffect(() => {
    }, []);

    return (
        <>

           <br /><br /><br />
            
            <div className="container">
                <div className="text-center">
                    
                    <div>
                        <div className="container">
                            <div className=" d-flex align-items-end">
                                <div className="dropdown row mx-auto">
                                    <select id="mySelect" className="form-control col-6" value={select} onChange={handleOnChange}>
                                        <option value="Select Software" selected>Select Software</option>
                                        <option value="Windows11">Windows11</option>
                                        <option value="Windows10">Windows10</option>
                                        <option value="Mac12">Mac12</option>
                                        <option value="Mac11">Mac11</option>
                                    </select>

                                </div>
                            </div>
                            {/* {dataArray.map((data) => (
                                    {data.bugs.map((bugfeaturedata)=>(
                                        if(data.labelstatus==0)
                                        {
                                            return data;
                                        }
                            ))}
                                
                                ))} */}
                            
                            <div className="row">
                                <div className="col-6">
                                    <ul>

                                        {/* {
                                            dataArray.map((data, dataIndex) => {
                                               
                                                {
                                                    data.labelstatus.map((label, labelIndex) => 
                                                    {
                                                        // console.log(data.bugs[labelIndex])
                                                        if (label == 0 && data.environmentDetails == select) (
                                                            console.log(data.bugs[labelIndex])
                                                            
                                                        )
                                                    }
                                                    // (<li>{data.bugs[labelIndex]}</li>)
                                                    )
                                                }
                                            })
                                        } */}
                                    </ul>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">

                                    <ol>
                                        {dataArray.map((data, dataIndex) => {
                                            return (
                                                
                                                <>
                                                    <ul className="list-group">
                                                        {data.bugspriority.map((label, labelIndex)=>{
                                                            if (label == '0' && data.environmentDetails == select) {
                                                                return (
                                                                    <>
                                                                        <li className="align-items-center d-flex justify-content-between col-12 list-group-item form-control" key={labelIndex}>{data.bugs[labelIndex]}</li>

                                                                        <select className="col-12 list-group-item" name="selectePriority" id="selectIndex" onChange={(event) => {
                                                                            const selectedOption = event.target.value;
                                                                            const handleOnChangebugs = (selectedOption) => {
                                                                             
                                                                              setSelectPrioritybug(selectedOption);
                                                                              setDictionarybug(selectedOption, data.bugs[labelIndex]);
                                                                            };
                                                                            handleOnChangebugs(selectedOption);
                                                                        }}>
                                                                            <option value="" selected>Select Priority</option>
                                                                            <option value="1">1</option>
                                                                            <option value="2">2</option>
                                                                            <option value="3">3</option>
                                                                            <option value="4">4</option>
                                                                            <option value="5">5</option>
                                                                        </select>
                                                                        <br />
                                                                    </>
                                                                )
                                                            }

                                                        })}
                                                    </ul>

                                                </>
                                            );
                                        })}
                                    </ol>

                                </div>
                                <div className="col-6">

                                    <ol>
                                        {dataArray.map((data, dataIndex) => {
                                            return (
                                                //   <li key={dataIndex}>
                                                <>
                                                    <ul className="list-group">
                                                        {data.featurespriority.map((labelfeature, labelIndexfeature) => {
                                                            if (labelfeature == 0 && data.environmentDetails == select) {
                                                                return (
                                                                    <>
                                                                        <li className="align-items-center d-flex justify-content-between col-12 list-group-item form-control" key={labelIndexfeature}>{data.features[labelIndexfeature]}</li>
                                                                        <select className="col-12 list-group-item" name="selectePriority" id="selectIndex" onChange={(event) => {
                                                                            const selectedOption=event.target.value;
                                                                            const handleOnChangefeature=(selectedOption)=>{
                                                                                setSelectPriorityfeature(selectedOption);
                                                                                setDictionaryfeature(selectedOption, data.features[labelIndexfeature]);
                                                                            }
                                                                            handleOnChangefeature(selectedOption);
                                                                        }}>
                                                                            <option value="Select Priority" selected>Select Priority</option>
                                                                            <option value="1">1</option>
                                                                            <option value="2">2</option>
                                                                            <option value="3">3</option>
                                                                            <option value="4">4</option>
                                                                            <option value="5">5</option>
                                                                        </select>
                                                                        <br />
                                                                    </>
                                                                )
                                                            }

                                                        })}
                                                    </ul>

                                                </>
                                            );
                                        })}
                                    </ol>

                                </div>
                            </div>

                            <div>
                                <button className="btn btn-dark" onClick={setprioritybugsfeatures}>Label Bugs and
                                    Features</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );
}
export default Labellerpriority;