import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../firebase.init';
import DashboardMenuForWorker from '../components/Shared/DashboardMenuForWorker';
import './Dashboard.css';

const RecentCompletedWorker = () => {
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
                            <th>Contact</th>
                            <th>Action</th>
                            <th>Review</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            works.map(work => work.workerEmail === user?.email && work.clientSentSelectionRequest === "Accepted" && work.deliveryStatus === 'Accepted' &&
                                <tr>
                                    <th>1</th>
                                    <td>{work.clientName}</td>
                                    <td>{work.workTitle}</td>
                                    <td>{work.amount} Tk.</td>
                                    <td>{work.clientSentSelectionRequest}</td>
                                    <td><Link className='btn btn-sm'>Contact Client</Link></td>
                                    {work.deliveryStatus === "NotDelivered" &&
                                        <td><Link className='btn btn-sm' to={`/deliver-now/${work._id}`}>Deliver Now</Link></td>}
                                    {work.deliveryStatus === "Delivered" &&
                                        <td><Link className='btn btn-sm'>You Have Delivered</Link>
                                        </td>}
                                    {work.deliveryStatus === "Accepted" && work.PaymentTransferStatus === "PaymentPending" &&
                                        <td><Link className='btn btn-sm'>Client Accepted & {work.amount} tk Pending Transfer</Link>
                                        </td>
                                    }
                                    {work.deliveryStatus === "Accepted" && work.PaymentTransferStatus === "PaymentTransferred" &&
                                        <td><Link className='btn btn-sm'>{work.amount} tk Transferred to your bKash</Link>
                                        </td>
                                    }
                                    <td>

                                        {work.deliveryStatus === "Accepted" && work.workerReviewPostedtoClient === 'No' &&
                                            <Link className='btn btn-sm' to={`/review-to-client/${work._id}`}>Write a Review</Link>}
                                        {work.deliveryStatus === "Accepted" && work.workerReviewPostedtoClient === 'Yes' &&
                                            <Link className='btn btn-sm' >You have left review</Link>}
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

export default RecentCompletedWorker;