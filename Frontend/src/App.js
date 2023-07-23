// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import AdminsendsRequest from './Components/AdminsendsRequest';
import Labellerpriority from './Components/LabellerPriority';
import DevelopergetsRequest from './Components/DevelopergetsRequest';
import DeveloperCreatesPatch from './Components/DeveloperCreatesPatch';
import Verifier from './Components/Verifier';
import AdminDepolyPatches from './Components/AdminDepolyPatches';
import AdminTrackingPatches from './Components/AdminTrackingPatches';
import AdmingetsDownloadHistory from './Components/AdmingetsDownloadHistory';
import EndUsergetsUpdates from './Components/EndUsergetsUpdates';
import UserReportBugsFeatures from './Components/UserReportsBugsFeatures';
import AdminCard from './Components/AdminCard';
import LabellerCard from './Components/LabellerCard';
import DeveloperCard from './Components/DeveloperCard';
import VerifierCard from './Components/VerifierCard';
import EndUserCard from './Components/EndUserCard';
import InitialPage from './Components/InitialPage';
import LabelledBugsandFeatures from './Components/LabelledBugsandFeatures';
import DevelopergetsRejectedPatches from './Components/DevelopergetsRejectedPatches';
import VerifiedPatches from './Components/VerifiedPatches';
import UserReportBugsFeatures2 from './Components/UserReportsBugsFeatures2';
import SignUp from './Components/SignUp';

import Favicon from "react-favicon";
import Login from './Components/Login';
import LabellerSolvesUserFeedBack from './Components/LabellersolvesUserFeedBack';
import DeveloperSolvesRejectedPatches from './Components/DeveloperSolvesRejectedPatches';
import { useEffect, useState } from 'react';
import TransactionTable from './Components/TransactionTable';
import TransactionHistory from './Components/TransactionHistory';
import Alert from './Components/Alert';
import AdminTracksUndevelopedPatches from './Components/AdminTracksUndevelopedPatches';
import AboutUs from './Components/AboutUs';
import VerifierRejected from './Components/VerifierRejected';
import PageNotFound from './Components/PageNotFound';
function App(){
    const [Role, setRole] = useState("");
    const setRoleFunction = () => {
        const role = sessionStorage.getItem("Role");
        setRole(role);
        console.log(role);
    }
    const handleRole = (data) => {
        setRole(data);
        console.log(data);
    }

    const [alert, setAlert] = useState(null);
    const showAlert = (message, type) => {
        setAlert({
            msg: message,
            type: type
        })
        setTimeout(() => {
            setAlert(null)
        }, 3000);
    }
    useEffect(() => {
        setRoleFunction();
    }, []);
    return (
        <div >
            <Favicon url="https://designshack.net/wp-content/uploads/favicon-examples.png" />
            <div >
                <Router>

                    <Navbar />
                    <Alert alert={alert} />
                    {/* <TransactionTable/>      */}

                    <Routes>
                        {(Role === "" || Role === undefined) && (
                            <Route path="/Admin" element={<InitialPage />} />
                        )}
                        <Route path='/Aboutus' element={<AboutUs />} />
                        <Route path='/Signup' element={<SignUp showAlert={showAlert} />} />
                        <Route path='/Login' element={<Login role={handleRole} showAlert={showAlert} />} />
                        <Route path='/' element={<InitialPage />} />

                        <Route path='/Admin' element={<AdminCard />}>
                            <Route index element={<AdminsendsRequest showAlert={showAlert} />} />
                            <Route path="DeployPatches" element={<AdminDepolyPatches showAlert={showAlert} />} />
                            <Route path="TrackingPatches" element={<AdminTrackingPatches />} />
                            <Route path="TrackUndevelopedRequest" element={<AdminTracksUndevelopedPatches />} />
                            <Route path="getsDownloadHistory" element={<AdmingetsDownloadHistory />} />
                            <Route path='transactionHistory' element={<TransactionTable />} />
                            <Route path='transactionHistory1' element={<TransactionHistory />} />
                        </Route>

                        <Route path='/Developer' element={<DeveloperCard />}>
                            <Route index element={<DevelopergetsRequest />} />
                            <Route path='createsPatches' element={<DeveloperCreatesPatch showAlert={showAlert} />} />
                            <Route path='SolveRejectedPatches' element={<DeveloperSolvesRejectedPatches showAlert={showAlert} />} />
                            <Route path='transactionHistory' element={<TransactionTable />} />
                            <Route path='transactionHistory1' element={<TransactionHistory />} />
                            <Route path='Rejectedpatches' element={<DevelopergetsRejectedPatches />} />
                        </Route>
                        <Route path="/Verifier" element={<VerifierCard />}>
                            <Route index element={<Verifier showAlert={showAlert} />} />
                            <Route path='verified' element={<VerifiedPatches />} />
                            <Route path='VerifierRejected' element={<VerifierRejected />} />
                            <Route path='transactionHistory1' element={<TransactionHistory />} />
                            <Route path='transactionHistory' element={<TransactionTable />} />
                        </Route>

                        <Route path="/EndUser" element={<EndUserCard />}>
                            <Route path='getUpdates' element={<EndUsergetsUpdates />} />
                            <Route index element={<UserReportBugsFeatures2 showAlert={showAlert} />} />
                        </Route>
                        <Route path='/Labeller' element={<LabellerCard />}>
                            <Route index element={<Labellerpriority showAlert={showAlert} />} />
                            <Route path='transactionHistory' element={<TransactionTable />} />
                            <Route path='labelledBugsFeatures' element={<LabelledBugsandFeatures />} />
                            <Route path='transactionHistory1' element={<TransactionHistory />} />
                            <Route path='labellerSolvesUserFeedBack' element={<LabellerSolvesUserFeedBack showAlert={showAlert} />} />
                        </Route>

                        <Route path="*" element={<PageNotFound/>} />
                    </Routes>
                </Router>
                <br />
            </div>
        </div>
    );
}

export default App;
