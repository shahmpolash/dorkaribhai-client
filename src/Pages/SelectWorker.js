import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SelectWorker = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [apply, setApply] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/apply/${id}`)
            .then(res => res.json())
            .then(info => setApply(info))
    }, [apply]);

    const handleSelectWorker = event => {
        event.preventDefault();
        const workerName = event.target.workerName.value;
        const workerId = event.target.workerId.value;
        const workerEmail = event.target.workerEmail.value;
        const amount = event.target.amount.value;
        const clientSentSelectionRequest = event.target.clientSentSelectionRequest.value;
        const clientPaidToWorker = event.target.clientPaidToWorker.value;
        const depositStatus = event.target.depositStatus.value;
        const selectWorker = { workerName, workerId, workerEmail, amount, clientSentSelectionRequest, clientPaidToWorker, depositStatus};
        const url = `http://localhost:5000/select-worker/${apply.workId}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(selectWorker)
        })
            .then(res => res.json())
            .then(result => {
                navigate(`/deposit/${apply.workId}`);

            })
    };

    return (
        <div className='flex h-screen justify-center items-center'>
            <div>
            {apply.workId}
            <h2>Worker Name {apply.workerName}</h2>
            <h2>Asking Amount Tk. {apply.amount}</h2>

            <form onSubmit={handleSelectWorker}>
                <input hidden value={apply.workerName} type="text" name="workerName" id="" />
                <input hidden value={apply.workerId} type="text" name="workerId" id="" />
                <input hidden value={apply.workerEmail} type="text" name="workerEmail" id="" />
                <input hidden value={apply.amount} type="text" name="amount" id="" />

                <input value="Pending" type="text" name="clientSentSelectionRequest" id="" />
                <input value="NotDeposited" type="text" name="depositStatus" id="" />
                <input value="No" type="text" name="clientPaidToWorker" id="" />
                <input  className='btn btn-lg' type="submit" value="Select" />
            </form>
            
        </div>
        </div>
    );
};

export default SelectWorker;