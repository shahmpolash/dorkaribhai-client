import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../firebase.init';
import DashboardMenuForWorker from '../components/Shared/DashboardMenuForWorker';
import './Dashboard.css';

const CancelledWorkWorker = () => {
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
            <div className='worker-recent-work'>
                        <h2>My Recent Work</h2>
                        <table class="table w-full">

                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Client Name</th>
                                    <th>Work Title</th>
                                    <th>Your Amount</th>
                                    <th>Status</th>
                                    <th>Who Cancelled</th>
                                    
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    works.map(work => work.workerEmail === user?.email && work.workStatus === "Cancelled" && 
                                        <tr>
                                            <th>1</th>
                                            <td>{work.clientName}</td>
                                            <td>{work.workTitle}</td>
                                            <td>{work.amount} Tk.</td>
                                            <td>{work.workStatus}</td>
                                            <td>
                                                {work.whoCancelled === 'clientCancelled' && <>Client Cancelled</> }
                                                {work.whoCancelled === 'workerCancelled' && <>You Have Cancelled</> }
                                            </td>
                                            
                                        </tr>
                                    )
                                }


                            </tbody>
                        </table>
                        </div>
        </div>
    );
};

export default CancelledWorkWorker;