// import React, { useEffect, useState } from 'react'
// import Web3 from "web3"
// const ConnectMetaMask = () => {
//     const [account, setAccount] = useState("");
//     const { ethereum } = window;
//     const getAccount = async () => {
        
//         if (ethereum !== "undefined") {
//             const accounts = await ethereum.request({
//                 method: "eth_requestAccounts",
//             });
//             setAccount(accounts[0]);
//         }
    
//     }
//     useEffect(() => {
//         getAccount();
//     }, [])
//     return [account];
// }

// export default ConnectMetaMask;
import React, { useEffect, useState } from 'react';
import Web3 from "web3";

const ConnectMetaMask = () => {
  const [account, setAccount] = useState("");
  const { ethereum } = window;

  const getAccount = async () => {
    if (typeof ethereum !== "undefined") {
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    getAccount();
  }, []);

  return [account];
}

export default ConnectMetaMask;
