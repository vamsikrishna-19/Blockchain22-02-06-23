
import React, { useState } from 'react';
// import Web3 from "web3";
// import Web3Contract1 from "./Web3Contract1";
import { useNavigate } from 'react-router-dom';
import Axios from "axios";

const UserReportBugsFeatures2 = () => {
    // const Web3 = Web3Contract1();
    // const contract = Web3[1];
    // const account = Web3[0];
    // console.log(contract);

    const Navigate = useNavigate();

    const [bugs, setBugs] = useState([""]);
    const [features, setFeatures] = useState([""]);
    const [environmentdetails, setEnvironmetDetails] = useState("");
    const addBug = () => {
        setBugs((prevBugs) => [...prevBugs, '']);
    };
    const addFeature = () => {
        setFeatures((prevFeatures) => [...prevFeatures, '']);
    };
    const deleteBug = (value, index) => {
        setBugs((prevbugs) =>
            prevbugs.filter((name, indexCurrent) =>
                name === value && indexCurrent === index ? false : true
            )
        );
    }
    const deleteFeature = (value, index) => {
        setFeatures((prevfeatures) => prevfeatures.filter((name, indexCurrent) =>
            name === value && indexCurrent === index ? false : true
        )
        )
    }
    const sendfeedback = () => {

        // contract.methods
        //     .feedbacks(bugs, features, environmentdetails)
        //     .send({ from: account })
        //     .then((result) => {
        //         console.log(result);

        //     });
        const data = {
            Software: environmentdetails,
            Bugs: bugs,
            Features: features
        }
        console.log(data)
        try {
            
            Axios.post("http://localhost:3001/Report", data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            setBugs([""]);
            setFeatures([""]);
            setEnvironmetDetails("");

        }
        catch (error) {
            console.log("Error Uploading data");
        }
    };
    const handleSelect = (e) => {
        setEnvironmetDetails(e.target.value)
    }
    const handleBugChange = (index, value) => {
        const updatedBugs = [...bugs];
        updatedBugs[index] = value;
        setBugs(updatedBugs);
    };
    const handleFeatureChange = (index, value) => {
        const updatedFeatures = [...features];
        updatedFeatures[index] = value;
        setFeatures(updatedFeatures);
    };

    return (
        <div className='container col-6'>


        


            <div className="row mb-4 my-4 align-items-end">
                <br /><br />
                <label for="environmentdetails1" className="col-lg-3">
                    <h3 id="environmentdetails1"> Applications:</h3>
                </label>
                <div className="col-12 col-lg-12 ">
                    <div className="form-group">
                        <select
                            id="environmentdetails"
                            value={environmentdetails}
                            className="form-control col-6"
                            onChange={handleSelect}
                        >
                            <option selected>
                                Select Software
                            </option>
                            <option value="Windows11">Windows11</option>
                            <option value="Windows10">Windows10</option>
                            <option value="Mac12">Mac12</option>
                            <option value="Mac11">Mac11</option>
                        </select>
                    </div>
                </div>
            </div>
            <h3>Bugs:</h3>
            {bugs.map((bug, index) => (
                <div className="input-group " key={index}>
                    <textarea className="form-control col-12 col-lg-6 input mb-3"
                        placeholder="Enter Bug"
                        value={bug}
                        onChange={(e) => handleBugChange(index, e.target.value)}>
                        <div className='input-group mb-3'>
                        </div>
                    </textarea>
                    <button
                        className="btn btn-outline-primary input-group-text mb-3"
                        type="button"
                        onClick={() => addBug()}
                    >
                        +
                    </button>
                    <button
                        className="btn btn-outline-danger input-group-text mb-3"
                        type="button"
                        onClick={() => deleteBug(bug, index)}
                    >
                        -
                    </button>
                </div>
            ))}
            <br /> <br />
            <h3>Features:</h3>
            {features.map((feature, index) => (
                <div className="input-group " key={index}>
                    <textarea
                        className="form-control col-12 col-lg-6 input mb-3"
                        placeholder="Enter Feature"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}>
                        <div className='input-group mb-3'>
                        </div>
                    </textarea>
                    <button
                        className="btn btn-outline-primary input-group-text mb-3"
                        type="button"
                        onClick={addFeature}
                    >
                        +
                    </button>
                    <button
                        className="btn btn-outline-danger input-group-text mb-3"
                        type="button"
                        onClick={() => deleteFeature(feature, index)}
                    >
                        -
                    </button>

                </div>

            ))}
            <div className="row mb-3">
                <div className="col-12 col-lg-6 mx-auto">
                    <div>
                        <div
                            className="btn btn-dark"
                            onClick={sendfeedback}
                            type="submit"
                        >
                            Submit
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default UserReportBugsFeatures2;
