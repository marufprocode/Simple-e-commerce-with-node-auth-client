import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { sharedContext } from '../../context/UserContext';

const NavLinks = () => {
    const {user} = useContext(sharedContext);
    return (
        <ul className='flex flex-col md:flex-row gap-4'>
        <li>
        <NavLink to="/home">Home</NavLink>
        </li>   
        <li>
        <NavLink to="/home">Products</NavLink>
        </li>   
        <li>
        <NavLink to="/about">About</NavLink>
        </li>   
        {
            !user?.email &&
            <>
            <li>
            <NavLink to="/login">Login</NavLink>
            </li>   
            <li>
            <NavLink to="/signup">Signup</NavLink>
            </li>  
            </> 
        }
        </ul>
    );
};

export default NavLinks;