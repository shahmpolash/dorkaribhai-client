import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useParams } from 'react-router-dom';
import auth from '../firebase.init';

const WorkerPostReviewToClient = () => {
    const [user] = useAuthState(auth);
    const [work, setWork] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/work/${id}`)
            .then(res => res.json())
            .then(info => setWork(info))
    }, [work]);

    const handleClientPostReview = event => {
        event.preventDefault();
        const workerRate = event.target.workerRate.value;
        const workerReviewPostedtoClient = event.target.workerReviewPostedtoClient.value;
        const workerReview = event.target.workerReview.value;
        const workerPostReview = { workerRate, workerReviewPostedtoClient, workerReview};
        const url = `http://localhost:5000/worker-post-review/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(workerPostReview)
        })
            .then(res => res.json())
            .then(result => {
                navigate('/dashboard');

            })
    };

    return (
        <div>
            {
                work.workerEmail === user?.email &&
                <form onSubmit={handleClientPostReview}>
                    <input type="text" name="workerRate" id="" />
                    <input value='Yes' type="text" name="workerReviewPostedtoClient" id="" />
                    <textarea name="workerReview" id="" cols="30" rows="10"></textarea>
                    <input className='btn btn-md' type="submit" value="Post Review" />
                </form>

            }

        </div>
    );
};

export default WorkerPostReviewToClient;