import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../firebase.init';
import DashboardMenuForWorker from '../components/Shared/DashboardMenuForWorker';
import './Dashboard.css';

const RecentOfferReceived = () => {
    const [applies, setApplies] = useState([]);
    const [works, setWorks] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [user] = useAuthState(auth);



    useEffect(() => {
        fetch(`http://localhost:5000/applies-work`)
            .then(res => res.json())
            .then(data => setApplies(data))
    }, []);
    useEffect(() => {
        fetch(`http://localhost:5000/works`)
            .then(res => res.json())
            .then(data => setWorks(data))
    }, []);

    useEffect(() => {
        fetch(`http://localhost:5000/workerprofile?workerEmail=${user?.email}`)
            .then(res => res.json())
            .then(data => setWorkers(data))
    }, []);



    return (
        <div className='bg-white overflow-x-auto p-12 rounded-lg mt-10'>
            <DashboardMenuForWorker></DashboardMenuForWorker>
            <div>
                {
                    works.filter(work => work.workerEmail === user?.email && work.clientSentSelectionRequest === "Pending" && work.depositStatus === "Deposited").length > 0 &&
                    <div className='worker-work-pending'>
                        <h2>Your Pending Work</h2>
                        <table class="table w-full">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Client Name</th>
                                    <th>Work Title</th>
                                    <th>Action</th>
                                    <th>Your Amount</th>
                                    <th>Client Deposited</th>
                                    <th>Status</th>
                                    <th>Contact Us</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    works.map(work => work.workerEmail === user?.email && work.clientSentSelectionRequest === "Pending" && work.depositStatus === "Deposited" &&
                                        <tr>
                                            <th>1</th>
                                            <td>{work.clientName}</td>
                                            <td>{work.workTitle}</td>
                                            <td><Link className='btn btn-sm' to={`/accept/${work._id}`}>Accept or Cancell</Link></td>
                                            <td>{work.amount} Tk.</td>
                                            <td>{work.amount} Tk.</td>
                                            <td>{work.clientSentSelectionRequest}</td>
                                            <td><Link className='btn btn-sm'>Contact Client</Link></td>
                                        </tr>
                                    )
                                }


                            </tbody>
                        </table>
                    </div>
                }

            </div>
        </div>
    );
};

export default RecentOfferReceived;