import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const TransferPayment = () => {
    const [work, setWork] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/work/${id}`)
            .then(res => res.json())
            .then(info => setWork(info))
    }, [work]);

    const handleTransferPayment = event => {
        event.preventDefault();
        const PaymentTransferStatus = event.target.PaymentTransferStatus.value;
        const paymentTransferred = { PaymentTransferStatus };
        const url = `http://localhost:5000/payment-transferred/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(paymentTransferred)
        })
            .then(res => res.json())
            .then(result => {
                navigate('/admin/dashboard');

            })
    };

    return (
        <div>
            {
                work.PaymentTransferStatus === 'PaymentPending' &&
                <form onSubmit={handleTransferPayment}>
                    <input value='PaymentTransferred' type="text" name="PaymentTransferStatus" id="" />
                    <input className='btn btn-md' type="submit" value="Accept Delivery & Release Payment" />
                </form>
            }

        </div>
    );
};

export default TransferPayment;