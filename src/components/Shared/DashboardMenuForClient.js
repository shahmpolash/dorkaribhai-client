import React from 'react';
import { Link } from 'react-router-dom';

const DashboardMenuForClient = () => {
    return (
        <div className='flex justify-center mx-auto'>
             
            <Link to='/client-pending-offer/' className="btn btn-outline btn-info">My Pending Offers</Link>   
            <Link to='/client-cancelled-offer' className="btn btn-outline btn-info">Cancelled Offers</Link>   
            <Link to='/recent-completed-client'  className="btn btn-outline btn-info">Recent Completed</Link>   
              
        </div>
    );
};

export default DashboardMenuForClient;