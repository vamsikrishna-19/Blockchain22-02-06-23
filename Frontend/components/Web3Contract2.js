import React, { useState, useEffect } from 'react'
import Web3 from "web3"

const Web3Contract2 = () => {
    const { ethereum } = window;
    console.log(ethereum);   
    // const ethereum={};
    const [contract2, setContract] = useState(null);
    useEffect(() => {
            try {
                const connectContract = async () => {

                    // const ABI2 = [
                    //     {
                    //         "inputs": [
                    //             {
                    //                 "internalType": "string",
                    //                 "name": "_patchname",
                    //                 "type": "string"
                    //             }
                    //         ],
                    //         "name": "DeployPatch",
                    //         "outputs": [],
                    //         "stateMutability": "nonpayable",
                    //         "type": "function"
                    //     },
                    //     {
                    //         "inputs": [
                    //             {
                    //                 "internalType": "string[]",
                    //                 "name": "_bugs",
                    //                 "type": "string[]"
                    //             },
                    //             {
                    //                 "internalType": "string[]",
                    //                 "name": "_features",
                    //                 "type": "string[]"
                    //             },
                    //             {
                    //                 "internalType": "string",
                    //                 "name": "_environmentDetails",
                    //                 "type": "string"
                    //             }
                    //         ],
                    //         "name": "feedbacks",
                    //         "outputs": [],
                    //         "stateMutability": "nonpayable",
                    //         "type": "function"
                    //     },
                    //     {
                    //         "inputs": [
                    //             {
                    //                 "internalType": "string",
                    //                 "name": "_patchname",
                    //                 "type": "string"
                    //             },
                    //             {
                    //                 "internalType": "string",
                    //                 "name": "_rejectedDescription",
                    //                 "type": "string"
                    //             }
                    //         ],
                    //         "name": "RejectPatch",
                    //         "outputs": [],
                    //         "stateMutability": "nonpayable",
                    //         "type": "function"
                    //     },
                    //     {
                    //         "inputs": [
                    //             {
                    //                 "components": [
                    //                     {
                    //                         "internalType": "string",
                    //                         "name": "bug",
                    //                         "type": "string"
                    //                     },
                    //                     {
                    //                         "internalType": "uint256",
                    //                         "name": "priority",
                    //                         "type": "uint256"
                    //                     }
                    //                 ],
                    //                 "internalType": "struct PatchMangement.bugsprio[]",
                    //                 "name": "keyvaluepair",
                    //                 "type": "tuple[]"
                    //             },
                    //             {
                    //                 "components": [
                    //                     {
                    //                         "internalType": "string",
                    //                         "name": "feature",
                    //                         "type": "string"
                    //                     },
                    //                     {
                    //                         "internalType": "uint256",
                    //                         "name": "priorityfeature",
                    //                         "type": "uint256"
                    //                     }
                    //                 ],
                    //                 "internalType": "struct PatchMangement.featuresprio[]",
                    //                 "name": "keyvaluepairfeature",
                    //                 "type": "tuple[]"
                    //             }
                    //         ],
                    //         "name": "setbugfeaturePriority",
                    //         "outputs": [],
                    //         "stateMutability": "nonpayable",
                    //         "type": "function"
                    //     },
                    //     {
                    //         "inputs": [
                    //             {
                    //                 "internalType": "string",
                    //                 "name": "_filedata",
                    //                 "type": "string"
                    //             },
                    //             {
                    //                 "internalType": "string",
                    //                 "name": "_patchname",
                    //                 "type": "string"
                    //             },
                    //             {
                    //                 "internalType": "string",
                    //                 "name": "_patchplatform",
                    //                 "type": "string"
                    //             },
                    //             {
                    //                 "internalType": "string",
                    //                 "name": "_patchfeatures",
                    //                 "type": "string"
                    //             },
                    //             {
                    //                 "internalType": "uint256",
                    //                 "name": "_patchno",
                    //                 "type": "uint256"
                    //             },
                    //             {
                    //                 "internalType": "uint256",
                    //                 "name": "_requestnumber",
                    //                 "type": "uint256"
                    //             },
                    //             {
                    //                 "internalType": "string",
                    //                 "name": "_crutiality",
                    //                 "type": "string"
                    //             }
                    //         ],
                    //         "name": "setPatch",
                    //         "outputs": [],
                    //         "stateMutability": "nonpayable",
                    //         "type": "function"
                    //     },
                    //     {
                    //         "inputs": [
                    //             {
                    //                 "internalType": "string",
                    //                 "name": "_filedata",
                    //                 "type": "string"
                    //             },
                    //             {
                    //                 "internalType": "string",
                    //                 "name": "_patchname",
                    //                 "type": "string"
                    //             },
                    //             {
                    //                 "internalType": "string",
                    //                 "name": "_patchplatform",
                    //                 "type": "string"
                    //             },
                    //             {
                    //                 "internalType": "string",
                    //                 "name": "_patchfeatures",
                    //                 "type": "string"
                    //             },
                    //             {
                    //                 "internalType": "uint256",
                    //                 "name": "_patchno",
                    //                 "type": "uint256"
                    //             },
                    //             {
                    //                 "internalType": "uint256",
                    //                 "name": "_requestnumber",
                    //                 "type": "uint256"
                    //             },
                    //             {
                    //                 "internalType": "uint256",
                    //                 "name": "_version",
                    //                 "type": "uint256"
                    //             },
                    //             {
                    //                 "internalType": "string",
                    //                 "name": "_crutiality",
                    //                 "type": "string"
                    //             }
                    //         ],
                    //         "name": "setPatchIfRejected",
                    //         "outputs": [],
                    //         "stateMutability": "nonpayable",
                    //         "type": "function"
                    //     },
                    //     {
                    //         "inputs": [
                    //             {
                    //                 "internalType": "string[]",
                    //                 "name": "_bugs",
                    //                 "type": "string[]"
                    //             },
                    //             {
                    //                 "internalType": "string[]",
                    //                 "name": "_features",
                    //                 "type": "string[]"
                    //             },
                    //             {
                    //                 "internalType": "string",
                    //                 "name": "_date",
                    //                 "type": "string"
                    //             },
                    //             {
                    //                 "internalType": "uint256",
                    //                 "name": "_requestno",
                    //                 "type": "uint256"
                    //             },
                    //             {
                    //                 "internalType": "string",
                    //                 "name": "_software",
                    //                 "type": "string"
                    //             },
                    //             {
                    //                 "internalType": "string[]",
                    //                 "name": "bugsforlabel",
                    //                 "type": "string[]"
                    //             },
                    //             {
                    //                 "internalType": "string[]",
                    //                 "name": "featuresforlabel",
                    //                 "type": "string[]"
                    //             }
                    //         ],
                    //         "name": "setRequest",
                    //         "outputs": [],
                    //         "stateMutability": "nonpayable",
                    //         "type": "function"
                    //     },
                    //     {
                    //         "inputs": [],
                    //         "stateMutability": "nonpayable",
                    //         "type": "constructor"
                    //     },
                    //     {
                    //         "inputs": [
                    //             {
                    //                 "internalType": "string",
                    //                 "name": "_patchname",
                    //                 "type": "string"
                    //             }
                    //         ],
                    //         "name": "VerifyPatch",
                    //         "outputs": [],
                    //         "stateMutability": "nonpayable",
                    //         "type": "function"
                    //     },
                    //     {
                    //         "inputs": [],
                    //         "name": "admin",
                    //         "outputs": [
                    //             {
                    //                 "internalType": "address",
                    //                 "name": "",
                    //                 "type": "address"
                    //             }
                    //         ],
                    //         "stateMutability": "view",
                    //         "type": "function"
                    //     },
                    //     {
                    //         "inputs": [],
                    //         "name": "check",
                    //         "outputs": [
                    //             {
                    //                 "internalType": "bool",
                    //                 "name": "",
                    //                 "type": "bool"
                    //             }
                    //         ],
                    //         "stateMutability": "view",
                    //         "type": "function"
                    //     },
                    //     {
                    //         "inputs": [],
                    //         "name": "developer",
                    //         "outputs": [
                    //             {
                    //                 "internalType": "address",
                    //                 "name": "",
                    //                 "type": "address"
                    //             }
                    //         ],
                    //         "stateMutability": "view",
                    //         "type": "function"
                    //     },
                    //     {
                    //         "inputs": [],
                    //         "name": "get",
                    //         "outputs": [
                    //             {
                    //                 "components": [
                    //                     {
                    //                         "internalType": "string",
                    //                         "name": "environmentDetails",
                    //                         "type": "string"
                    //                     },
                    //                     {
                    //                         "internalType": "string[]",
                    //                         "name": "bugs",
                    //                         "type": "string[]"
                    //                     },
                    //                     {
                    //                         "internalType": "string[]",
                    //                         "name": "RemainOrDeleteBugs",
                    //                         "type": "string[]"
                    //                     },
                    //                     {
                    //                         "internalType": "string[]",
                    //                         "name": "features",
                    //                         "type": "string[]"
                    //                     },
                    //                     {
                    //                         "internalType": "string[]",
                    //                         "name": "RemainOrDeleteFeatures",
                    //                         "type": "string[]"
                    //                     },
                    //                     {
                    //                         "internalType": "uint256[]",
                    //                         "name": "bugspriority",
                    //                         "type": "uint256[]"
                    //                     },
                    //                     {
                    //                         "internalType": "uint256[]",
                    //                         "name": "featurespriority",
                    //                         "type": "uint256[]"
                    //                     },
                    //                     {
                    //                         "internalType": "uint256[]",
                    //                         "name": "labelstatus",
                    //                         "type": "uint256[]"
                    //                     },
                    //                     {
                    //                         "internalType": "uint256[]",
                    //                         "name": "labelstatusfeatures",
                    //                         "type": "uint256[]"
                    //                     }
                    //                 ],
                    //                 "internalType": "struct PatchMangement.report[]",
                    //                 "name": "",
                    //                 "type": "tuple[]"
                    //             }
                    //         ],
                    //         "stateMutability": "view",
                    //         "type": "function"
                    //     },
                    //     {
                    //         "inputs": [],
                    //         "name": "getdetails",
                    //         "outputs": [
                    //             {
                    //                 "components": [
                    //                     {
                    //                         "internalType": "string",
                    //                         "name": "patchname",
                    //                         "type": "string"
                    //                     },
                    //                     {
                    //                         "internalType": "string",
                    //                         "name": "fileData",
                    //                         "type": "string"
                    //                     },
                    //                     {
                    //                         "internalType": "string",
                    //                         "name": "patchplatform",
                    //                         "type": "string"
                    //                     },
                    //                     {
                    //                         "internalType": "string",
                    //                         "name": "patchfeatures",
                    //                         "type": "string"
                    //                     },
                    //                     {
                    //                         "internalType": "uint256",
                    //                         "name": "time",
                    //                         "type": "uint256"
                    //                     },
                    //                     {
                    //                         "internalType": "string",
                    //                         "name": "verificationstatus",
                    //                         "type": "string"
                    //                     },
                    //                     {
                    //                         "internalType": "string",
                    //                         "name": "deploymentstatus",
                    //                         "type": "string"
                    //                     },
                    //                     {
                    //                         "internalType": "uint256",
                    //                         "name": "patchno",
                    //                         "type": "uint256"
                    //                     },
                    //                     {
                    //                         "internalType": "uint256",
                    //                         "name": "requestnumber",
                    //                         "type": "uint256"
                    //                     },
                    //                     {
                    //                         "internalType": "uint256",
                    //                         "name": "deployedTimeStamp",
                    //                         "type": "uint256"
                    //                     },
                    //                     {
                    //                         "internalType": "string",
                    //                         "name": "rejectdescription",
                    //                         "type": "string"
                    //                     },
                    //                     {
                    //                         "internalType": "uint256",
                    //                         "name": "version",
                    //                         "type": "uint256"
                    //                     }
                    //                 ],
                    //                 "internalType": "struct PatchMangement.Patch[]",
                    //                 "name": "",
                    //                 "type": "tuple[]"
                    //             }
                    //         ],
                    //         "stateMutability": "view",
                    //         "type": "function"
                    //     },
                    //     {
                    //         "inputs": [],
                    //         "name": "getdetailsRequest",
                    //         "outputs": [
                    //             {
                    //                 "components": [
                    //                     {
                    //                         "internalType": "string[]",
                    //                         "name": "bugs",
                    //                         "type": "string[]"
                    //                     },
                    //                     {
                    //                         "internalType": "string[]",
                    //                         "name": "features",
                    //                         "type": "string[]"
                    //                     },
                    //                     {
                    //                         "internalType": "string",
                    //                         "name": "date",
                    //                         "type": "string"
                    //                     },
                    //                     {
                    //                         "internalType": "uint256",
                    //                         "name": "requestno",
                    //                         "type": "uint256"
                    //                     },
                    //                     {
                    //                         "internalType": "string",
                    //                         "name": "software",
                    //                         "type": "string"
                    //                     }
                    //                 ],
                    //                 "internalType": "struct PatchMangement.request[]",
                    //                 "name": "",
                    //                 "type": "tuple[]"
                    //             }
                    //         ],
                    //         "stateMutability": "view",
                    //         "type": "function"
                    //     },
                    //     {
                    //         "inputs": [],
                    //         "name": "getImportance",
                    //         "outputs": [
                    //             {
                    //                 "components": [
                    //                     {
                    //                         "internalType": "string",
                    //                         "name": "patchname",
                    //                         "type": "string"
                    //                     },
                    //                     {
                    //                         "internalType": "string",
                    //                         "name": "crutiality",
                    //                         "type": "string"
                    //                     }
                    //                 ],
                    //                 "internalType": "struct PatchMangement.PatchInfo[]",
                    //                 "name": "",
                    //                 "type": "tuple[]"
                    //             }
                    //         ],
                    //         "stateMutability": "view",
                    //         "type": "function"
                    //     },
                    //     {
                    //         "inputs": [],
                    //         "name": "getRejectedPatches",
                    //         "outputs": [
                    //             {
                    //                 "internalType": "string[]",
                    //                 "name": "",
                    //                 "type": "string[]"
                    //             }
                    //         ],
                    //         "stateMutability": "view",
                    //         "type": "function"
                    //     },
                    //     {
                    //         "inputs": [],
                    //         "name": "labeller",
                    //         "outputs": [
                    //             {
                    //                 "internalType": "address",
                    //                 "name": "",
                    //                 "type": "address"
                    //             }
                    //         ],
                    //         "stateMutability": "view",
                    //         "type": "function"
                    //     },
                    //     {
                    //         "inputs": [
                    //             {
                    //                 "internalType": "string",
                    //                 "name": "",
                    //                 "type": "string"
                    //             }
                    //         ],
                    //         "name": "map",
                    //         "outputs": [
                    //             {
                    //                 "internalType": "string",
                    //                 "name": "",
                    //                 "type": "string"
                    //             }
                    //         ],
                    //         "stateMutability": "view",
                    //         "type": "function"
                    //     },
                    //     {
                    //         "inputs": [
                    //             {
                    //                 "internalType": "string",
                    //                 "name": "",
                    //                 "type": "string"
                    //             }
                    //         ],
                    //         "name": "map2",
                    //         "outputs": [
                    //             {
                    //                 "internalType": "string",
                    //                 "name": "",
                    //                 "type": "string"
                    //             }
                    //         ],
                    //         "stateMutability": "view",
                    //         "type": "function"
                    //     },
                    //     {
                    //         "inputs": [
                    //             {
                    //                 "internalType": "uint256",
                    //                 "name": "",
                    //                 "type": "uint256"
                    //             }
                    //         ],
                    //         "name": "PatchArray",
                    //         "outputs": [
                    //             {
                    //                 "internalType": "string",
                    //                 "name": "patchname",
                    //                 "type": "string"
                    //             },
                    //             {
                    //                 "internalType": "string",
                    //                 "name": "fileData",
                    //                 "type": "string"
                    //             },
                    //             {
                    //                 "internalType": "string",
                    //                 "name": "patchplatform",
                    //                 "type": "string"
                    //             },
                    //             {
                    //                 "internalType": "string",
                    //                 "name": "patchfeatures",
                    //                 "type": "string"
                    //             },
                    //             {
                    //                 "internalType": "uint256",
                    //                 "name": "time",
                    //                 "type": "uint256"
                    //             },
                    //             {
                    //                 "internalType": "string",
                    //                 "name": "verificationstatus",
                    //                 "type": "string"
                    //             },
                    //             {
                    //                 "internalType": "string",
                    //                 "name": "deploymentstatus",
                    //                 "type": "string"
                    //             },
                    //             {
                    //                 "internalType": "uint256",
                    //                 "name": "patchno",
                    //                 "type": "uint256"
                    //             },
                    //             {
                    //                 "internalType": "uint256",
                    //                 "name": "requestnumber",
                    //                 "type": "uint256"
                    //             },
                    //             {
                    //                 "internalType": "uint256",
                    //                 "name": "deployedTimeStamp",
                    //                 "type": "uint256"
                    //             },
                    //             {
                    //                 "internalType": "string",
                    //                 "name": "rejectdescription",
                    //                 "type": "string"
                    //             },
                    //             {
                    //                 "internalType": "uint256",
                    //                 "name": "version",
                    //                 "type": "uint256"
                    //             }
                    //         ],
                    //         "stateMutability": "view",
                    //         "type": "function"
                    //     },
                    //     {
                    //         "inputs": [
                    //             {
                    //                 "internalType": "uint256",
                    //                 "name": "",
                    //                 "type": "uint256"
                    //             }
                    //         ],
                    //         "name": "patches",
                    //         "outputs": [
                    //             {
                    //                 "internalType": "string",
                    //                 "name": "",
                    //                 "type": "string"
                    //             }
                    //         ],
                    //         "stateMutability": "view",
                    //         "type": "function"
                    //     },
                    //     {
                    //         "inputs": [
                    //             {
                    //                 "internalType": "uint256",
                    //                 "name": "",
                    //                 "type": "uint256"
                    //             }
                    //         ],
                    //         "name": "PatchInfoArray",
                    //         "outputs": [
                    //             {
                    //                 "internalType": "string",
                    //                 "name": "patchname",
                    //                 "type": "string"
                    //             },
                    //             {
                    //                 "internalType": "string",
                    //                 "name": "crutiality",
                    //                 "type": "string"
                    //             }
                    //         ],
                    //         "stateMutability": "view",
                    //         "type": "function"
                    //     },
                    //     {
                    //         "inputs": [
                    //             {
                    //                 "internalType": "uint256",
                    //                 "name": "",
                    //                 "type": "uint256"
                    //             }
                    //         ],
                    //         "name": "RejectedPatches",
                    //         "outputs": [
                    //             {
                    //                 "internalType": "string",
                    //                 "name": "",
                    //                 "type": "string"
                    //             }
                    //         ],
                    //         "stateMutability": "view",
                    //         "type": "function"
                    //     },
                    //     {
                    //         "inputs": [
                    //             {
                    //                 "internalType": "uint256",
                    //                 "name": "",
                    //                 "type": "uint256"
                    //             }
                    //         ],
                    //         "name": "reports",
                    //         "outputs": [
                    //             {
                    //                 "internalType": "string",
                    //                 "name": "environmentDetails",
                    //                 "type": "string"
                    //             }
                    //         ],
                    //         "stateMutability": "view",
                    //         "type": "function"
                    //     },
                    //     {
                    //         "inputs": [
                    //             {
                    //                 "internalType": "uint256",
                    //                 "name": "",
                    //                 "type": "uint256"
                    //             }
                    //         ],
                    //         "name": "requestArray",
                    //         "outputs": [
                    //             {
                    //                 "internalType": "string",
                    //                 "name": "date",
                    //                 "type": "string"
                    //             },
                    //             {
                    //                 "internalType": "uint256",
                    //                 "name": "requestno",
                    //                 "type": "uint256"
                    //             },
                    //             {
                    //                 "internalType": "string",
                    //                 "name": "software",
                    //                 "type": "string"
                    //             }
                    //         ],
                    //         "stateMutability": "view",
                    //         "type": "function"
                    //     },
                    //     {
                    //         "inputs": [
                    //             {
                    //                 "internalType": "uint256",
                    //                 "name": "",
                    //                 "type": "uint256"
                    //             }
                    //         ],
                    //         "name": "result",
                    //         "outputs": [
                    //             {
                    //                 "internalType": "string",
                    //                 "name": "",
                    //                 "type": "string"
                    //             }
                    //         ],
                    //         "stateMutability": "view",
                    //         "type": "function"
                    //     },
                    //     {
                    //         "inputs": [],
                    //         "name": "verifier",
                    //         "outputs": [
                    //             {
                    //                 "internalType": "address",
                    //                 "name": "",
                    //                 "type": "address"
                    //             }
                    //         ],
                    //         "stateMutability": "view",
                    //         "type": "function"
                    //     }
                    // ]
                    // const Address2 = "0x50F91c47C926af9806e29695349c5bc3C8e25E2a";
                   






const ABI2=[
                        {
                            "inputs": [],
                            "stateMutability": "nonpayable",
                            "type": "constructor"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "string",
                                    "name": "_patchname",
                                    "type": "string"
                                }
                            ],
                            "name": "DeployPatch",
                            "outputs": [],
                            "stateMutability": "nonpayable",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "uint256",
                                    "name": "",
                                    "type": "uint256"
                                }
                            ],
                            "name": "PatchArray",
                            "outputs": [
                                {
                                    "internalType": "string",
                                    "name": "patchname",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "fileData",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "patchplatform",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "patchfeatures",
                                    "type": "string"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "time",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "string",
                                    "name": "verificationstatus",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "deploymentstatus",
                                    "type": "string"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "patchno",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "requestnumber",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "deployedTimeStamp",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "string",
                                    "name": "rejectdescription",
                                    "type": "string"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "version",
                                    "type": "uint256"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "uint256",
                                    "name": "",
                                    "type": "uint256"
                                }
                            ],
                            "name": "PatchInfoArray",
                            "outputs": [
                                {
                                    "internalType": "string",
                                    "name": "patchname",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "crutiality",
                                    "type": "string"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "string",
                                    "name": "_patchname",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "_rejectedDescription",
                                    "type": "string"
                                }
                            ],
                            "name": "RejectPatch",
                            "outputs": [],
                            "stateMutability": "nonpayable",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "uint256",
                                    "name": "",
                                    "type": "uint256"
                                }
                            ],
                            "name": "RejectedPatches",
                            "outputs": [
                                {
                                    "internalType": "string",
                                    "name": "",
                                    "type": "string"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "string",
                                    "name": "_patchname",
                                    "type": "string"
                                }
                            ],
                            "name": "VerifyPatch",
                            "outputs": [],
                            "stateMutability": "nonpayable",
                            "type": "function"
                        },
                        {
                            "inputs": [],
                            "name": "admin",
                            "outputs": [
                                {
                                    "internalType": "address",
                                    "name": "",
                                    "type": "address"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [],
                            "name": "check",
                            "outputs": [
                                {
                                    "internalType": "bool",
                                    "name": "",
                                    "type": "bool"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [],
                            "name": "developer",
                            "outputs": [
                                {
                                    "internalType": "address",
                                    "name": "",
                                    "type": "address"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "string[]",
                                    "name": "_bugs",
                                    "type": "string[]"
                                },
                                {
                                    "internalType": "string[]",
                                    "name": "_features",
                                    "type": "string[]"
                                },
                                {
                                    "internalType": "string",
                                    "name": "_environmentDetails",
                                    "type": "string"
                                }
                            ],
                            "name": "feedbacks",
                            "outputs": [],
                            "stateMutability": "nonpayable",
                            "type": "function"
                        },
                        {
                            "inputs": [],
                            "name": "get",
                            "outputs": [
                                {
                                    "components": [
                                        {
                                            "internalType": "string",
                                            "name": "environmentDetails",
                                            "type": "string"
                                        },
                                        {
                                            "internalType": "string[]",
                                            "name": "bugs",
                                            "type": "string[]"
                                        },
                                        {
                                            "internalType": "string[]",
                                            "name": "RemainOrDeleteBugs",
                                            "type": "string[]"
                                        },
                                        {
                                            "internalType": "string[]",
                                            "name": "features",
                                            "type": "string[]"
                                        },
                                        {
                                            "internalType": "string[]",
                                            "name": "RemainOrDeleteFeatures",
                                            "type": "string[]"
                                        },
                                        {
                                            "internalType": "uint256[]",
                                            "name": "bugspriority",
                                            "type": "uint256[]"
                                        },
                                        {
                                            "internalType": "uint256[]",
                                            "name": "featurespriority",
                                            "type": "uint256[]"
                                        },
                                        {
                                            "internalType": "uint256[]",
                                            "name": "labelstatus",
                                            "type": "uint256[]"
                                        },
                                        {
                                            "internalType": "uint256[]",
                                            "name": "labelstatusfeatures",
                                            "type": "uint256[]"
                                        }
                                    ],
                                    "internalType": "struct PatchMangement.report[]",
                                    "name": "",
                                    "type": "tuple[]"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [],
                            "name": "getImportance",
                            "outputs": [
                                {
                                    "components": [
                                        {
                                            "internalType": "string",
                                            "name": "patchname",
                                            "type": "string"
                                        },
                                        {
                                            "internalType": "string",
                                            "name": "crutiality",
                                            "type": "string"
                                        }
                                    ],
                                    "internalType": "struct PatchMangement.PatchInfo[]",
                                    "name": "",
                                    "type": "tuple[]"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [],
                            "name": "getRejectedPatches",
                            "outputs": [
                                {
                                    "internalType": "string[]",
                                    "name": "",
                                    "type": "string[]"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [],
                            "name": "getdetails",
                            "outputs": [
                                {
                                    "components": [
                                        {
                                            "internalType": "string",
                                            "name": "patchname",
                                            "type": "string"
                                        },
                                        {
                                            "internalType": "string",
                                            "name": "fileData",
                                            "type": "string"
                                        },
                                        {
                                            "internalType": "string",
                                            "name": "patchplatform",
                                            "type": "string"
                                        },
                                        {
                                            "internalType": "string",
                                            "name": "patchfeatures",
                                            "type": "string"
                                        },
                                        {
                                            "internalType": "uint256",
                                            "name": "time",
                                            "type": "uint256"
                                        },
                                        {
                                            "internalType": "string",
                                            "name": "verificationstatus",
                                            "type": "string"
                                        },
                                        {
                                            "internalType": "string",
                                            "name": "deploymentstatus",
                                            "type": "string"
                                        },
                                        {
                                            "internalType": "uint256",
                                            "name": "patchno",
                                            "type": "uint256"
                                        },
                                        {
                                            "internalType": "uint256",
                                            "name": "requestnumber",
                                            "type": "uint256"
                                        },
                                        {
                                            "internalType": "uint256",
                                            "name": "deployedTimeStamp",
                                            "type": "uint256"
                                        },
                                        {
                                            "internalType": "string",
                                            "name": "rejectdescription",
                                            "type": "string"
                                        },
                                        {
                                            "internalType": "uint256",
                                            "name": "version",
                                            "type": "uint256"
                                        }
                                    ],
                                    "internalType": "struct PatchMangement.Patch[]",
                                    "name": "",
                                    "type": "tuple[]"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [],
                            "name": "getdetailsRequest",
                            "outputs": [
                                {
                                    "components": [
                                        {
                                            "internalType": "string[]",
                                            "name": "bugs",
                                            "type": "string[]"
                                        },
                                        {
                                            "internalType": "string[]",
                                            "name": "features",
                                            "type": "string[]"
                                        },
                                        {
                                            "internalType": "string",
                                            "name": "date",
                                            "type": "string"
                                        },
                                        {
                                            "internalType": "uint256",
                                            "name": "requestno",
                                            "type": "uint256"
                                        },
                                        {
                                            "internalType": "string",
                                            "name": "software",
                                            "type": "string"
                                        }
                                    ],
                                    "internalType": "struct PatchMangement.request[]",
                                    "name": "",
                                    "type": "tuple[]"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [],
                            "name": "labeller",
                            "outputs": [
                                {
                                    "internalType": "address",
                                    "name": "",
                                    "type": "address"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "string",
                                    "name": "",
                                    "type": "string"
                                }
                            ],
                            "name": "map",
                            "outputs": [
                                {
                                    "internalType": "string",
                                    "name": "",
                                    "type": "string"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "string",
                                    "name": "",
                                    "type": "string"
                                }
                            ],
                            "name": "map2",
                            "outputs": [
                                {
                                    "internalType": "string",
                                    "name": "",
                                    "type": "string"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "uint256",
                                    "name": "",
                                    "type": "uint256"
                                }
                            ],
                            "name": "patches",
                            "outputs": [
                                {
                                    "internalType": "string",
                                    "name": "",
                                    "type": "string"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "uint256",
                                    "name": "",
                                    "type": "uint256"
                                }
                            ],
                            "name": "reports",
                            "outputs": [
                                {
                                    "internalType": "string",
                                    "name": "environmentDetails",
                                    "type": "string"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "uint256",
                                    "name": "",
                                    "type": "uint256"
                                }
                            ],
                            "name": "requestArray",
                            "outputs": [
                                {
                                    "internalType": "string",
                                    "name": "date",
                                    "type": "string"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "requestno",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "string",
                                    "name": "software",
                                    "type": "string"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "uint256",
                                    "name": "",
                                    "type": "uint256"
                                }
                            ],
                            "name": "result",
                            "outputs": [
                                {
                                    "internalType": "string",
                                    "name": "",
                                    "type": "string"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "string",
                                    "name": "_filedata",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "_patchname",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "_patchplatform",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "_patchfeatures",
                                    "type": "string"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "_patchno",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "_requestnumber",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "string",
                                    "name": "_crutiality",
                                    "type": "string"
                                }
                            ],
                            "name": "setPatch",
                            "outputs": [],
                            "stateMutability": "nonpayable",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "string",
                                    "name": "_filedata",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "_patchname",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "_patchplatform",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "_patchfeatures",
                                    "type": "string"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "_patchno",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "_requestnumber",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "_version",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "string",
                                    "name": "_crutiality",
                                    "type": "string"
                                }
                            ],
                            "name": "setPatchIfRejected",
                            "outputs": [],
                            "stateMutability": "nonpayable",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "internalType": "string[]",
                                    "name": "_bugs",
                                    "type": "string[]"
                                },
                                {
                                    "internalType": "string[]",
                                    "name": "_features",
                                    "type": "string[]"
                                },
                                {
                                    "internalType": "string",
                                    "name": "_date",
                                    "type": "string"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "_requestno",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "string",
                                    "name": "_software",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string[]",
                                    "name": "bugsforlabel",
                                    "type": "string[]"
                                },
                                {
                                    "internalType": "string[]",
                                    "name": "featuresforlabel",
                                    "type": "string[]"
                                }
                            ],
                            "name": "setRequest",
                            "outputs": [],
                            "stateMutability": "nonpayable",
                            "type": "function"
                        },
                        {
                            "inputs": [
                                {
                                    "components": [
                                        {
                                            "internalType": "string",
                                            "name": "bug",
                                            "type": "string"
                                        },
                                        {
                                            "internalType": "uint256",
                                            "name": "priority",
                                            "type": "uint256"
                                        }
                                    ],
                                    "internalType": "struct PatchMangement.bugsprio[]",
                                    "name": "keyvaluepair",
                                    "type": "tuple[]"
                                },
                                {
                                    "components": [
                                        {
                                            "internalType": "string",
                                            "name": "feature",
                                            "type": "string"
                                        },
                                        {
                                            "internalType": "uint256",
                                            "name": "priorityfeature",
                                            "type": "uint256"
                                        }
                                    ],
                                    "internalType": "struct PatchMangement.featuresprio[]",
                                    "name": "keyvaluepairfeature",
                                    "type": "tuple[]"
                                }
                            ],
                            "name": "setbugfeaturePriority",
                            "outputs": [],
                            "stateMutability": "nonpayable",
                            "type": "function"
                        },
                        {
                            "inputs": [],
                            "name": "verifier",
                            "outputs": [
                                {
                                    "internalType": "address",
                                    "name": "",
                                    "type": "address"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        }
                    ]
                    const Address2= "0x5CfdAa513b37D8FB85c51857803aB6a87b387BE2";
                    
                    
                    // 0x5CfdAa513b37D8FB85c51857803aB6a87b387BE2


                    // const web3 = new Web3("HTTP://127.0.0.1:7545");
                    const web3 = new Web3(ethereum);
                    const contract2 = new web3.eth.Contract(ABI2, Address2);
                    setContract(contract2);
                }
                connectContract();
            }
            catch (error) {
                console.log(error);
            }
        
    }, []);
    console.log(contract2);
    return [contract2];
}

export default Web3Contract2;





