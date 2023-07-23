//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;
// import './devtoverifiteam.sol';

contract PatchMangement{


    struct Patch{
        string patchname;
        string fileData; // fileData is the cid of the file that is stored in web3 storage
        string patchplatform; 
        string patchfeatures; 
        uint256 time;  // the time of creation of patch
        string verificationstatus; // gives the status of verification wheather it is verified or rejected
        string deploymentstatus; // status of the deployement of patch 
        uint256 patchno;  //patchno represents the patch id
        uint256 requestnumber; 
        uint256 deployedTimeStamp; //time of deployment
    
        string rejectdescription; // if the patch got rejected the verifier should give the description
        uint256 version; // version of the request to be added
    }


    // report is actually the report of bugs,features i.e feedback 
    struct report{
        string environmentDetails;
        string[] bugs;
        string[] RemainOrDeleteBugs;
        string[] features;
        string[] RemainOrDeleteFeatures;
        uint[] bugspriority;
        uint[] featurespriority;
        uint[] labelstatus;
        uint[] labelstatusfeatures;
    }
    bool public check;

    // request sent by the admin to developer
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
    

    // modifer is used to check wheather the user is required to access the function
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

    //info of patch actually contains patch name and importance
    struct PatchInfo{
        string patchname;
        string crutiality;
    }
    PatchInfo[] public PatchInfoArray;
    request[] public requestArray;
    uint data=0;
    report[] public reports;
    struct bugsprio{
        string bug;
        uint priority;
    }
    struct featuresprio{
        string feature;
        uint priorityfeature;
    }

    // feedback is actually the bugs and features sent by labeller to smart contract
    function feedbacks(string[] memory _bugs,string[] memory _features,string memory _environmentDetails) public onlyLabeller{
        uint[] memory bugsstatus = new uint[](_bugs.length);
        uint[] memory bugspriority =  new uint[](_bugs.length);
        for (uint i = 0; i < bugsstatus.length; i++) {
            bugsstatus[i]=0;
            bugspriority[i]=0;
        }
        uint[] memory featurestatus = new uint[](_features.length);
        uint[] memory featurespriority= new uint[](_features.length);
        for (uint i = 0; i < featurestatus.length; i++) {
            featurestatus[i]=0;
            featurespriority[i]=0;
        }
        string[] memory remainOrDeleteBugs= new string[](_bugs.length);
        string[] memory remainOrDeleteFeatures= new string[](_bugs.length);
        for(uint i=0;i<bugsstatus.length;i++){
            remainOrDeleteBugs[i]="Pending";
        }
        for(uint i=0;i<bugsstatus.length;i++){
            remainOrDeleteFeatures[i]="Pending";
        }
        report memory newReport=report(_environmentDetails,_bugs,remainOrDeleteBugs,_features,remainOrDeleteFeatures,bugspriority,featurespriority,bugsstatus,featurestatus);
        reports.push(newReport);
    }
  
 
    // bugs and features along with priority by labeller
    function setbugfeaturePriority(bugsprio[] memory keyvaluepair,featuresprio[] memory keyvaluepairfeature) public onlyLabeller{
        for(uint i=0;i<keyvaluepair.length;i++){
            for(uint j=0;j<reports.length;j++){
                for(uint k=0;k<reports[j].bugs.length;k++){
                if(keccak256(abi.encodePacked(keyvaluepair[i].bug))==keccak256(abi.encodePacked(reports[j].bugs[k]))){
                    reports[j].bugspriority[k]=keyvaluepair[i].priority;
                }
                }
            }
        }
        for(uint i=0;i<keyvaluepairfeature.length;i++){
            for(uint j=0;j<reports.length;j++){
                for(uint k=0;k<reports[j].features.length;k++){
                if(keccak256(abi.encodePacked(keyvaluepairfeature[i].feature))==keccak256(abi.encodePacked(reports[j].features[k]))){
                    reports[j].featurespriority[k]=keyvaluepairfeature[i].priorityfeature;
                }
                }
            }
        }
    }
   
    
    function get() public view returns(report[] memory){
        return reports;
    }



    // admin will send the request to developer  through this function
    function setRequest(string[] memory _bugs,string[] memory _features,string memory _date,uint256 _requestno,string memory _software,string[] memory bugsforlabel,string[] memory featuresforlabel) public onlyAdmin{
        request memory newRequest=request(_bugs,_features,_date,_requestno,_software);
        requestArray.push(newRequest);
        for(uint i=0;i<bugsforlabel.length;i++){
            for(uint j=0;j<reports.length;j++){
                for(uint k=0;k<reports[j].bugs.length;k++){
                if(keccak256(abi.encodePacked(bugsforlabel[i]))==keccak256(abi.encodePacked(reports[j].bugs[k]))){
                    reports[j].labelstatus[k]=1;
                }
                }
            }
        }
        for(uint i=0;i<featuresforlabel.length;i++){
            for(uint j=0;j<reports.length;j++){
                for(uint k=0;k<reports[j].features.length;k++){
                if(keccak256(abi.encodePacked(featuresforlabel[i]))==keccak256(abi.encodePacked(reports[j].features[k]))){
                    reports[j].labelstatusfeatures[k]=1;
                }
                }
            }
        }
    }
    function getdetailsRequest() public view returns (request[] memory){
        return requestArray;
    }
    Patch[] public PatchArray;


    //set patch is done by developer while creating a patch 
    function setPatch(string memory _filedata,string memory _patchname ,string memory _patchplatform,string memory _patchfeatures,uint256 _patchno,uint256 _requestnumber,string memory _crutiality) public onlyDeveloper {
        Patch memory newPatch=Patch(_patchname,_filedata,_patchplatform,_patchfeatures,block.timestamp,"IN PROGRESS","Not yet Deployed",_patchno,_requestnumber,0,"",0);
        PatchArray.push(newPatch);
        PatchInfo memory newPatchInfo=PatchInfo(_patchname,_crutiality);
        PatchInfoArray.push(newPatchInfo);
    }

    // re-uploading the patch by developer  
    function setPatchIfRejected(string memory _filedata,string memory _patchname ,string memory _patchplatform,string memory _patchfeatures,uint256 _patchno,uint256 _requestnumber,uint256 _version,string memory _crutiality) public onlyDeveloper {
        Patch memory newPatch=Patch(_patchname,_filedata,_patchplatform,_patchfeatures,block.timestamp,"IN PROGRESS","Not yet Deployed",_patchno,_requestnumber,0,"",_version);
        PatchArray.push(newPatch);
        PatchInfo memory newPatchInfo=PatchInfo(_patchname,_crutiality);
        PatchInfoArray.push(newPatchInfo);
    }
    function getImportance() public view returns (PatchInfo[] memory){
        return PatchInfoArray;
    }
    function getdetails() public view returns (Patch[] memory){
        return PatchArray;
    }
    mapping (string => string) public map;
    mapping (string => string) public map2;
    string[] public patches;
    string[] public result;
    string[] public RejectedPatches;
    function getRejectedPatches() public view returns (string[] memory){
        return RejectedPatches;
    }


    //verifier 
    function VerifyPatch(string memory _patchname)  public onlyVerifier{
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
    function RejectPatch(string memory _patchname,string memory _rejectedDescription) public onlyVerifier{
        map[_patchname]="rejected";
        patches.push(_patchname);
        result.push("Rejected");
        for(uint j=0;j<PatchArray.length;j++){
            if(keccak256(abi.encodePacked(_patchname))==keccak256(abi.encodePacked(PatchArray[j].patchname)) ){
                check=true;
                PatchArray[j].verificationstatus="Rejected";
                PatchArray[j].rejectdescription=_rejectedDescription;
                RejectedPatches.push(_patchname);
            }
        }
    }
    function DeployPatch(string memory _patchname)  public onlyAdmin{
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