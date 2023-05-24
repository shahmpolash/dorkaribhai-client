import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './RecentWork.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

const RecentWorks = () => {
    const [works, setWorks] = useState([]);
    const [applies, setApplies] = useState([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        fetch(`http://localhost:5000/works`)
            .then(res => res.json())
            .then(data => setWorks(data))
    }, []);


    useEffect(() => {
        fetch(`http://localhost:5000/applies-work`)
            .then(res => res.json())
            .then(data => setApplies(data))
    }, []);


    return (
        <div className='homePage-Recent-Work'>
            <div className='container mx-auto'>
                {
                    works.map(work => work.clientSentSelectionRequest === "No" && work.workStatus === 'Open' &&
                        <div className='recent-work mb-5'>
                            <div className='flex items-center'>
                                <img className='mr-2' src={work.clientProfileImg} alt="" />
                                <Link to={`/client/${work.clientId}`}>{work.clientName}</Link>
                            </div>
                            <div className='work-name'>
                                <h2>Work Name</h2>
                                <Link to={`/work/${work._id}`}><p>{work.workTitle}</p></Link>
                            </div>
                            <div>
                                <h2>Budget</h2>
                                {work.workBudget} Tk
                            </div>
                            <div>
                                <h2>Total Applies</h2>
                                {applies.filter(apply=> apply.workId === work._id).length}
                            </div>
                            <div className='button-Link'>
                                {
                                    applies.filter(apply => apply.workerEmail === user?.email && apply.workId === work._id).length === 1 && 
                                    <Link className="btn btn-lg btn-error apply-btn" ><p>You Applied</p></Link>
                                    
                                }
                                {
                                    applies.filter(apply => apply.workerEmail === user?.email && apply.workId === work._id).length === 0 && 
                                    <Link className="btn btn-lg btn-error apply-btn" to={`/work/${work._id}`}><p>Apply Now</p></Link>
                                    
                                }

                               
                            </div>
                        </div>
                    ).reverse()
                }

            </div>
        </div>
    );
};

export default RecentWorks;