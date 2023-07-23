import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Web3 from "web3";
import Web3Contract2 from './Web3Contract2';
import { Web3Storage } from 'web3.storage';
import ConnectMetaMask from './ConnectMetaMask';
import Axios from 'axios';
const DeveloperCreatesPatch = (props) => {
	const location = useLocation();
	const Navigate = useNavigate();
	const state = location.state;
	// const Web3 = require('web3');
	const web3 = new Web3(window.ethereum);
	const [selectedFile, setSelectedFile] = useState(null);
	const handleFileChange = (event) => {
		setSelectedFile(event.target.files[0]);
		console.log(selectedFile);

		const confirm = window.confirm(`Do u want to confirm uploading${event.target.files[0].name}`);
		if(confirm){
			uploadFile();
		}
	};
	const Web3Contract = Web3Contract2();
	const contract2 = Web3Contract[0];
	const Account = ConnectMetaMask();
	const account = Account[0];
	const [patchNo, setpatchNo] = useState(0);
	const [patchfeatures, setPatchFeatures] = useState("");
	const [fileCid, setfileCid] = useState("");
	const [importance, setImportance] = useState("");
	console.log(state);
	const handleOnChangeImportance = (e) => {
		setImportance(e.target.value);
	}
	const createPatch = async () => {
		//check wheather the request number already exits in patches if present
		//then count the value of request number and store count(requestNo) as 
		//version for the patch
		// console.log(!requestNoArray.includes(state.data.requestno));

		
			const usertype = sessionStorage.getItem('Role');
			const username = sessionStorage.getItem('Username');
			console.log(fileCid);
			console.log(patchName);
			console.log(state.data.software);
			console.log(patchfeatures);
			console.log(patchNo);
			console.log(state.data.requestno);
			console.log(importance);
			// console.log(requestNoArray);
			console.log(version);
			if (version == 0) {
				try {
					contract2.methods.setPatch(fileCid, patchName, state.data.software, patchfeatures, patchNo, state.data.requestno, importance).send({ from: account }).then(async(result) => {
						console.log(result);
						const receipt=await web3.eth.getTransactionReceipt(result.transactionHash)
							
							console.log(receipt);
							try {
								const res = await Axios.post('http://localhost:3001/TransactionHistory', {
									usertype: usertype,
									username: username,
									status: Number(receipt.status),
									transactionHash: result.transactionHash,
									blockHash: receipt.blockHash,
									contractAddress: receipt.contractAddress,
									blockNumber: Number(receipt.blockNumber),
									gasUsed: Number(receipt.gasUsed),
									from: receipt.from,
									to: receipt.to,
									typeOfTransaction: "Created New" + patchName + "for Request-No:" + state.data.requestno,
								},
								);
								console.log(res.data);
							}
							catch (error) {
								console.log(error);
							}
					
						props.showAlert(`Transaction Successful with Transaction Hash ${result.transactionHash}.Gas Used : ${result.gasUsed}`, "success");
						
					}).catch(async (error) => {
						try {
							
							const jsonString = error.message;
							console.log(error.message);
							const hashIndex = jsonString.indexOf('"hash":"');
							const start = hashIndex + 8;
							const end = jsonString.indexOf('"', start);
							const hash = jsonString.substring(start, end);
							console.log("Hash value:", hash);
							const receipt = await web3.eth.getTransactionReceipt(hash);
							console.log(receipt);
							try {
								const res = await Axios.post('http://localhost:3001/TransactionHistory', {
									usertype: usertype,
									username: username,
									status: Number(receipt.status),
									transactionHash: hash,
									blockHash: receipt.blockHash,
									contractAddress: receipt.contractAddress,
									blockNumber: Number(receipt.blockNumber),
									gasUsed: Number(receipt.gasUsed),
									from: receipt.from,
									to: receipt.to,
									typeOfTransaction: "Transaction Failed due to wrong account in use",
								},
								);
								console.log(res.data);
								props.showAlert(`Transaction failed with Transaction Hash ${hash}.Gas Used : ${receipt.gasUsed}`, "warning");
								Navigate("/Developer");
							}
							catch (error) {
								console.log(error);
							}
						}
						catch (error) {
							console.log(error);
						}
			
					});
				}
				catch (error) {
					console.log("Error occurred while creating the patch:", error);
				}
			}
		
		// else {
		// 	console.log("can not create patch with out uploading please wait until uplaoding done")
		// }

	}
	const [version, setVersion] = useState(0);
	const Function1 = async () => {
		await contract2.methods.getdetails().call().then((result) => {
			console.log(result);
			let v = 0;
			for (let i = 0; i < result.length; i++) {
				if (result[i].requestnumber == state.data.requestno) {
					v++;
				}
			}
			setVersion(v);
			setpatchNo(result.length + 1);
			console.log(result.length + 1);
		});

		setPatchFeatures([...(state.data.bugs), ...(state.data.features)].join(","));
	}
	const [uploading, setUploading] = useState(false);
	const uploadFile = async () => {
		if(selectedFile){
			try {
				setUploading(true);
				const client = new Web3Storage({ token: process.env.REACT_APP_API_KEY });
				const cid = await client.put([selectedFile]);
				setfileCid(cid);
				console.log(`File uploaded to Web3.Storage with CID: ${cid}`);
				setUploading(false);
			} catch (error) {
				console.error('Error uploading file:', error);
			}
		} else {
			console.log('No file selected.');
		}
	};
	const [patchName, setPatchName] = useState("");
	useEffect(() => {
		if (contract2) {
			Function1();
		}
	}, [contract2]);
	useEffect(() => {
		uploadFile();
	}, [selectedFile])
	return (
		<>
			<div className="container">
				<div className=" text-center">
					<div className='my-5'>
						<form action="">
							<div className="container">
								<div className="row">
									<div className="col-12 col-lg-7 mx-auto">
										<div className="input-group mb-3 me-3 d-flex align-items-end">
											<label htmlFor="patchname">
												<h5> Request No : </h5>
											</label>
											<input type="number" id="RequestNo" className="form-control ms-2" placeholder={"Request No-" + state.data.requestno} readOnly />
											<label className="input-group-text" htmlFor="RequestNo">Request No</label>
										</div>
									</div>
								</div>
								<br />
								<div className="row">
									<div className="col-12 col-lg-7 mx-auto">
										<div className="input-group mb-3 me-3 d-flex align-items-end">
											<label htmlFor="patchname">
												<h5> Upload : </h5>
											</label>
											<input type="file" className="form-control ms-2" id="inputGroupFile" onChange={handleFileChange} />

											<label className="input-group-text" htmlFor="inputGroupFile">Upload</label>
										</div>
									</div>
								</div>
								{uploading ? (
									<>
										<button className="btn btn-primary" type="button" disabled>
											<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
											Uploading...
										</button>
										<br />
									</>
								) : (
									fileCid ? (
										<>
											<button className="btn btn-success" type="button" disabled>
												<b>
													File Uploaded to Web3 storage
												</b>
											</button>
											<br />
										</>
									) : null
								)}
								<br />
								<div className="row">
									<div className="col-12 col-lg-7 mx-auto">
										<div className="input-group mb-3 me-3 d-flex align-items-end">
											<label htmlFor="patchname">
												<h5> Patch Name : </h5>
											</label>
											<input type="text" id="patchname" className="form-control ms-2" placeholder="Patch name" autoComplete="off" onChange={(e) => {
												setPatchName(e.target.value);
											}} />
											<label className="input-group-text" htmlFor="patchname"  >Patchname</label>
										</div>
									</div>
								</div>
								<br />
								<div className="row">
									<div className="col-12 col-lg-7 mx-auto">
										<div className="input-group mb-3 me-3 d-flex align-items-center">
											<label htmlFor="criticality">
												<h5>
													Patch Importance :

												</h5>
											</label>
											<select className="form-control ms-2" id="criticality" name="criticality" onChange={handleOnChangeImportance}>
												<option selected value="Select Option">Select Option</option>
												<option value="Low">Low</option>
												<option value="Medium">Medium</option>
												<option value="High">High</option>
												<option value="Critical"> Critical</option>
											</select>

										</div>
									</div>
								</div>
								<br />
								<div className="row">
									<div className="col-12 col-lg-7 mx-auto">
										<div className="input-group mb-3 me-3 d-flex align-items-center">
											<label htmlFor="patchplatform">
												<h5> Software or platform :</h5>
											</label>
											<input type="text" className="form-control ms-2" id="patchplatform" placeholder={state.data.software} readOnly />
										</div>
									</div>
								</div>
								<br />
								<div className="row">
									<div className="col-12 col-lg-7 mx-auto ">
										<div className="input-group mb-3 me-3 d-flex align-items-end">
											<label htmlFor="patchno">
												<h5> Patch Id :  </h5>
											</label>
											<input className="form-control ms-2" type="number" id="patchno" value={patchNo} readOnly />
											<label className="input-group-text" htmlFor="patchno">Patch No</label>
										</div>
									</div>
								</div>
								<br />
								<div className="row">
									<div className="col-12 col-lg-7 mx-auto">
										<div className="input-group mb-3 me-3 d-flex align-items-center">
											<label htmlFor="Features">
												<h5> Patch Features : </h5>
											</label>
											<textarea type='text' className="form-control ms-2" id="Features" name="Features" value={patchfeatures} readlOnly rows="5"
												cols="100" placeholder="Features"></textarea>

										</div>
									</div>
								</div>
								<div>
									<button className="btn btn-dark" type="button" onClick={createPatch}>Submit</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}

export default DeveloperCreatesPatch
