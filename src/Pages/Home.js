import React from 'react';
import RecentWorks from '../components/RecentWorks';
import HomePageBanner from '../components/Shared/HomePageBanner';

const Home = () => {
    return (
        <div>
            <HomePageBanner></HomePageBanner>
            <RecentWorks></RecentWorks>
        </div>
    );
};

export default Home;