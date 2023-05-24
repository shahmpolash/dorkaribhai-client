import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../firebase.init';

const PostWork = () => {
    const [user] = useAuthState(auth);
    const [clients, setClients] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/clientprofile?clientEmail=${user?.email}`)
            .then(res => res.json())
            .then(data => setClients(data))
    }, []);

    const handlePostWork = event => {
        event.preventDefault();
        const clientEmail = event.target.clientEmail.value;
        const releasedAmount = event.target.releasedAmount.value;
        const clientSentSelectionRequest = event.target.clientSentSelectionRequest.value;
        const workStatus = event.target.workStatus.value;
        const clientName = event.target.clientName.value;
        const clientProfileImg = event.target.clientProfileImg.value;
        const clientId = event.target.clientId.value;
        const workTitle = event.target.workTitle.value;
        const workDetails = event.target.workDetails.value;
        const workBudget = event.target.workBudget.value;


        const postWork = { clientEmail, releasedAmount, clientSentSelectionRequest, workStatus, clientName,clientProfileImg, clientId, workTitle, workDetails, workBudget };

        const url = `http://localhost:5000/postwork`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(postWork)
        })
            .then(res => res.json())
            .then(result => {
                navigate('/');
            })
    };

    return (
        <div className='flex justify-center'>
            {
                clients.length === 1 &&
                <form className='container mx-auto client-form' onSubmit={handlePostWork}> <br />
                    <input hidden value={user.email} type="text" name="clientEmail" id="" /> <br />
                    <input hidden value="No" type="text" name="clientSentSelectionRequest" id="" /> <br />
                    <input hidden value="Open" type="text" name="workStatus" id="" /> <br />
                    <input hidden value="0" type="text" name="releasedAmount" id="" /> <br />
                    {
                        clients.map(client => client.clientEmail === user?.email &&
                            <input hidden value={client.clientName} type="text" name="clientName" id="" />
                        )
                    }
                    {
                        clients.map(client => client.clientEmail === user?.email &&
                            <input hidden value={client.clientProfileImg} type="text" name="clientProfileImg" id="" />
                        )
                    }
                    <br />
                    {
                        clients.map(client => client.clientEmail === user?.email &&
                            <input hidden value={client._id} type="text" name="clientId" id="" />
                        )
                    } <br />
                    <input type="text" name="workTitle" id="" placeholder='Type Your Work Title' /> <br />
                    <textarea name="workDetails" id="" cols="30" rows="10" placeholder='Type Here Work Details'></textarea> <br />
                    <lebel>Tk.</lebel><input type="number" name="workBudget" id="" placeholder='Enter Your Budget' /> <br />
                    <input className='btn' type="submit" value="Post a Work" />
                </form>
            }

            {
                clients.length === 0 &&
                <div className='flex h-screen justify-center items-center'>
                    <div>
                    <h2>Sorry! Your profile is not for Client.</h2>
                    <Link className='btn' to="/update">Please Update Your Profile</Link>
                    </div>
                </div>
            }

        </div>
    );
};

export default PostWork;