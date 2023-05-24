import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const PaymentTransferStatus = () => {

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
                            <th>Worker Name</th>
                            <th>Work Name</th>
                            <th>Amount</th>
                            <th>Client</th>
                            <th>Payment Transfer Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            works.map(work => work.PaymentTransferStatus === 'PaymentPending' |  work.PaymentTransferStatus === 'PaymentTransferred' &&

                                <tr>
                                    <th>1</th>
                                    <td>{work.workerName}</td>
                                    <td>{work.workTitle}</td>
                                    <td>{work.amount} Tk</td>
                                    <td>{work.clientName}</td>
                                    <td>
                                        {work.PaymentTransferStatus === 'PaymentPending' && <>Not Transferred <br /> <Link className='btn btn-sm' to={`/admin/transfer-payment/${work._id}`}>Transfer Now</Link></>}
                                        {work.PaymentTransferStatus === 'PaymentTransferred' && <Link className='btn btn-sm'>Payment Transferred</Link>}
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

export default PaymentTransferStatus;