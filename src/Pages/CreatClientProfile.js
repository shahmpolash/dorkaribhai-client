import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../firebase.init';
import './CreateClientProfile.css';

const CreatClientProfile = () => {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const [client, setClient] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/clientprofile?clientEmail=${user?.email}`)
            .then(res => res.json())
            .then(data => setClient(data))
    }, []);


    const handleClientProfile = event => {
        event.preventDefault();
        const clientEmail = event.target.clientEmail.value;
        const clientName = event.target.clientName.value;
        const clientProfileImg = event.target.clientProfileImg.value;
        const clientAddress = event.target.clientAddress.value;
        const profileRole = event.target.profileRole.value;

     
        const clientProfile = { clientEmail, clientName, clientProfileImg, clientAddress, profileRole };

        const url = `http://localhost:5000/client`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(clientProfile)
        })
            .then(res => res.json())
            .then(result => {
                navigate('/');
            })
    };

    return (
        <div>
           <div className='flex h-screen justify-center'>
           {
                client.length === 0 &&
                <form className='container mx-auto client-form' onSubmit={handleClientProfile}>
                <input hidden value={user.email} type="text" name="clientEmail" id="" />
                <input type="text" name="clientName" id="" placeholder='Your Full Name' /> <br />
                <input type="text" name="clientProfileImg" id="" placeholder='Profile Picture' /><br />
                <input type="text" name="clientAddress" id="" placeholder='Your Address' /> <br />
                <input hidden value="client" type="text" name="profileRole" id="" /> <br />
                <input className='btn' type="submit" value="Update Profile" />
            </form>

            }
           </div>

            {
                client.length === 1 &&
                <div className='container mx-auto'>
                    <h2>You Have an Account Already</h2>
                </div>
            }
            
        </div>
    );
};

export default CreatClientProfile;