import React,{useState,useEffect} from 'react'
import Web3 from "web3"

const Web3Contract2 = () => {
        const {ethereum} = window;
        const [contract2,setContract]=useState(null);
        const [account,setAccount]=useState(null);
        useEffect(()=>{
            const connectMetamask=async()=>{
                if(window.ethereum!=="undefined"){
                    const accounts=await ethereum.request({
                        method:"eth_requestAccounts",
                    });
                    setAccount(accounts[0]);
                }
                const ABI2 = [
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
                        "name": "Deployed",
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
                                "internalType": "bytes",
                                "name": "fileData",
                                "type": "bytes"
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
                            }
                        ],
                        "stateMutability": "view",
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
                                "internalType": "string",
                                "name": "_patchname",
                                "type": "string"
                            }
                        ],
                        "name": "findandreply",
                        "outputs": [],
                        "stateMutability": "nonpayable",
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
                        "name": "findandreplynotverified",
                        "outputs": [],
                        "stateMutability": "nonpayable",
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
                                        "internalType": "bytes",
                                        "name": "fileData",
                                        "type": "bytes"
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
                                    }
                                ],
                                "internalType": "struct RegisterPatch.Patch[]",
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
                                "internalType": "struct RegisterPatch.request[]",
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
                                "internalType": "bytes",
                                "name": "_filedata",
                                "type": "bytes"
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
                            }
                        ],
                        "name": "setRequest",
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
                ];
                const Address2 = "0x58d9825e8Cb33e78989FD76663A5774fB280bF4c";
                window.web3 = new Web3(window.ethereum);
                window.contract2 = await new window.web3.eth.Contract(ABI2, Address2);
                setContract(window.contract2);
            }
            connectMetamask();
        },[]);
        console.log(contract2);
        return [account,contract2];
}

export default Web3Contract2;





