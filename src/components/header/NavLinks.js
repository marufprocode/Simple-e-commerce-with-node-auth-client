import React from 'react';
import { NavLink } from 'react-router-dom';

const NavLinks = () => {
    return (
        <ul className='flex flex-col md:flex-row gap-4'>
        <li>
        <NavLink>Home</NavLink>
        </li>   
        <li>
        <NavLink>Products</NavLink>
        </li>   
        <li>
        <NavLink>About</NavLink>
        </li>   
        <li>
        <NavLink to="/login">Login/Signup</NavLink>
        </li>   
        </ul>
    );
};

export default NavLinks;