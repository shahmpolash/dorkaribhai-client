import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useParams } from 'react-router-dom';
import auth from '../firebase.init';

const DeliverNow = () => {
    const [user] = useAuthState(auth);
    const [work, setWork] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/work/${id}`)
            .then(res => res.json())
            .then(info => setWork(info))
    }, [work]);

    const handleDelivery = event => {
        event.preventDefault();
        const messageToClientFromWorker = event.target.messageToClientFromWorker.value;
        const deliveryStatus = event.target.deliveryStatus.value;
        const delivery = { messageToClientFromWorker, deliveryStatus};
        const url = `http://localhost:5000/delivery/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(delivery)
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
                <form onSubmit={handleDelivery}>
                <textarea name="messageToClientFromWorker" id="" cols="30" rows="10"></textarea>
                <input value='Delivered' type="text" name="deliveryStatus" id="" />
                <input className='btn btn-lg' type="submit" value="Deliver Now" />
            </form>
            }
            
        </div>
    );
};

export default DeliverNow;