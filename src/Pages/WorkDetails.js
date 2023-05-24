import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate, useParams } from 'react-router-dom';
import auth from '../firebase.init';
import './WorkDetails.css';

const WorkDetails = () => {
    const { id } = useParams();
    const [work, setWork] = useState([]);

    const [applies, setApplies] = useState([]);


    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const [worker, setWorker] = useState([]);
    const [works, setWorks] = useState([]);
    const [client, setClient] = useState([]);

    
    useEffect(() => {
        fetch(`http://localhost:5000/clientprofile?clientEmail=${user?.email}`)
            .then(res => res.json())
            .then(data => setClient(data))
    }, []);

    useEffect(() => {
        fetch(`http://localhost:5000/works`)
            .then(res => res.json())
            .then(data => setWorks(data))
    }, []);

    useEffect(() => {
        fetch(`http://localhost:5000/workerprofile?workerEmail=${user?.email}`)
            .then(res => res.json())
            .then(data => setWorker(data))
    }, []);

    useEffect(() => {
        fetch(`http://localhost:5000/work/${id}`)
            .then(res => res.json())
            .then(info => setWork(info))
    }, [work]);

    useEffect(() => {
        fetch(`http://localhost:5000/applies-work`)
            .then(res => res.json())
            .then(data => setApplies(data))
    }, []);



    const handleApplyWork = event => {
        event.preventDefault();
        const clientSentSelectionRequest = event.target.clientSentSelectionRequest.value;
        const workerName = event.target.workertName.value;
        const workerId = event.target.workerId.value;
        const workerProfileImg = event.target.workerProfileImg.value;
        const workerEmail = event.target.workerEmail.value;
        const clientName = event.target.clientName.value;
        const clientProfileImg = event.target.clientProfileImg.value;
        const clientId = event.target.clientId.value;
        const clientEmail = event.target.clientEmail.value;
        const amount = event.target.amount.value;
        const workTitle = event.target.workTitle.value;
        const workId = event.target.workId.value;
        const workerProposal = event.target.workerProposal.value;


        const applyWork = { clientSentSelectionRequest, workerName, workerId, workerProfileImg, workerEmail, clientName, clientProfileImg, clientId, clientEmail, amount, workTitle, workId, workerProposal };

        const url = `http://localhost:5000/apply-work`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(applyWork)
        })
            .then(res => res.json())
            .then(result => {
                navigate('/');
            })
    };

    return (
        <div>
            <div className="hero min-h-fit">
                <div className="hero-content">
                    <div>
                        <h1 className="text-5xl font-bold m-10">{work.workTitle}</h1>
                        <div className='work-card'>
                            <div className='budget'>
                                <h2>Budget: {work.workBudget}</h2>
                            </div>
                            <div className='delivery'>
                                <h2>Delivery: In 5 Days</h2>
                            </div>
                            <div className='delivery-2'>
                                <h2>Delivery: In 5 Days</h2>
                            </div>
                        </div>
                        <p className="py-6">{work.workDetails}</p>
                        <div className="card min-w-full w-96 bg-base-100 shadow-xl">
                            <div className="card-body items-center">
                                <h2 className="card-title">Apply Now</h2>
                                <div className="max-w-md">
                                    {
                                        worker.filter(w => w.workerEmail === user?.email).length === 1 &&

                                        <>
                                        {
                                            work.workStatus === 'Open' &&
                                            <form onSubmit={handleApplyWork}>
                                            <input hidden value="No" type="text" name="clientSentSelectionRequest" id="" />
                                            {
                                                worker.map(w => w.workerEmail === user?.email &&
                                                    <input hidden value={w.workerName} type="text" name="workertName" id="" />
                                                )
                                            }
                                            {
                                                worker.map(w => w.workerEmail === user?.email &&
                                                    <input hidden value={w._id} type="text" name="workerId" id="" />
                                                )
                                            }

                                            {worker.map(w => w.workerEmail === user?.email &&
                                                <input hidden value={w.workerProfileImg} type="text" name="workerProfileImg" id="" />
                                            )
                                            }
                                            {worker.map(w => w.workerEmail === user?.email &&
                                                <input hidden value={w.workerEmail} type="text" name="workerEmail" id="" />
                                            )
                                            }
                                            <input hidden value={work.clientName} type="text" name="clientName" id="" />
                                            <input hidden value={work.clientProfileImg} type="text" name="clientProfileImg" id="" />
                                            <input hidden value={work.clientId} type="text" name="clientId" id="" />
                                            <input hidden value={work.clientEmail} type="text" name="clientEmail" id="" />
                                            <input hidden value={work.workTitle} type="text" name="workTitle" id="" />
                                            <input hidden value={work._id} type="text" name="workId" id="" /> <br /> <br />
                                            <textarea required name="workerProposal" type="text" cols="50" rows="50" placeholder="Type here" className="textarea textarea-bordered textarea-lg w-full " />

                                            <input required type="number" name="amount" placeholder="Amount" className="input input-bordered input-md mt-5" />

                                            
                                                    {
                                                        applies.filter(apply => apply.workId === work._id && apply.workerEmail === user?.email).length === 1 &&
                                                        <input className='btn min-w-full' disabled type="submit" value="You Have Already Applied" />
                                                    }
                                                    {
                                                        applies.filter(apply => apply.workId === work._id && apply.workerEmail === user?.email).length === 0 &&
                                                        <input className='btn btn-primary' type="submit" value="Apply This Work Now" />
                                                    }



                                        </form>
                                        }
                                        </>

                                    }
                                    
                                    {
                                        work.workStatus === 'Open' &&
                                        <>
                                        {
                                            client.filter(c=> c.clientEmail === user?.email).length === 0 && 
                                            <div>
                                                {
                                            worker.filter(w => w.workerEmail === user?.email).length === 0 &&

                                            <Link className='btn btn-primary' to="/create-worker">Please Update Your Profile</Link>
                                        }
                                            </div>
                                        }
                                        
                                        </>
                                    }

                                </div>
                            </div>
                        </div>

                    </div>
                    <div>

                        <div className="card w-96 bg-base-100 shadow-xl">
                            <figure className="px-10 pt-10">
                                <img src={work.clientProfileImg} alt="profile" className="rounded-xl" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">{work.clientName}</h2>

                                <div className="card-actions">
                                    <button className="btn btn-primary">View Profile</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="container mx-auto">
                <table class="table w-full">

                    <thead>
                        <tr>

                            <th>Name</th>
                            <th>Message</th>
                            <th>Amount</th>
                            {
                                work.clientEmail === user?.email &&
                                <th>Action</th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            applies.map(apply => apply.workId === work._id &&
                                <tr className='workers'>
                                    <td>
                                        <div class="flex items-center space-x-3">
                                            <div class="avatar">
                                                <div class="mask mask-squircle w-12 h-12">
                                                    <img src={apply.workerProfileImg} alt="" />
                                                </div>
                                            </div>
                                            <div>
                                                <div class="font-bold"><Link to={`/worker/${apply.workerId}`}>{apply.workerName}</Link></div>
                                                <div>Reviews {
                                                    works.filter(work => work.workerId === apply.workerId && work.buyerReviewPostedtoWorker === 'Yes').length
                                                }</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {apply.workerProposal}
                                        <br />
                                    </td>
                                    <td>{apply.amount} Taka</td>
                                    {
                                        work.clientEmail === user?.email &&
                                        <th>

                                            {
                                                work.clientSentSelectionRequest === "Pending" && work.workerEmail === apply.workerEmail &&
                                                <Link className='btn btn-sm'>Selection Pending</Link>

                                            }
                                            <br></br>
                                            {
                                                work.clientSentSelectionRequest === "Pending" && work.workerEmail === apply.workerEmail &&
                                                <Link className='btn btn-sm' to={`/cancel/${work._id}`}>Cancel</Link>

                                            }
                                            {
                                                work.clientSentSelectionRequest === "Accepted" && work.workerEmail === apply.workerEmail &&
                                                <Link className='btn btn-sm'>Already Accepted</Link>
                                            }

                                            {
                                                work.clientSentSelectionRequest === "No" &&
                                                <Link to={`/select/${apply._id}`} className='btn btn-sm'>Select</Link>
                                            }
                                            {
                                                applies.map(apply=> apply.workId === work._id) &&
                                                <Link to={`/client-to-worker/${apply._id}`} className='btn btn-sm'>Contact Now</Link>
                                            }
                                           
                                        </th>
                                    }
                                </tr>

                            )
                        }


                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default WorkDetails;