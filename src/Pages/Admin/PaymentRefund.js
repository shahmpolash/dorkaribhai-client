import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PaymentRefund = () => {
    const [work, setWork] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/work/${id}`)
            .then(res => res.json())
            .then(info => setWork(info))
    }, [work]);

    const handlePaymentRefund = event => {
        event.preventDefault();
        const refundStatus = event.target.refundStatus.value;
        const depositStatus = event.target.depositStatus.value;
        const paymentRefunded = { refundStatus, depositStatus };
        const url = `http://localhost:5000/payment-refund/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(paymentRefunded)
        })
            .then(res => res.json())
            .then(result => {
                navigate('/admin/dashboard');
            })
    };

    return (
        <div>
            <h2>Refund Now</h2>
            {
                work.refundStatus === 'Pending' &&
                <form onSubmit={handlePaymentRefund}>
                    <input value='Refunded' type="text" name="refundStatus" id="" />
                    <input value='Refunded' type="text" name="depositStatus" id="" />
                    <input className='btn btn-md' type="submit" value="Refund Now" />
                </form>
            }
        </div>
    );
};

export default PaymentRefund;