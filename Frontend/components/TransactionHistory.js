import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const TransactionHistory = () => {
    const Navigate = useNavigate();
    const location = useLocation();
    const state = location.state;
    console.log(state);
    // const history = useHistory();
    const formatDate = (value) => {
        const transactionTimeString = value;
        const transactionTime = new Date(transactionTimeString);

        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };

        return transactionTime.toLocaleDateString('en-US', options);
    };
    // const handleGoBack = () => {
    //     history.goBack();
    //   };
    return (
        <div>
            <br />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title text-center mb-4">
                                    <b>Transaction Details</b>
                                </h4>
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        <p className="card-text">
                                            <h5>
                                                <b>Block No:</b> {state.data.blockNumber}
                                            </h5>
                                        </p>
                                        <p className="card-text">
                                            <h5>
                                                <b>Transaction Hash:</b>
                                            </h5>
                                            {state.data.transactionHash}
                                        </p>
                                        <p className="card-text">
                                            <h5>
                                                <b>From address:</b>
                                            </h5>
                                            {state.data.from}
                                        </p>
                                        <p className="card-text">
                                            <h5>
                                                <b>To address:</b>
                                            </h5>
                                            {state.data.to}
                                        </p>
                                        <p className="card-text">
                                            <h5>
                                                <b>Purpose:</b>
                                            </h5>

                                            {state.data.typeOfTransaction}
                                        </p>

                                    </div>
                                    <div className="col-12 col-md-6">
                                        <p className="card-text text-md-end">
                                            <h5>
                                                <b>Status:</b>{' '}
                                                {state.data.status ? (
                                                    <span className="" style={{ color: 'green' }}>
                                                        Transaction Success
                                                    </span>
                                                ) : (
                                                    <span className="" style={{ color: 'red' }}>
                                                        Transaction Failed
                                                    </span>
                                                )}
                                            </h5>
                                        </p>
                                        <p className="card-text text-md-end d-flex justify-content-end align-items-center">
                                            <h5 className='mx-2'>
                                                <b>Gas used:</b>
                                            </h5>
                                            {/* <span style={{color:"yellowred"}}>

                                            {state.data.gasUsed}
                                            </span> */}
                                            <span style={{ backgroundImage: 'linear-gradient(to right, red, yellow)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                                {state.data.gasUsed}
                                            </span>

                                        </p>
                                        <p className="card-text text-md-end d-flex justify-content-end align-items-center">
                                            <h5 className='mx-2'>
                                                <b>Ethers spent:</b>{' '}
                                            </h5>
                                            <span style={{ color: "red" }}>

                                                {(state.data.gasUsed * 20000000000) / 10 ** 18} ETH
                                            </span>
                                        </p>
                                        <p className="card-text text-md-end">
                                            <h5>
                                                <b>Transaction Time:</b>{' '}
                                            </h5>
                                            <span style={{ color: "blue" }}>

                                                {formatDate(state.data.TransactionTime)}
                                            </span>
                                        </p>

                                    </div>
                                    {/* <div className="mt-4 d-flex justify-content-end">
                                        <button
                                            className="btn btn-dark d-flex"
                                            onClick={
                                                // handleGoBack()
                                                Navigate(`/${sessionStorage.getItem("Role")}/transactionHistory`)
                                            }
                                        >
                                            Go Back
                                        </button>
                                    </div> */}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionHistory;
