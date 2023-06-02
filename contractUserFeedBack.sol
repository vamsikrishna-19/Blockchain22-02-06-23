//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;
contract feedback{
    struct report{
        string environmentDetails;
        string[] bugs;
        string[] features;
        uint[] bugspriority;
        uint[] featurespriority;
        uint[] labelstatus;
        uint[] labelstatusfeatures;
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
    mapping(string=> report) map;
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
    function feedbacks(string[] memory _bugs,string[] memory _features,string memory _environmentDetails) public {
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
        report memory newReport=report(_environmentDetails,_bugs,_features,bugspriority,featurespriority,bugsstatus,featurestatus);
        reports.push(newReport);
    }
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
    function setbugfeaturelabel(string[] memory bugsforlabel,string[] memory featuresforlabel) public onlyAdmin{
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
    


    function get() public view returns(report[] memory){
        return reports;
    }
}