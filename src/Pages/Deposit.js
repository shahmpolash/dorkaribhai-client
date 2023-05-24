import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useParams } from 'react-router-dom';
import auth from '../firebase.init';

const Deposit = () => {
    const [user] = useAuthState(auth);
    const [work, setWork] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    const [client, setClient] = useState([]);
    
    useEffect(() => {
        fetch(`http://localhost:5000/clientprofile?clientEmail=${user?.email}`)
            .then(res => res.json())
            .then(data => setClient(data))
    }, [client]);

    useEffect(() => {
        fetch(`http://localhost:5000/work/${id}`)
            .then(res => res.json())
            .then(info => setWork(info))
    }, [work]);

    const handleDeposit = event => {
        event.preventDefault();
        const depositAmount = event.target.depositAmount.value;
        const depositStatus = event.target.depositStatus.value;
        const workStatus = event.target.workStatus.value;
        const deposit = { depositAmount, workStatus, depositStatus};
        const url = `http://localhost:5000/deposit/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(deposit)
        })
            .then(res => res.json())
            .then(result => {
                navigate('/dashboard');

            })
    };

    return (
        <div>
            <div className='container mx-auto'>
                <h2>{work.workTitle}</h2>
                <h2>{work.workerName}</h2>
                <h2>{work.amount}</h2>
            </div>
            <form onSubmit={handleDeposit}>
                <input value={work.amount} type="number" name="depositAmount" id="" />
                <input value="Deposited" type="text" name="depositStatus" id="" />
                <input value="Pending" type="text" name="workStatus" id="" />
                <input className='btn' type="submit" value="Deposit Now" />
            </form>
        </div>
    );
};

export default Deposit;