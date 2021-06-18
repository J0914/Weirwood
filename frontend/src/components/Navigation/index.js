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
            <ol>
                <span className='homeSpan'>
                <p> Godswood </p>
                <NavLink exact to='/' className='navLink' activeClassName='active-nav'>Home</NavLink>
                </span>
                <span className='authSpan'>
                {isLoaded && user ? 
                <>
                <ProfileButton user={user} /> 
                </>
                :
                <>
                <NavLink to='/signup' className='navLink' activeClassName='active-nav'>Create Account</NavLink>
                <NavLink to='/login' className='navLink' activeClassName='active-nav'>Log In</NavLink> 
                </>
                }
                </span>
                
            </ol>
            </nav>
        </div>
    );
}

export default Navigation