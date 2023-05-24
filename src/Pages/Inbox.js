import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import { Link } from 'react-router-dom';

const Inbox = () => {

    const [messages, setMessages] = useState([]);
    const [applies, setApplies] = useState([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        fetch(`http://localhost:5000/applies-work`)
            .then(res => res.json())
            .then(data => setApplies(data))
    }, []);

    useEffect(() => {
        fetch(`http://localhost:5000/messages`)
            .then(res => res.json())
            .then(data => setMessages(data))
    }, []);
    return (
        <div className='container mx-auto'>



            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            messages.map(message => <div>
                                {
                                    applies.map(apply => message.applyId === apply._id && apply.clientEmail === user?.email &&
                                        <tr>
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src={message.workerProfileImg} alt='' />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{message.workerName}</div>

                                                    </div>
                                                </div>
                                            </td>
                                            <td><Link to={`/client-to-worker/${apply._id}`}>{message.workTitle}</Link></td>
                                            
                                        </tr>

                                    )
                                }

                            </div>).reverse()
                        }
                        {
                            messages.map(message => <div>
                                {
                                    applies.map(apply => message.applyId === apply._id && apply.workerEmail === user?.email &&
                                        <tr>
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src={message.clientProfileImg} alt='' />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{message.clientName}</div>

                                                    </div>
                                                </div>
                                            </td>
                                            <td><Link to={`/worker-to-client/${apply._id}`}>{message.workTitle}</Link></td>
                                            
                                        </tr>

                                    )
                                }

                            </div>).reverse()
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Inbox;