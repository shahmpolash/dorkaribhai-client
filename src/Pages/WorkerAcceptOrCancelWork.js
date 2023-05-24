import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useParams } from 'react-router-dom';
import auth from '../firebase.init';

const WorkerAcceptOrCancelWork = () => {
    const [user] = useAuthState(auth);
    const { id } = useParams();
    const navigate = useNavigate();
    const [work, setWork] = useState([]);


    useEffect(() => {
        fetch(`http://localhost:5000/work/${id}`)
            .then(res => res.json())
            .then(info => setWork(info))
    }, [work]);

    const hancleAccept = event => {
        event.preventDefault();
        const clientSentSelectionRequest = event.target.clientSentSelectionRequest.value;
        const workStatus = event.target.workStatus.value;
        const workerAccepted = event.target.workerAccepted.value;
        const deliveryStatus = event.target.deliveryStatus.value;
        const accepted = { clientSentSelectionRequest, workStatus, workerAccepted, deliveryStatus};
        const url = `http://localhost:5000/accept-work/${work._id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(accepted)
        })
            .then(res => res.json())
            .then(result => {
                navigate('/dashboard');

            })
    };

    const hancleCancel = event => {
        event.preventDefault();
        const clientSentSelectionRequest = event.target.clientSentSelectionRequest.value;
        const workStatus = event.target.workStatus.value;
        const whoCancelled = event.target.whoCancelled.value;
        const clientPaidToWorker = event.target.clientPaidToWorker.value;
        const refundStatus = event.target.refundStatus.value;
        const cancelled = { clientSentSelectionRequest, workStatus, whoCancelled, clientPaidToWorker, refundStatus};
        const url = `http://localhost:5000/cancel-work/${work._id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(cancelled)
        })
            .then(res => res.json())
            .then(result => {
                navigate('/dashboard');

            })
    };

    return (
        <div className='flex h-screen justify-center items-center'>
            <div>
            <div>
                {
                    work.clientSentSelectionRequest === "Pending" && work.workerEmail === user?.email &&
                    <div>
                        <form onSubmit={hancleAccept}>
                            <input hidden value="Accepted" type="text" name="clientSentSelectionRequest" id="" />
                            <input hidden value="Accepted" type="text" name="workStatus" id="" />
                            <input hidden value="workerAccepted" type="text" name="workerAccepted" id="" />
                            <input hidden value="NotDelivered" type="text" name="deliveryStatus" id="" />
                            <input className='btn btn-green' type="submit" value="Accept Work Now" />
                        </form>
                    </div>
                }

            </div>
            <div class="divider">OR</div>
            <div>
                {
                    work.clientSentSelectionRequest === "Pending" && work.workerEmail === user?.email &&
                    <div>
                        <form onSubmit={hancleCancel}>
                            <input hidden value="No" type="text" name="clientSentSelectionRequest" id="" />
                            <input hidden value="Cancelled" type="text" name="workStatus" id="" />
                            <input hidden value="workerCancelled" type="text" name="whoCancelled" id="" />
                            <input hidden value="RefundedToClient" type="text" name="clientPaidToWorker" id="" />
                            <input hidden value="Pending" type="text" name="refundStatus" id="" />
                            <input className='btn' type="submit" value="Cancel Work Now" />
                        </form>
                    </div>
                }
            </div>
            </div>


        </div>
    );
};

export default WorkerAcceptOrCancelWork;