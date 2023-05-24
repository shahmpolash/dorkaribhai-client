import React from 'react';
import { Link } from 'react-router-dom';

const UpdateClientOrWorker = () => {
    return (
        <div className='flex h-screen justify-center items-center'>
            <Link to="/create-worker" className='btn mr-2'>Join as a Worker</Link>
            <Link to="/create-client" className='btn ml-2'>Join as a Client</Link>
        </div>
    );
};

export default UpdateClientOrWorker;