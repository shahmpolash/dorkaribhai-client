import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './WorkDetails.css';

const WorkerProfile = () => {
    const [worker, setWorker] = useState([]);
    const { id } = useParams();
    const [works, setWorks] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/works`)
            .then(res => res.json())
            .then(data => setWorks(data))
    }, []);



    useEffect(() => {
        fetch(`http://localhost:5000/worker/${id}`)
            .then(res => res.json())
            .then(data => setWorker(data))
    }, [worker]);

    return (
        <div>

            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="card w-96 bg-base-100 shadow-xl">
                        <figure className="px-10 pt-10">
                            <img src={worker.workerProfileImg} />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{worker.workerName}</h2>

                            <div className="card-actions">
                                <button >Total Reviews {works.filter(work => work.workerId === worker._id && work.buyerReviewPostedtoWorker === 'Yes').length}</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-5xl font-bold">About {worker.workerName}</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>

            

            <div className="overflow-x-auto w-full container mx-auto">
            <h2 className='text-5xl font-bold'>Reviews</h2>
                <table className="table w-full">
                   
                    <tbody>
                    {
                works.map(work => work.workerId === worker._id && work.buyerReviewPostedtoWorker === 'Yes' &&
                        <tr>
                            <td>
                                <div className="flex items-center space-x-3 review">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={work.clientProfileImg} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{work.clientName}</div>
                                    </div>
                                </div>
                            </td>
                            <td>{work.review} </td>
                        </tr>
                )}
                        
                        
                    </tbody>
                  

                </table>
            </div>
        </div>
    );
};

export default WorkerProfile;