import React, { useState, useEffect } from 'react'
import Web3 from "web3"

const Web3Contract1 = () => {
    const { ethereum } = window;
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);
    useEffect(()=>{
        const connectMetamask = async () => {
            if (ethereum !== "undefined") {
                const accounts = await ethereum.request({
                    method: "eth_requestAccounts",
                });
                setAccount(accounts[0]);
            }
            const ABI = [
                {
                    "inputs": [],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
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
                                    "name": "features",
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
                            "internalType": "struct feedback.report[]",
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
                            "internalType": "struct feedback.bugsprio[]",
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
                            "internalType": "struct feedback.featuresprio[]",
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
                    "inputs": [
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
                    "name": "setbugfeaturelabel",
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
            const Address = "0xbC59E6a52fA17C6bec9a4FDc09a518435cad2297";
            const web3 = new Web3(ethereum);
            const contract = new web3.eth.Contract(ABI, Address);
            setContract(contract);
        };
        connectMetamask();
    }, []);
    return [account,contract];
}
export default Web3Contract1;
