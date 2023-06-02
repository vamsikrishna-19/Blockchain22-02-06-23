//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;


contract getdownloadHistory2{
    string[] public username;
    mapping(string=>history[]) public patchmap;
    string[] public patchname;
    mapping(string=>string[]) public usermap;
    address public owner;
     address public admin;
    address public labeller;
    address public developer;
    address public verifier;
    constructor() {

        admin = 0x290453ed67911bDFD4Cb7fC2ba8159AE7f3B9162 ;
        labeller= 0xe8663eDB89b70951F8369f638b3C625890dD1127;
        developer=0xdf681c71E6EDB55E5A0a97D454d66B4eAc66c1B8;
        verifier=0x6824C7C7985A23833B974C3397Ad25b755F30c69;
    }
    
    modifier onlyAdmin {
        require(msg.sender == admin, "Only the admin can call this function.");
        _;
    }
    modifier onlyLabeller {
        require(msg.sender == labeller, "Only the Labeller can call this function.");
        _;
    }
    modifier onlyDeveleper {
        require(msg.sender == developer, "Only the Develepper can call this function.");
        _;
    }
    modifier onlyVerifier{
        require(msg.sender == verifier, "Only the verifier can call this function.");
        _;
    }
   


   struct history{
        string Username1;
        uint256 timeofDownload;
    }
 
    function setdata(string memory _patchname,string memory _username) public{
        history memory newData=history(_username,block.timestamp);
        patchmap[_patchname].push(newData);
        usermap[_username].push(_patchname);
    }
    function getdatausingPatch(string memory _patchname) public view  returns(history[] memory){
        return patchmap[_patchname];
    }
    function getdatausinguser(string memory _username) public view returns(string[] memory){
        return usermap[_username];
    }
}