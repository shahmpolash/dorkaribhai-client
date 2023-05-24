
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useParams } from 'react-router-dom';
import auth from '../firebase.init';


const ClientToWorkerMessage = () => {
    const { id } = useParams();
    const [apply, setApply] = useState([]);
    const [messages, setMessages] = useState([]);
    const [replies, setReplies] = useState([]);
    const navigate = useNavigate();
    const [user] = useAuthState(auth);

    useEffect(() => {
        fetch(`http://localhost:5000/messages`)
            .then(res => res.json())
            .then(data => setMessages(data))
    }, []);
    useEffect(() => {
        fetch(`http://localhost:5000/replies`)
            .then(res => res.json())
            .then(data => setReplies(data))
    }, []);


    useEffect(() => {
        fetch(`http://localhost:5000/apply/${id}`)
            .then(res => res.json())
            .then(info => setApply(info))
    }, [id]);

    const handleClientMessage = event => {
        event.preventDefault();
        const applyId = event.target.applyId.value;
        const workId = event.target.workId.value;
        const workTitle = event.target.workTitle.value;
        const clientName = event.target.clientName.value;
        const clientProfileImg = event.target.clientProfileImg.value;
        const workerProfileImg = event.target.workerProfileImg.value;
        const clientId = event.target.clientId.value;
        const clientEmail = event.target.clientEmail.value;
        const workerEmail = event.target.workerEmail.value;
        const workerName = event.target.workerName.value;
        const workerId = event.target.workerId.value;
        const amount = event.target.amount.value;
        const whoSentMessage = event.target.whoSentMessage.value;
        const messageFromClientToWorkerStatus = event.target.messageFromClientToWorkerStatus.value;
        const clientMessageForWorker = event.target.clientMessageForWorker.value;


        const clientMessage = { applyId, workId, workTitle, clientName, clientProfileImg, workerProfileImg, clientId, clientEmail, workerEmail, workerName, workerId, amount, whoSentMessage, messageFromClientToWorkerStatus, clientMessageForWorker };

        const url = `http://localhost:5000/new-message-client`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(clientMessage)
        })
            .then(res => res.json())
            .then(result => {
                navigate('/inbox');
            })
    };

    const handleClientReply = event => {
        event.preventDefault();
        const applyId = event.target.applyId.value;
        const workId = event.target.workId.value;
        const workTitle = event.target.workTitle.value;
        const clientName = event.target.clientName.value;
        const clientProfileImg = event.target.clientProfileImg.value;
        const clientId = event.target.clientId.value;
        const clientEmail = event.target.clientEmail.value;
        const workerEmail = event.target.workerEmail.value;
        const workerName = event.target.workerName.value;
        const workerProfileImg = event.target.workerProfileImg.value;
        const workerId = event.target.workerId.value;
        const amount = event.target.amount.value;
        const whoSentMessage = event.target.whoSentMessage.value;
        const messageFromClientToWorkerStatus = event.target.messageFromClientToWorkerStatus.value;
        const clientMessageForWorker = event.target.clientMessageForWorker.value;


        const newReply = { applyId, workId, workTitle, clientName, clientProfileImg, clientId, clientEmail, workerEmail, workerName, workerProfileImg, workerId, amount, whoSentMessage, messageFromClientToWorkerStatus, clientMessageForWorker };

        const url = `http://localhost:5000/new-reply`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newReply)
        })
            .then(res => res.json())
            .then(result => {
                navigate('/inbox');
            })
    };


    return (
        <div className='container max-w-2xl min-w-2xl mx-auto flex justify-center'>
            <div>
            {
                messages.map(message => message.clientEmail === user?.email && message.applyId === apply._id && message.whoSentMessage === 'Client' &&
                    <div className='mt-5 container'>
                        <div>
                            <div className="chat chat-start">
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={message.clientProfileImg} alt='profile' />
                                    </div>
                                </div>
                                <div className="chat-bubble">{message.clientMessageForWorker}</div>
                            </div>

                        </div>

                    </div>

                )
            }
            {
                messages.map(message => message.clientEmail === user?.email && message.applyId === apply._id && message.whoSentMessage === 'Worker' &&
                    <div className='mt-5 container'>
                        <div>

                            <div>
                                <div className="chat chat-end">
                                    <div className="chat-image avatar">
                                        <div className="w-10 rounded-full">
                                            <img src={message.workerProfileImg} alt='' />
                                        </div>
                                    </div>
                                    <div className="chat-bubble chat-bubble-primary">{message.workerMessageForClient}</div>
                                </div>

                            </div>
                        </div>
                    </div>
                )
            }
            {
                replies.map(reply => reply.clientEmail === user?.email && reply.applyId === apply._id &&
                    <div className='mt-5 container'>
                        <div>
                            <div className='flex justify-start'>
                                {
                                    reply.whoSentMessage === 'Client' &&
                                    <div className="chat chat-start">
                                    <div className="chat-image avatar">
                                        <div className="w-10 rounded-full">
                                            <img src={reply.clientProfileImg} alt='profile' />
                                        </div>
                                    </div>
                                    <div className="chat-bubble">{reply.clientMessageForWorker}</div>
                                </div>
                                    
                                }
                                
                            </div>

                        </div>

                        <div>
                            <div className='flex justify-end'>
                                {
                                     reply.whoSentMessage === 'Worker' &&
                                     <div className="chat chat-end">
                                    <div className="chat-image avatar">
                                        <div className="w-10 rounded-full">
                                            <img src={reply.workerProfileImg} alt='' />
                                        </div>
                                    </div>
                                    <div className="chat-bubble chat-bubble-primary">{reply.workerMessageForClient}</div>
                                </div>
                                }
                                
                               
                            </div>
                        </div>

                    </div>

                )
            }


            <h2>Work Name: {apply.workTitle}</h2>
            <h2>You are sending message to {apply.workerName}</h2>
            {
                messages.filter(message => message.clientEmail === user?.email && message.applyId === apply._id ).length === 0 &&
                <form onSubmit={handleClientMessage}>
                    <input hidden type="text" name='applyId' value={apply._id} />
                    <input hidden type="text" name='workId' value={apply.workId} />
                    <input hidden type="text" name='workTitle' value={apply.workTitle} />
                    <input hidden type="text" name='clientName' value={apply.clientName} /> 
                    <input hidden type="text" name='clientProfileImg' value={apply.clientProfileImg} /> 
                    <input hidden type="text" name='workerProfileImg' value={apply.workerProfileImg} /> 
                    <input hidden type="text" name='clientId' value={apply.clientId} />
                    <input hidden type="text" name='clientEmail' value={apply.clientEmail} />
                    <input hidden type="text" name='workerEmail' value={apply.workerEmail} />
                    <input hidden type="text" name='workerName' value={apply.workerName} />
                    <input hidden type="text" name='workerId' value={apply.workerId} />
                    <input hidden type="text" name='amount' value={apply.amount} />
                    <input hidden type="text" name='messageFromClientToWorkerStatus' value='unRead' />
                    <input hidden type="text" name='whoSentMessage' value='Client' />
                    <textarea className='w-full' name="clientMessageForWorker" id="" cols="30" rows="10"></textarea> <br></br>
                    <input className='btn w-full' type="submit" value="Send Message" />
                </form>
            }
            {
                messages.filter(message => message.clientEmail === user?.email && message.applyId === apply._id).length === 1 &&
                <form onSubmit={handleClientReply}>
                    <input hidden type="text" name='applyId' value={apply._id} />
                    <input hidden type="text" name='workId' value={apply.workId} />
                    <input hidden type="text" name='workTitle' value={apply.workTitle} />
                    <input hidden type="text" name='clientName' value={apply.clientName} />
                    <input hidden type="text" name='clientProfileImg' value={apply.clientProfileImg} />
                    <input hidden type="text" name='clientId' value={apply.clientId} />
                    <input hidden type="text" name='clientEmail' value={apply.clientEmail} />
                    <input hidden type="text" name='workerEmail' value={apply.workerEmail} />
                    <input hidden type="text" name='workerName' value={apply.workerName} />
                    <input hidden type="text" name='workerProfileImg' value={apply.workerProfileImg} />
                    <input hidden type="text" name='workerId' value={apply.workerId} />
                    <input hidden type="text" name='amount' value={apply.amount} />
                    <input hidden type="text" name='messageFromClientToWorkerStatus' value='unRead' />
                    <input hidden type="text" name='whoSentMessage' value='Client' />
                    <textarea className='w-full' name="clientMessageForWorker" id="" cols="30" rows="10"></textarea> <br></br>
                    <input className='btn w-full' type="submit" value="Send Message" />
                </form>
            }


        </div>

        </div>
        
    );
};

export default ClientToWorkerMessage;