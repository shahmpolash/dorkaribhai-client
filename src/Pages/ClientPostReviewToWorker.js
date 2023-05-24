import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useParams } from 'react-router-dom';
import auth from '../firebase.init';

const ClientPostReviewToWorker = () => {
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
        const rate = event.target.rate.value;
        const buyerReviewPostedtoWorker = event.target.buyerReviewPostedtoWorker.value;
        const review = event.target.review.value;
        const clientPostReview = { rate, buyerReviewPostedtoWorker, review};
        const url = `http://localhost:5000/client-post-review/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(clientPostReview)
        })
            .then(res => res.json())
            .then(result => {
                navigate('/dashboard');

            })
    };

    return (
        <div>
            {
                work.clientEmail === user?.email &&
                <form onSubmit={handleClientPostReview}>
                    <input type="text" name="rate" id="" />
                    <input value='Yes' type="text" name="buyerReviewPostedtoWorker" id="" />
                    <textarea name="review" id="" cols="30" rows="10"></textarea>
                    <input className='btn btn-md' type="submit" value="Post Review" />
                </form>

            }

        </div>
    );
};

export default ClientPostReviewToWorker;