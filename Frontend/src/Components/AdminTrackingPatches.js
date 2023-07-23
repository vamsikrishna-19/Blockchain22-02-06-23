import React, { useState, useEffect, useRef } from 'react';
import Web3Contract2 from './Web3Contract2';
import ConnectMetaMask from './ConnectMetaMask';

// import { Icon } from '@material-ui/core';
import $ from 'jquery';
import 'jquery/dist/jquery.min.js';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import './AdminTrackingPatches2.css';

const AdminTrackingPatches = () => {
  const tableRef = useRef(null);
  const Web3Contract = Web3Contract2();
  const contract2 = Web3Contract[0];
  const Account = ConnectMetaMask();
  const account = Account[0];
  const [dataArray, setdataArray] = useState([]);
  const [ObjectPatchImportance, setObjectPatchImportance] = useState([]);
  const getdata = () => {
    try {
      contract2.methods.getdetails().call().then((result) => {
        setdataArray(result);
        console.log(result);
      });
      contract2.methods.getImportance().call().then((result) => {
        console.log(result);
        result.forEach(item => {
          setObjectPatchImportance(prevState => ({
            ...prevState,
            [item.patchname]: item.crutiality
          }));
        });

      });
    } catch (error) {
      console.log(error);
    }
  };

  const setTime = (timestamp) => {
    const milliseconds = Number(timestamp) * 1000;
    const dateObject = new Date(milliseconds);
    const formattedTime = dateObject.toLocaleString();
    return formattedTime;
  };

  const [activePopover, setActivePopover] = useState(null);

  const togglePopover = (dataIndex) => {
    setActivePopover(activePopover === dataIndex ? null : dataIndex);
  };

  const isPopoverActive = (dataIndex) => {
    return activePopover === dataIndex;
  };

  useEffect(() => {
    getdata();
  }, [contract2]);

  useEffect(() => {
    setTimeout(() => {

      if (dataArray.length > 0) {
        $(function () {
          $(tableRef.current).DataTable();
        });
      }
    }, 1000)
  }, [dataArray]);

  return (
    <div className="container">
      <br /><br /><br />
      <div className="text-center">
        <div className="table-responsive">
          <table
            id="table1"
            className="table table-striped table-bordered"
            ref={tableRef}
          >
            <thead className="thead-dark">
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Request No</th>
                <th scope="col">Patch Name</th>
                <th scope="col">Patch Significance</th>
                <th scope="col">Patch Version</th>
                <th scope="col">Patch Platform</th>
                <th scope="col">Patch Features</th>
                <th scope="col">Registered Time</th>
                <th scope="col">Verification Status</th>
                <th scope="col">Deployment Status</th>
              </tr>
            </thead>
            <tbody id="tbody">
              {dataArray.map((data, dataIndex) => (
                <tr key={dataIndex}>
                  <td>{dataIndex + 1}</td>
                  <td>Request No: {Number(data.requestnumber)}</td>
                  <td>{data.patchname}</td>

                  {
                    ObjectPatchImportance[data.patchname] == "High" && (
                      <>
                        <td style={{ color: "#FF00FF" }}>
                          {
                            ObjectPatchImportance[data.patchname]
                          }
                        </td>
                      </>

                    )
                  }
                  {
                    ObjectPatchImportance[data.patchname] == "Critical" && (
                      <>
                        <td style={{ color: "red" }}>
                          {
                            ObjectPatchImportance[data.patchname]
                          }
                        </td>
                      </>

                    )
                  }
                  {
                    ObjectPatchImportance[data.patchname] == "Medium" && (
                      <>
                        <td style={{ color: "yellow" }}>
                          {
                            ObjectPatchImportance[data.patchname]
                          }
                        </td>
                      </>

                    )
                  }
                  {
                    ObjectPatchImportance[data.patchname] == "Low" && (
                      <>
                        <td style={{ color: "blue" }}>
                          {
                            ObjectPatchImportance[data.patchname]
                          }
                        </td>
                      </>

                    )
                  }
                  <td>{Number(data.version)}</td>
                  <td>{data.patchplatform}</td>
                  <td>{data.patchfeatures}</td>
                  <td>{setTime(data.time)}</td>
                  <td className=''>
                    {data.verificationstatus}
                    {data.verificationstatus === 'Rejected' && (
                      <div className="icon-container">
                        <div
                          className="checkbox-icon mt-2"
                          style={{
                            display: 'inline-block',
                            width: '30px', // Increase the width as needed
                            height: '35px',
                            borderRadius: '4px',
                            backgroundColor: '#FFF',
                            padding: '6px',

                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                            cursor: 'pointer',
                          }}
                          onClick={() => togglePopover(dataIndex)}
                        >
                          <i className="zmdi zmdi-info" style={{ color: '#FF5722' }}></i>
                        </div>
                        {/* <i className="material-icons-sharp" style={{ color: 'red', cursor: 'pointer' }}
                          onClick={() => togglePopover(dataIndex)}>
                          info
                        </i> */}
                        {isPopoverActive(dataIndex) && (
                          <div className="custom-popover">
                            <div className="custom-popover-content">
                              <b>Patch Rejected due to</b>
                              <p>{data.rejectdescription}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </td>
                  <td>{data.deploymentstatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminTrackingPatches;

