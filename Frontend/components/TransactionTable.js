import React, { useEffect, useState, useRef } from 'react'
import $, { data } from 'jquery';
import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const TransactionTable = () => {
    
    const Navigate = useNavigate();
    const tableRef = useRef(null);
    const [dataArray, setDataArray] = useState([]);
    const setTable = async () => {
        try {
            // api/getTransactionHistory;
            const usertype = sessionStorage.getItem('Role');
            const username = sessionStorage.getItem('Username');

            const response = await axios.get('http://localhost:3001/api/getTransactionHistory', {
                params: {
                    usertype: usertype,
                    username: username
                }
            }
            );
            setDataArray(response.data);
            console.log(response.data);
        }
        catch (error) {
            console.log(error);
        }
    }
    const formatDate = (value) => {

        const transactionTimeString = value; // Assuming data.TransactionTime is a string representing the transaction time
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
    }
    useEffect(() => {
        setTable();
    }, []);

    return (
       
        <div>
            <br /><br /><br />
            <div className='container-fluid'>
                {
                    dataArray.map((data, dataIndex) => {
                        return (
                            <>
                                <div className='container d-flex justify-content-center' onClick={() => {
                                    
                                        Navigate(`/${sessionStorage.getItem('Role')}/transactionHistory1`,{
                                            state:{
                                                data:data
                                            }
                                        })
                                }}>

                                    <div className="card  col-sm-12 col-md-11" style={{
                                        border: 'none',
                                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                                        // transition: 'box-shadow 0.3s ease-in-out',
                                        willChange: 'box-shadow',
                                        borderRadius: '10px',
                                        overflow: 'hidden'
                                    }} >
                                        <div className='card-header' style={{ borderRadius: '60px', border: 0 }}>

                                            <div className="mx-1 d-flex justify-content-between align-items-center">
                                                <div className='col-10'>
                                                    <b>Transaction Hash - </b>
                                                    <span>{data.transactionHash}</span>
                                                </div>
                                                <div className='mt-2 col-2 d-flex justify-content-end'>
                                                    <b>
                                                        {data.status ? (
                                                            <p style={{ color: "green" }}>Transaction Success</p>
                                                        ) : (
                                                            <p style={{ color: "red" }}>Transaction Failed</p>
                                                        )}
                                                    </b>
                                                </div>
                                            </div>
                                            <div className='d-flex'>
                                                <div>
                                                    <b className='mx-1'>
                                                        Ethers Used -
                                                    </b>
                                                    <b style={{ color: "red" }}>
                                                        {(data.gasUsed * 20000000000) / 10 ** 18}ETH
                                                    </b>
                                                </div>
                                                <div className='mx-5'>
                                                    <b>Transaction Time - </b>
                                                    <b style={{ color: "blue" }}>{formatDate(data.TransactionTime)}</b>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br />
                            </>
                        )
                    })
                }
            </div>
        </div>

    )
}

export default TransactionTable
