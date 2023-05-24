import React from 'react';
import './HomePageBanner.css';
import bannerimg from './img/banner-img.png';


const HomePageBanner = () => {
    return (
        <div className='bg-red-100'>          
            <div className='bannerPart container mx-auto items-center min-h-50'>
            <div className='w-1/2'> 
                <h3>GET STARTED</h3>
                <h1>Hire Experts & Get Your Any Job Done</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet eius inventore doloremque natus alias deleniti quam a laudantium voluptatibus quod!</p>
                <div className='buttons'>
                <button className="btn btn-lg btn-error my-2"><p>Post a Work Now!</p></button>
                </div>
            </div>
            <div className='w-1/2'>
                <img src={bannerimg} alt="" />
            </div>
        </div>
        </div>
    );
};

export default HomePageBanner;