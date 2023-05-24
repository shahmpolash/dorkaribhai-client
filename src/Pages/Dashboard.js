import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../firebase.init';
import DashboardMenuForWorker from '../components/Shared/DashboardMenuForWorker';
import DashboardMenuForClient from '../components/Shared/DashboardMenuForClient';
import './Dashboard.css';

const Dashboard = () => {
    const [applies, setApplies] = useState([]);
    const [works, setWorks] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [clients, setClients] = useState([]);
    const [replies, setReplies] = useState([]);

    const [messages, setMessages] = useState([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        fetch(`http://localhost:5000/replies`)
            .then(res => res.json())
            .then(data => setReplies(data))
    }, []);



    useEffect(() => {
        fetch(`http://localhost:5000/messages`)
            .then(res => res.json())
            .then(data => setMessages(data))
    }, []);

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

    useEffect(() => {
        fetch(`http://localhost:5000/clientprofile?clientEmail=${user?.email}`)
            .then(res => res.json())
            .then(data => setClients(data))
    }, []);

    return (
        <div className='dashboard-bg'>

            <div className='flex w-ful justify-center items-center'>
                {
                    clients.filter(client => client.clientEmail === user?.email).length === 0 &&
                    <>
                        {
                            workers.filter(worker => worker.workerEmail === user?.email).length === 0 &&
                            <div><Link className='btn grid h-20 flex-grow card  rounded-box place-items-center' to='/create-client'>Update Your Profile as a Client</Link>
                                <div className="divider divider-horizontal">OR</div>

                                <Link className='btn grid h-20 flex-grow card  rounded-box place-items-center' to='/create-worker'>Update Your Profile as a Worker</Link>  </div>
                        } </>
                }


            </div>

            <div className='container-dashboard overflow-x-auto p-12 rounded-lg mt-10'>
                {
                    workers.map(worker => worker.workerEmail === user?.email).length === 1 &&
                    <div class="container mx-auto overflow-x-auto">
                        <DashboardMenuForWorker></DashboardMenuForWorker>
                        <div className='flex justify-center'>
                            <div className="stats shadow">

                                <div className="stat">
                                    <div className="stat-figure text-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                                    </div>
                                    <div className="stat-title">Total Likes</div>
                                    <div className="stat-value text-primary">25.6K</div>
                                    <div className="stat-desc">21% more than last month</div>
                                </div>

                                <div className="stat">
                                    <div className="stat-figure text-secondary">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                    </div>
                                    <div className="stat-title">Page Views</div>
                                    <div className="stat-value text-secondary">2.6M</div>
                                    <div className="stat-desc">21% more than last month</div>
                                </div>

                                <div className="stat">
                                    <div className="stat-figure text-secondary">
                                        <div className="avatar online">
                                            <div className="w-16 rounded-full">
                                            {
                                    workers.map(worker => worker.workerEmail === user?.email &&
                                        <div className='client-profile-img'>
                                            <img className='flex justify-center' src={worker.clientProfileImg} alt="" />
                                            
                                        </div>)
                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="stat-value">86%</div>
                                    <div className="stat-title">Tasks done</div>
                                    <div className="stat-desc text-secondary">31 tasks remaining</div>
                                </div>
                                <div className="stat">
                                    <div className="stat-figure text-secondary">
                                        <div className="avatar online">
                                            <div className="w-16 rounded-full">
                                            {
                                    workers.map(worker => worker.workerEmail === user?.email &&
                                        <div className='client-profile-img'>
                                            <img className='flex justify-center' src={worker.clientProfileImg} alt="" />
                                            
                                        </div>)
                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="stat-value">86%</div>
                                    <div className="stat-title">Tasks done</div>
                                    <div className="stat-desc text-secondary">31 tasks remaining</div>
                                </div>
                                <div className="stat">
                                    <div className="stat-figure text-secondary">
                                        <div className="avatar online">
                                            <div className="w-16 rounded-full">
                                            {
                                    workers.map(worker => worker.workerEmail === user?.email &&
                                        <div className='client-profile-img'>
                                            <img className='flex justify-center' src={worker.clientProfileImg} alt="" />
                                            
                                        </div>)
                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="stat-value">86%</div>
                                    <div className="stat-title">Tasks done</div>
                                    <div className="stat-desc text-secondary">31 tasks remaining</div>
                                </div>

                            </div>

                        </div>
                        <div className='client-cards'>
                            <div className='card-one w-96'>
                            {
                                    workers.map(worker => worker.workerEmail === user?.email &&
                                        <div className='client-profile-img'>
                                            <img className='flex justify-center' src={worker.clientProfileImg} alt="" />
                                            
                                        </div>)
                                }
                            </div>
                            <div className='card-two w-96'>
                                <p className='flex justify-center'>You have Completed</p>
                                <p className='text-2xl flex justify-center'>{works.filter(work => work.workerEmail === user?.email && work.clientSentSelectionRequest === "Accepted" && work.deliveryStatus === 'Accepted').length} Works</p>
                            </div>
                            <div className='card-three w-96'>
                                <div className="alert shadow-lg align-middle">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        <div>
                                            <h3 className="font-bold">New message!</h3>
                                            <div className="text-xs">You have <br></br>

                                                {
                                                    messages.filter(message => message.workerEmail === user?.email && message.whoSentMessage === 'Client' && message.messageFromClientToWorkerStatus === 'unRead').length + parseFloat(replies.filter(reply => reply.workerEmail === user?.email && reply.whoSentMessage === 'Client' && reply.messageFromClientToWorkerStatus === 'unRead').length)
                                                } unread message

                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-none">
                                        <Link to='/inbox' className="btn btn-sm">See</Link>
                                    </div>
                                </div>
                            </div>
                            <div className='card-four w-96'>
                                <p className='text-2xl flex justify-center'></p>
                            </div>
                        </div>


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
                                                <th>Contact</th>
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
                                                        <td>
                                                            <div className='btn'>{applies.map(apply => apply.workerEmail === user?.email && apply.workId === work._id &&
                                                                <Link to={`/worker-to-client/${apply._id}`} className='btn'>Contact
                                                                    <p className='text-red-400'>
                                                                        {messages.filter(
                                                                            message => message.workerEmail === user?.email && message.workId === apply.workId && message.whoSentMessage === 'Client' && message.messageFromClientToWorkerStatus === 'unRead').length}
                                                                    </p>
                                                                </Link>
                                                            )
                                                            }</div>
                                                        </td>
                                                    </tr>
                                                )
                                            }


                                        </tbody>
                                    </table>
                                </div>
                            }

                        </div>

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
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        works.map(work => work.workerEmail === user?.email && work.clientSentSelectionRequest === "Accepted" &&
                                            <tr>
                                                <th>1</th>
                                                <td>{work.clientName}</td>
                                                <td>{work.workTitle}</td>
                                                <td>{work.amount} Tk.</td>
                                                <td>{work.clientSentSelectionRequest}</td>
                                                <td><div className='btn'>{applies.map(apply => apply.workerEmail === user?.email && apply.workId === work._id &&
                                                    <Link to={`/worker-to-client/${apply._id}`} className='btn'>Contact
                                                        <p className='text-red-400'>
                                                            {messages.filter(
                                                                message => message.workerEmail === user?.email && message.workId === apply.workId && message.whoSentMessage === 'Client' && message.messageFromClientToWorkerStatus === 'unRead').length}
                                                        </p>
                                                    </Link>
                                                )
                                                }</div></td>
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
                                            </tr>
                                        )
                                    }


                                </tbody>
                            </table>
                        </div>
                        <div className='recent-applied'>
                            <h2>Recent Applied</h2>
                            <table class="table w-full">

                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Client Name</th>
                                        <th>Work Title</th>
                                        <th>Your Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        applies.map(apply => apply.workerEmail === user?.email &&
                                            <tr>
                                                <th>1</th>
                                                <td>{apply.clientName}</td>
                                                <td><Link to={`/work/${apply.workId}`}>{apply.workTitle}</Link></td>
                                                <td>{apply.amount} Tk.</td>
                                            </tr>
                                        ).reverse()
                                    }


                                </tbody>
                            </table>
                        </div>
                    </div>

                }

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
                                    <div className="alert shadow-lg align-middle">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                            <div>
                                                <h3 className="font-bold">New message!</h3>
                                                <div className="text-xs">You have <br></br>
                                                    {
                                                        messages.filter(message => message.clientEmail === user?.email && message.whoSentMessage === 'Worker' && message.messageFromWorkerToClientStatus === 'unRead').length + parseFloat(replies.filter(reply => reply.clientEmail === user?.email && reply.whoSentMessage === 'Worker' && reply.messageFromWorkerToClientStatus === 'unRead').length)
                                                    } unread message
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-none">
                                            <Link to='/inbox' className="btn btn-sm">See</Link>
                                        </div>
                                    </div>
                                </div>

                                <div className='card-four w-96'>
                                    <p className='text-2xl flex justify-center'></p>
                                </div>

                            </div>


                            <div className='client-work-pending'>
                                <h2 className='flex justify-center'>Your Pending Offers</h2>
                                <table class="table w-full">
                                    <thead>
                                        <tr>
                                            <th>Work Title</th>
                                            <th>Your Budget</th>
                                            <th>Action</th>
                                            <th>Selection Status</th>
                                            <th>-</th>
                                            <th>Total Applies</th>
                                            <th>Edit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            works.map(work => work.clientEmail === user?.email && work.clientSentSelectionRequest === "Pending" &&
                                                <tr>
                                                    <td><Link to={`/work/${work._id}`}>{work.workTitle}</Link></td>
                                                    <td>{work.workBudget} Tk.</td>
                                                    <td><Link to={`/work/${work._id}`} className='btn btn-sm'>Choose One</Link></td>
                                                    <td>{work.clientSentSelectionRequest}<br />
                                                        {work.clientSentSelectionRequest === "Pending" && <Link className='btn btn-sm' to={`/cancel/${work._id}`}>Cancel</Link>}
                                                    </td>
                                                    <td>{work.clientSentSelectionRequest === "Pending" &&
                                                        <>
                                                            {
                                                                applies.map(apply => apply.workId === work._id && work.workerId === apply.workerId &&
                                                                    <Link to={`/client-to-worker/${apply._id}`} className='btn btn-sm'>Contact</Link>
                                                                )}
                                                        </>
                                                    }
                                                    </td>
                                                    <td>{applies.filter(apply => apply.workId === work._id).length}</td>
                                                    <td><Link className='btn btn-sm' to="/">Edit</Link></td>
                                                </tr>
                                            )
                                        }

                                    </tbody>
                                </table>
                            </div>


                            <div className='client-work-open'>
                                <table class="table w-full">
                                    <thead>
                                        <tr>
                                            <th>Work Title</th>
                                            <th>Your Budget</th>
                                            <th>Action</th>
                                            <th>Selection Status</th>
                                            <th>Total Applies</th>
                                            <th>Edit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            works.map(work => work.clientEmail === user?.email && work.clientSentSelectionRequest === "No" && work.workStatus === 'Open' &&
                                                <tr>
                                                    <td><Link to={`/work/${work._id}`}>{work.workTitle}</Link></td>
                                                    <td>{work.workBudget} Tk.</td>
                                                    <td><Link to={`/work/${work._id}`} className='btn btn-sm'>Choose One</Link></td>
                                                    <td>{work.clientSentSelectionRequest} <br />
                                                        {work.clientSentSelectionRequest === "Pending" && <Link className='btn btn-sm' to={`/cancel/${work._id}`}>Cancel</Link>}
                                                    </td>
                                                    <td>{applies.filter(apply => apply.workId === work._id).length}</td>
                                                    <td><Link className='btn btn-sm' to="/">Edit</Link></td>
                                                </tr>
                                            )
                                        }

                                    </tbody>
                                </table>
                            </div>



                            <div className='recent-completed'>
                                <h2 className='flex justify-center'>My recent Workers</h2>
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
                                            works.map(work => work.clientEmail === user?.email && work.clientSentSelectionRequest === "Accepted" &&
                                                <tr>

                                                    <td><Link to={`/work/${work._id}`}>{work.workTitle}</Link></td>
                                                    <td>{work.workBudget} Tk.</td>
                                                    <td>{work.workerName}</td>
                                                    <td>
                                                        {
                                                            applies.map(apply => apply.workId === work._id && work.workerId === apply.workerId &&
                                                                <Link to={`/client-to-worker/${apply._id}`} className='btn btn-sm'>Contact</Link>
                                                            )}
                                                    </td>
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
        </div>
    );
};

export default Dashboard;