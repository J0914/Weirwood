import React from 'react';
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProfileButton from './ProfileButton'

import './Nav.css';

const Navigation = ({ isLoaded }) => {
    const user = useSelector((state) => state.session.user)
    
    return (
        <div className='nav-container'>
            <nav className='nav'>
                <span className='homeSpan'>
                <p id='site-name'> Weirwood </p>
                </span>
                <span className='authSpan'>
                {isLoaded && user ? 
                <>
                <NavLink exact to='/' id = 'home' className='navLink' activeClassName='active-nav'>Home</NavLink>
                <ProfileButton user={user} /> 
                </>
                :
                <>
                <NavLink exact to='/' id = 'home' className='navLink' activeClassName='active-nav'>Home</NavLink>
                <NavLink to='/login' id='login' className='navLink' activeClassName='active-nav'>Log In</NavLink> 
                <NavLink to='/signup' id='signup' className='navLink' activeClassName='active-nav'>Create Account</NavLink>
                </>
                }
                </span>
            </nav>
        </div>
    );
}

export default Navigation