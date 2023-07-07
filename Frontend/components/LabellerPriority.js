import React, { useState, useEffect } from "react";
import web3 from "web3";
import Axios from 'axios';
import Web3Contract1 from "./Web3Contract1";
import ConnectMetaMask from "./ConnectMetaMask";
function Labellerpriority() {
	const [selectPrioritybug, setSelectPrioritybug] = useState("");
	const [selectPriorityfeature, setSelectPriorityfeature] = useState("");
	const [dataArray, setdataArray] = useState([]);
	const Web3 = require('web3');


	const web3 = new Web3('HTTP://127.0.0.1:7545');
	const [select, setSelect] = useState("");
	const Web3Contract = Web3Contract1();
	const Account=ConnectMetaMask();
    const account=Account[0];
	const contract = Web3Contract[0];
	async function handleOnChange(event) {
		setSelect(event.target.value);
		contract.methods.get().call().then(async (result) => {
			console.log(result);
			setdataArray(result);

		});
	}
	const [bugsdict, setBugdict] = useState({});
	const [featuredict, setFeaturedict] = useState({});
	const setDictionarybug = (selectedOption, selectedbug) => {

		// adding bug to dictionary
		setBugdict((bugsdict) => ({ ...bugsdict, [selectedbug]: selectedOption }));


		//remove if  bug if value is choose priority
		// setBugdict((bugsdict) => {
		// 	const updatedDict = {};
		
		// 	for (const bug in bugsdict) {
		// 	  if (bugsdict[bug] !== "choose priority") {
		// 		updatedDict[bug] = bugsdict[bug];
		// 	  }
		// 	}
		
		// 	updatedDict[selectedbug] = selectedOption;
		
		// 	return updatedDict;
		//   });
		
		

		
	}
	const setDictionaryfeature = (selectedOption, selectedfeature) => {
		setFeaturedict((featuredict) => ({ ...featuredict, [selectedfeature]: selectedOption }));
	}
	const setprioritybugsfeatures = async () => {
		const usertype = sessionStorage.getItem('Role');
		const username = sessionStorage.getItem('Username');
		const BugsDict=Object.fromEntries(
			Object.entries(bugsdict).filter(([key,value])=>value!="Select Priority")
		);
		
		const FeaturesDict = Object.fromEntries(
			Object.entries(featuredict).filter(([key, value]) => value !== "Select Priority")
		  );
		console.log(Object.entries(BugsDict), Object.entries(FeaturesDict))
		if (Object.keys(BugsDict).length != 0 || Object.keys(FeaturesDict).length != 0) {
			contract.methods.setbugfeaturePriority(Object.entries(BugsDict), Object.entries(FeaturesDict)).send({ from: account }).then(async (result) => {
				console.log(result);
				web3.eth.getTransactionReceipt(result.transactionHash, async (error, receipt) => {
					if (error) {
						console.log("Error occured while getting transaction Reciept", error);
					}
					console.log(receipt);
					try {
						const res = await Axios.post('http://localhost:3001/TransactionHistory', {
							usertype: usertype,
							username: username,
							status: receipt.status,
							transactionHash: result.transactionHash,
							blockHash: receipt.blockHash,
							contractAddress: receipt.contractAddress,
							blockNumber: receipt.blockNumber,
							gasUsed: receipt.gasUsed,
							from: receipt.from,
							to: receipt.to,
							typeOfTransaction: "Set Priority to Bugs And Features"
						},
						);
						console.log(res.data);
					}
					catch (error) {
						console.log(error);
					}
				});
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

							<br /><br />
							<div className="row">
								<div className="col-6">
									<ol className="bordered-list">
										{dataArray.map((data, dataIndex) => {
											return (
												<>
													<ul className="list-group">
														{data.bugspriority.map((label, labelIndex) => {
															if (label == '0' && data.environmentDetails == select) {
																return (
																	<>
																		<li className="align-items-center d-flex justify-content-between col-12 list-group-item form-control" key={labelIndex}>{data.bugs[labelIndex]}</li>

																		<select className="col-12 list-group-item" name="selectePriority" id="selectIndex" onChange={(event) => {
																			const selectedOption = event.target.value;
																			const handleOnChangebugs = (selectedOption) => {

																				setSelectPrioritybug(selectedOption);
																				setDictionarybug(selectedOption, data.bugs[labelIndex]);
																				console.log(bugsdict);
																			};
																			handleOnChangebugs(selectedOption);
																		}}>
																			<option selected>Select Priority</option>
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
									<ol className="bordered-list" >
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
																			const selectedOption = event.target.value;
																			const handleOnChangefeature = (selectedOption) => {
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