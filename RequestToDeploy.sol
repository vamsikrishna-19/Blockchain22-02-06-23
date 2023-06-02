//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;
// import './devtoverifiteam.sol';

contract RegisterPatch{
    struct Patch{
        string patchname;
        bytes fileData;
        string patchplatform;
        string patchfeatures;
        uint256 time;
        string verificationstatus;
        string deploymentstatus;
        uint256 patchno;
        uint256 requestnumber;
        uint256 deployedTimeStamp;
    }
    bool public check;
    struct request{
        string[] bugs;
        string[] features;
        string date;
        uint256 requestno;
        string software;
    }
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
        require(msg.sender == labeller, "Only the labeller can call this function.");
        _;
    }
    modifier onlyDeveloper {
        require(msg.sender == developer, "Only the developer can call this function.");
        _;
    }
    modifier onlyVerifier{
        require(msg.sender == verifier, "Only the verifier can call this function.");
        _;
    }

    
    request[] public requestArray;
    function setRequest(string[] memory _bugs,string[] memory _features,string memory _date,uint256 _requestno,string memory _software) public onlyAdmin{
        request memory newRequest=request(_bugs,_features,_date,_requestno,_software);
        requestArray.push(newRequest);
    }
    function getdetailsRequest() public view returns (request[] memory){
        return requestArray;
    }
    Patch[] public PatchArray;
    function setPatch(bytes memory _filedata,string memory _patchname ,string memory _patchplatform,string memory _patchfeatures,uint256 _patchno,uint256 _requestnumber) public onlyDeveloper {
        Patch memory newPatch=Patch(_patchname,_filedata,_patchplatform,_patchfeatures,block.timestamp,"IN PROGRESS","Not yet Deployed",_patchno,_requestnumber,0);
        PatchArray.push(newPatch);
    }
    function getdetails() public view returns (Patch[] memory){
        return PatchArray;
    }
    mapping (string => string) public map;
    mapping (string => string) public map2;
    string[] public patches;
    string[] public result;
    function findandreply(string memory _patchname)  public onlyVerifier{
        map[_patchname]="verified";
        patches.push(_patchname);
        result.push("verified");
            for(uint j=0;j<PatchArray.length;j++){
                if(keccak256(abi.encodePacked(_patchname))==keccak256(abi.encodePacked(PatchArray[j].patchname))){
                        check=true; 
                        PatchArray[j].verificationstatus="Verified";
                }
            }
    }
    function findandreplynotverified(string memory _patchname) public onlyVerifier{
        map[_patchname]="rejected";
        patches.push(_patchname);
        result.push("Rejected");
        for(uint j=0;j<PatchArray.length;j++){
            if(keccak256(abi.encodePacked(_patchname))==keccak256(abi.encodePacked(PatchArray[j].patchname)) ){
                check=true; 
                PatchArray[j].verificationstatus="Rejected";
            }
        }
    }
    function Deployed(string memory _patchname)  public onlyAdmin{
        map2[_patchname]="deployed";
        patches.push(_patchname);
        for(uint j=0;j<PatchArray.length;j++){
            if(keccak256(abi.encodePacked(_patchname))==keccak256(abi.encodePacked(PatchArray[j].patchname)) ){
            check=true; 
            PatchArray[j].deploymentstatus="Deployed";
            PatchArray[j].deployedTimeStamp=block.timestamp;
            }
        }
    }
}