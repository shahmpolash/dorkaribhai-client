import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../firebase.init';
import './CreateClientProfile.css';

const CreateWorker = () => {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const [worker, setWorker] = useState([]);
    const [client, setClient] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/workerprofile?workerEmail=${user?.email}`)
            .then(res => res.json())
            .then(data => setWorker(data))
    }, []);

    useEffect(() => {
        fetch(`http://localhost:5000/clientprofile?clientEmail=${user?.email}`)
            .then(res => res.json())
            .then(data => setClient(data))
    }, []);


    const handleCreateWorker = event => {
        event.preventDefault();
        const workerEmail = event.target.workerEmail.value;
        const workerName = event.target.workerName.value;
        const workerProfileImg = event.target.workerProfileImg.value;
        const workerAddress = event.target.workerAddress.value;
        const profileRole = event.target.profileRole.value;

     
        const workerProfile = { workerEmail, workerName, workerProfileImg, workerAddress, profileRole };

        const url = `http://localhost:5000/worker`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(workerProfile)
        })
            .then(res => res.json())
            .then(result => {
                navigate('/');
            })
    };

    return (
        <div>
           <div className='flex h-screen justify-center '>
           {
                worker.length === 0 &&
                <>{
                    client.length === 0 &&
                <form className='container mx-auto client-form' onSubmit={handleCreateWorker}>
                <input hidden value={user.email} type="text" name="workerEmail" id="" />
                <input type="text" name="workerName" id="" placeholder='Your Full Name' /> <br />
                <input type="text" name="workerProfileImg" id="" placeholder='Profile Picture' /><br />
                <input type="text" name="workerAddress" id="" placeholder='Your Address' /> <br />
                <input type="number" name="whatsAppNumber" id="" placeholder='Your Whatsapp Number' /> <br />
                <input hidden value="worker" type="text" name="profileRole" id="" /> <br />
                <input className='btn' type="submit" value="Update Profile" />

            </form>
                }</>

                
            }
            {
                worker.length === 1 &&
                <div className='container mx-auto'>
                    <h2>You Have an Account Already</h2>
                </div>
            }
            {
                client.length === 1 &&
                <div className='container mx-auto'>
                    <h2>Client Can Not Setup Worker Profile</h2>
                </div>
            }

           </div>

            
            
        </div>
    );
};

export default CreateWorker;