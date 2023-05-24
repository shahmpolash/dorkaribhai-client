import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../firebase.init';
import './Navbar.css';

const Navbar = () => {
    const [user, loading, error] = useAuthState(auth);
    const [messages, setMessages] = useState([]);
    const logout = () => {
        signOut(auth);
    };

    useEffect(() => {
        fetch(`http://localhost:5000/messages`)
            .then(res => res.json())
            .then(data => setMessages(data))
    }, []);

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="btn btn-ghost normal-case text-xl">DorkariBhai</a>
                </div>
                <div className="flex-none gap-2">
                    <ul className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                        <li><Link to="/">Home</Link></li>
                    </ul>
                    <ul className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-orange-100 rounded-box w-52">
                        <li><Link to="/post-work">Post Work</Link></li>
                    </ul>
                    <ul className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-orange-100 rounded-box w-52">
                        <li>
                         <Link to="/dashboard">
                            {
                            messages.filter(message => message.workerEmail === user?.email && message.whoSentMessage === 'Client' && message.messageFromClientToWorkerStatus === 'unRead').length > 0 &&
                            <p className='text-red-600 notify'>.</p>
                            }
                            {
                            messages.filter(message => message.clientEmail === user?.email && message.whoSentMessage === 'Worker' && message.messageWorkerToClientStatus === 'unRead').length > 0 &&
                            <p className='text-red-600 notify'>.</p>
                            }
                            Dashboard
                         
                        </Link>
                        </li>
                    </ul>
                    <ul className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-orange-100 rounded-box w-52">
                        <li>
                         <Link to="/dashboard">
                            {
                            messages.filter(message => message.workerEmail === user?.email && message.whoSentMessage === 'Client' && message.messageFromClientToWorkerStatus === 'unRead').length > 0 &&
                            <p className='text-red-600 notify'>.</p>
                            }
                            {
                            messages.filter(message => message.clientEmail === user?.email && message.whoSentMessage === 'Worker' && message.messageWorkerToClientStatus === 'unRead').length > 0 &&
                            <p className='text-red-600 notify'>.</p>
                            }
                            Dashboard
                         
                        </Link>
                        </li>
                    </ul>
                    <ul className="mt-3 p-2 shadow menu menu-compact dropdown-content rounded-box w-52">
                    <a className="indicator tab tab-lifted tab-active">
    Notifications 
    <span className="indicator-item badge">8</span>
  </a> 
                    </ul>
                    
                    <div className="form-control">
                        <input type="text" placeholder="Search" className="input input-bordered" />
                    </div>
                    <div className="dropdown dropdown-end">
                        <label tabindex="0" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src="https://placeimg.com/80/80/people" />
                            </div>
                        </label>
                        <ul tabindex="0" className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                            <li>{user ? <button className='btn btn-ghost' onClick={logout}>Signout</button> : <Link to="/login">Login</Link>}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;