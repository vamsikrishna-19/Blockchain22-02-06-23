import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Axios from 'axios';
import Web3Contract2 from "./Web3Contract2";
import ConnectMetaMask from "./ConnectMetaMask";
function Labellerpriority(props) {
	const [selectPrioritybug, setSelectPrioritybug] = useState("");
	const [selectPriorityfeature, setSelectPriorityfeature] = useState("");
	const [dataArray, setdataArray] = useState([]);
	// const Web3 = require('web3');
	const web3 = new Web3(window.ethereum);
	const [select, setSelect] = useState("");
	const Web3Contract = Web3Contract2();
	const Account = ConnectMetaMask();
	const account = Account[0];
	const contract2 = Web3Contract[0];
	const [countBugs, setCountBugs] = useState(0);
	const [countFeatures, setCountFeatures] = useState(0);
	async function handleOnChange(event){
		setSelect(event.target.value);
		if(contract2){
		try{
			contract2.methods.get().call().then(async (result) => {
				console.log(result);
				setdataArray(result);
				let countBugs1 = 0;
				result.map((data, dataIndex) => {
					{
						data.bugspriority.map((label, labelIndex) => {
							if (label == '0' && data.environmentDetails == event.target.value){
								countBugs1++;
							}
						})
					}
				})
				setCountBugs(countBugs1);
				console.log(countBugs1);
				let countFeatures1 = 0;
				{
					result.map((data, dataIndex) => {
						{
							data.featurespriority.map((labelfeature, labelIndexfeature) => {
								if (labelfeature == 0 && data.environmentDetails == event.target.value) {
									countFeatures1++;
								}
							})
						}

					})
				}
				setCountFeatures(countFeatures1);
			});
		}
		catch (error) {
			console.log(error);
		}
	}
	}
	const [bugsdict, setBugdict] = useState({});
	const [featuredict, setFeaturedict] = useState({});
	const setDictionarybug = (selectedOption, selectedbug) => {
		setBugdict((bugsdict) => ({ ...bugsdict, [selectedbug]: selectedOption }));
	}
	const setDictionaryfeature = (selectedOption, selectedfeature) => {
		setFeaturedict((featuredict) => ({ ...featuredict, [selectedfeature]: selectedOption }));
	}
	const setprioritybugsfeatures = async () => {
		const usertype = sessionStorage.getItem('Role');
		const username = sessionStorage.getItem('Username');
		const BugsDict = Object.fromEntries(
			Object.entries(bugsdict).filter(([key, value]) => value != "Select Priority")
		);
		const FeaturesDict = Object.fromEntries(
			Object.entries(featuredict).filter(([key, value]) => value !== "Select Priority")
		);
		console.log(Object.entries(BugsDict), Object.entries(FeaturesDict))
		if (Object.keys(BugsDict).length != 0 || Object.keys(FeaturesDict).length != 0) {
			contract2.methods.setbugfeaturePriority(Object.entries(BugsDict), Object.entries(FeaturesDict)).send({ from: account }).then(async (result) => {
				console.log(result);
				const receipt = await web3.eth.getTransactionReceipt(result.transactionHash);
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
						typeOfTransaction: `Set Priorities to Bugs And Features`
					},
					);
					console.log(res.data);
				}
				catch (error) {
					console.log(error);
				}
				props.showAlert(`Transaction was Successful with Transaction Hash ${result.transactionHash}.Gas Used : ${result.gasUsed}`, "success");
				window.location.reload()
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
						window.location.reload();
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
	}
	useEffect(() => {
	}, []);

	return (
		<>
			<br />
			<div className="container">
				<div className="text-center">
					<div>
						<div className="container">
							<div className=" d-flex align-items-end">
								<div className="dropdown row mx-auto">
									<select id="mySelect" className="form-control col-6" style={{fontWeight:'bold'}} value={select} onChange={handleOnChange}>
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

									<h2 >Bugs</h2>
									<br />
									{
										countBugs == 0 && select!='' && select != "Select Software" && (
											<>
											
												<b className="my-4" >
													No data available
												</b>
																							</>
										)
									}
									<ol className="bordered-list">
										{dataArray.map((data, dataIndex) => {
											return (
												<>
													<ul className="list-group">
														{data.bugspriority.map((label, labelIndex) => {
															if (label == '0' && data.environmentDetails == select) {
																return (
																	<>
																		<li className="align-items-center d-flex justify-content-between col-12 list-group-item form-control"  key={labelIndex}>{data.bugs[labelIndex]}</li>

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
									<h2 >
										Features
									</h2>
									<br />
									<ol className="bordered-list" >
										{
											countFeatures == 0 && select!='' && select != "Select Software" && (
												<>
													<b className="my-4" >
														No data available
													</b>
												</>
											)
										}
										{dataArray.map((data, dataIndex) => {
											return (
												//   <li key={dataIndex}>
												<>
													<ul className="list-group">
														{data.featurespriority.map((labelfeature, labelIndexfeature) => {
															if (labelfeature == 0 && data.environmentDetails == select) {
																return (
																	<>
																		<li className="align-items-center d-flex justify-content-between col-12 list-group-item form-control" key={labelIndexfeature}   >{data.features[labelIndexfeature]}</li>
																		<select className="col-12 list-group-item" name="selectePriority"  id="selectIndex"   onChange={(event) => {
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
								<button className="btn btn-dark "   style={{ backgroundColor: "" }} onClick={setprioritybugsfeatures}>
									<b>

									Label Bugs and
									Features
									</b>
									</button>
							</div>
						</div>
					</div>
				</div>
			</div>

		</>
	);
}
export default Labellerpriority;