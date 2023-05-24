import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useParams } from 'react-router-dom';
import auth from '../firebase.init';

const AcceptOrCancelDelivery = () => {
    const [user] = useAuthState(auth);
    const [work, setWork] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/work/${id}`)
            .then(res => res.json())
            .then(info => setWork(info))
    }, [work]);

    const handleAcceptDelivery = event => {
        event.preventDefault();
        const clientPaidToWorker = event.target.clientPaidToWorker.value;
        const workStatus = event.target.workStatus.value;
        const refundStatus = event.target.refundStatus.value;
        const PaymentTransferStatus = event.target.PaymentTransferStatus.value;
        const deliveryStatus = event.target.deliveryStatus.value;
        const releasedAmount = event.target.releasedAmount.value;
        const buyerReviewPostedtoWorker = event.target.buyerReviewPostedtoWorker.value;
        const workerReviewPostedtoClient = event.target.workerReviewPostedtoClient.value;
        const clientacceptdelivery = { clientPaidToWorker, workStatus, refundStatus, PaymentTransferStatus, deliveryStatus, buyerReviewPostedtoWorker,workerReviewPostedtoClient, releasedAmount };
        const url = `http://localhost:5000/accept-delivery/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(clientacceptdelivery)
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
                <form onSubmit={handleAcceptDelivery}>
                    <input value='Accepted' type="text" name="deliveryStatus" id="" />
                    <input value='Finished' type="text" name="workStatus" id="" />
                    <input value='PaymentPending' type="text" name="PaymentTransferStatus" id="" />
                    <input value='NA' type="text" name="refundStatus" id="" />
                    <input value='Yes' type="text" name="clientPaidToWorker" id="" />
                    <input value={work.amount} type="text" name="releasedAmount" id="" />
                    <input value='No' type="text" name="buyerReviewPostedtoWorker" id="" />
                    <input value='No' type="text" name="workerReviewPostedtoClient" id="" />
                    <input className='btn btn-md' type="submit" value="Accept Delivery & Release Payment" />
                </form>

            }

        </div>
    );
};

export default AcceptOrCancelDelivery;