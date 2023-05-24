import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const PaymentRefundStatus = () => {

    const [works, setWorks] = useState([]);


    useEffect(() => {
        fetch(`http://localhost:5000/works`)
            .then(res => res.json())
            .then(info => setWorks(info))
    }, [works]);


    return (
        <div>
            <div class="overflow-x-auto">
                <table class="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Client Name</th>
                            <th>Work Title</th>
                            <th>Amount</th>
                            <th>Worker</th>
                            <th>Payment Refund Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            works.map(work => work.refundStatus === 'Pending' |  work.refundStatus === 'Refunded' &&

                                <tr>
                                    <th>1</th>
                                    <td>{work.clientName}</td>
                                    <td>{work.workTitle}</td>
                                    <td>{work.amount} Tk</td>
                                    <td>{work.workerName}</td>
                                    <td>
                                        {work.refundStatus === 'Pending' && <>Not Refunded <br /> <Link className='btn btn-sm' to={`/admin/refund-payment/${work._id}`}>Refund Confirm Now</Link></>}
                                        {work.refundStatus === 'Refunded' && <Link className='btn btn-sm'>Payment Was Refunded to Client</Link>}
                                    </td>
                                </tr>

                            )
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default PaymentRefundStatus;