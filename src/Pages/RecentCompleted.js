import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardMenuForClient from '../components/Shared/DashboardMenuForClient';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

const RecentCompleted = () => {
    const [clients, setClients] = useState([]);
    const [works, setWorks] = useState([]);
    const [applies, setApplies] = useState([]);
    const [user] = useAuthState(auth);


    useEffect(() => {
        fetch(`http://localhost:5000/works`)
            .then(res => res.json())
            .then(data => setWorks(data))
    }, []);
    useEffect(() => {
        fetch(`http://localhost:5000/clientprofile?clientEmail=${user?.email}`)
            .then(res => res.json())
            .then(data => setClients(data))
    }, []);
    useEffect(() => {
        fetch(`http://localhost:5000/applies-work`)
            .then(res => res.json())
            .then(data => setApplies(data))
    }, []);
    return (
        <div>
            {
                    clients.map(client => client.clientEmail === user?.email).length === 1 &&
                    <div className=' bg-slate-200'>
                        <DashboardMenuForClient></DashboardMenuForClient>
                        <div className="container mx-auto bg-white overflow-x-auto p-12 rounded-lg mt-10">
                            {
                                clients.map(client => client.clientEmail === user?.email &&
                                    <p className='text-2xl font-bold flex justify-center mb-6'>Hi {client.clientName}</p>)
                            }
                            <div className='client-cards'>
                                <div className='card-one w-96'>
                                    {
                                        clients.map(client => client.clientEmail === user?.email &&
                                            <div className='client-profile-img'>
                                                <img className='flex justify-center' src={client.clientProfileImg} alt="" />
                                                <p className='text-2xl flex justify-center text-white'>{client.clientName}</p>
                                            </div>)
                                    }
                                </div>
                                <div className='card-two w-96'>
                                    <p className='flex justify-center'>You have Total Open</p>
                                    <p className='text-2xl flex justify-center'>{works.filter(work => work.clientEmail === user?.email && work.clientSentSelectionRequest === "No" && work.workStatus === 'Open').length} Works</p>
                                </div>
                                <div className='card-three w-96'>
                                    <p className='text-2xl flex justify-center'></p>
                                </div>
                                <div className='card-four w-96'>
                                    <p className='text-2xl flex justify-center'></p>
                                </div>
                            </div>

                           <div className='recent-completed'>
                           <h2 className='flex justify-center'>Recent Completed</h2>
                            <table class="table w-full">
                                <thead>
                                    <tr>
                                        <th>Work Title</th>
                                        <th>Your Budget</th>
                                        <th>Selected Person</th>
                                        <th>Contact</th>
                                        <th>Action</th>
                                        <th>-</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        works.map(work => work.clientEmail === user?.email && work.deliveryStatus === "Accepted" &&
                                            <tr>

                                                <td><Link to={`/work/${work._id}`}>{work.workTitle}</Link></td>
                                                <td>{work.workBudget} Tk.</td>
                                                <td>{work.workerName}</td>
                                                <td><Link className='btn btn-sm' to="/">Contact</Link></td>
                                                <td>
                                                    {work.deliveryStatus === "Delivered" &&
                                                        <Link className='btn btn-sm' to={`/accept-cancel/${work._id}`}>Review & Accept Work</Link>}
                                                    {work.deliveryStatus === "Accepted" &&
                                                        <Link className='btn btn-sm'>You Have Accepted & Payment Was Released</Link>}
                                                </td>
                                                <td>

                                                    {work.deliveryStatus === "Accepted" && work.buyerReviewPostedtoWorker === 'No' &&
                                                        <Link className='btn btn-sm' to={`/review-to-worker/${work._id}`}>Write a Review</Link>}
                                                    {work.deliveryStatus === "Accepted" && work.buyerReviewPostedtoWorker === 'Yes' &&
                                                        <Link className='btn btn-sm' >You have left review</Link>}
                                                </td>
                                            </tr>
                                        )
                                    }

                                </tbody>
                            </table>       

                           </div>
                        </div>
                    </div>
                }
        </div>
    );
};

export default RecentCompleted;