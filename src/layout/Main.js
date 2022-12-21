import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';

const Main = () => {
    return (
        <div>
            <Header/>
            <div className='pt-12'>
            <Outlet/>
            </div>
        </div>
    );
};

export default Main;