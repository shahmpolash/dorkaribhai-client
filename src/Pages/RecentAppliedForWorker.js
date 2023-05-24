import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../firebase.init';
import DashboardMenuForWorker from '../components/Shared/DashboardMenuForWorker';
import './Dashboard.css';

const RecentAppliedForWorker = () => {
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
        <div>

            <div className='container mx-auto bg-white overflow-x-auto p-12 rounded-lg mt-10'>
                {
                    workers.map(worker => worker.workerEmail === user?.email).length === 1 &&
                    <div class="overflow-x-auto">
                        <DashboardMenuForWorker></DashboardMenuForWorker>

                        <div className='recent-applied'>
                            <h2>Recent Applied</h2>
                            {
                                applies.filter(apply => apply.workerEmail === user?.email).length > 0 &&

                                <table class="table w-full">

                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Client Name</th>
                                            <th>Work Title</th>
                                            <th>Your Amount</th>
                                        </tr>
                                    </thead>
                                    {
                                            applies.map(apply => apply.workerEmail === user?.email &&
                                    <tbody>

                                        {
                                            works.map(work => work._id === apply.workId && work.workStatus === 'Open'  &&
                                            <tr>
                                                    <th>1</th>
                                                    <td>{apply.clientName}</td>
                                                    <td><Link to={`/work/${apply.workId}`}>{apply.workTitle}</Link></td>
                                                    <td>{apply.amount} Tk.</td>
                                                </tr>
                                            )
                                        }
                                                
                                           


                                    </tbody>
                                     ).reverse()
                                    }
                                </table>

                            }
                        </div>
                    </div>

                }


            </div>
        </div>
    );
};

export default RecentAppliedForWorker;