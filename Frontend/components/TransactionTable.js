



import React, { useEffect, useState, useRef } from 'react';
import $ from 'jquery';
import 'jquery/dist/jquery.min.js';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TransactionTable = () => {
  const Navigate = useNavigate();
  const tableRef = useRef(null);
  const [dataArray, setDataArray] = useState([]);
  const setTable = async () => {
    try {
      const usertype = sessionStorage.getItem('Role');
      const username = sessionStorage.getItem('Username');

      const response = await axios.get('http://localhost:3001/api/getTransactionHistory', {
        params: {
          usertype: usertype,
          username: username
        }
      });

      setDataArray(response.data.reverse());
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    setTable();
  }, []);

  const [select, setSelect] = useState('');
  const handleOnChange = (e) => {
    setSelect(e.target.value);
  };

  const [searchDate, setSearchDate] = useState('');

  return (
    <div>
      <br /><br /><br />
      <div className='container-fluid'>
        <div className='container'>
          <div className="dropdown row mx-auto col-sm-12 col-md-4">
            <select
              id="mySelect"
              className="form-control col-6"
              style={{ fontWeight: 'bold' }}
              value={select}
              onChange={handleOnChange}
            >
              <option value="">Select Here</option>
              {/* <option value="Latest">Latest</option> */}
              <option value="1">Successful Transactions</option>
              <option value="0">Failed Transactions</option>
            </select>
            <br />
          </div>
        </div>
        <br /><br />
        <div className='container'>
          <div className='row mx-4'>
            <div className="input-group col-5">
              <input
                className="form-control col-5"
                id='SearchDate'
                placeholder="Search By Date"
                aria-label="Date"
                onChange={(e) => setSearchDate(e.target.value)}
                aria-describedby="basic-addon1"
              />
              <label htmlFor="Search" className='input-group-text'>
                <i id="Search" className="zmdi zmdi-search hc-2x"></i>
              </label>
            </div>
          </div>
        </div>
        <br /><br />
        {
          dataArray.map((data, dataIndex) => {
            // const currentDate = new Date();
            // const fiveDaysAgo = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 5);
            const transactionTime = new Date(data.TransactionTime);

            if (
              (data.status == select || select == '') &&
              // (select != 'Latest' || transactionTime >= fiveDaysAgo) &&
              (searchDate === '' || new Date(searchDate).toDateString() === transactionTime.toDateString() )
            ) {
              return (
                <React.Fragment key={dataIndex}>
                  <div
                    className='container d-flex justify-content-center'
                    onClick={() => {
                      Navigate(`/${sessionStorage.getItem('Role')}/transactionHistory1`, {
                        state: {
                          data: data
                        }
                      });
                    }}
                  >
                    <div
                      className="card  col-sm-12 col-md-11"
                      style={{
                        border: 'none',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                        willChange: 'box-shadow',
                        borderRadius: '10px',
                        overflow: 'hidden'
                      }}
                    >
                      <div className='card-header' style={{ borderRadius: '60px', border: 0 }}>
                        <div className="mx-1 d-flex justify-content-between align-items-center">
                          <div className='col-9'>
                            <b>Transaction Hash - </b>
                            <span>{data.transactionHash}</span>
                          </div>
                          <div className='mt-2 col-3 d-flex justify-content-end'>
                            <b>
                              {data.status == "true" || data.status == 1 ? (
                                <p style={{ color: "green" }}>Transaction Success</p>
                              ) : (
                                <p style={{ color: "red" }}>Transaction Failed</p>
                              )}
                            </b>
                          </div>
                        </div>
                        <div className='d-flex'>
                          <div>
                            <b className='mx-1'>Ethers Used -</b>
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
                </React.Fragment>
              );
            } else {
              return null;
            }
          })
        }
      </div>
    </div>
  );
};

export default TransactionTable;

