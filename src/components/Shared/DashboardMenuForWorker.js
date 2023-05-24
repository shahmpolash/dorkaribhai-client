import React from 'react';
import { Link } from 'react-router-dom';

const DashboardMenuForWorker = () => {
    return (
        <div className='flex justify-center mx-auto'>
            <Link to='/recent-applied' className="btn btn-outline btn-info">Recent Applied</Link>   
            <Link to='/recent-offer-received' className="btn btn-outline btn-info">Recent Offer Received</Link>   
            <Link to='/recent-cpmpleted-worker' className="btn btn-outline btn-info">Recent Completed</Link>   
            <Link to='/cancelled-work-worker' className="btn btn-outline btn-info">Cancelled Work</Link>   
              
        </div>
    );
};

export default DashboardMenuForWorker;