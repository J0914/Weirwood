import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

import './ProfileButton.css';

// Manipulating the font-size of the parent element (the div) changes the size 
// of the icon. The color of the parent element will be the color of the icon. 

const ProfileButton = ({ user }) => {
    const [ showMenu, setShowMenu ] = useState(false)
    const dispatch = useDispatch();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    }

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        }

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu])

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    }

    return (
        <div>
            <button onClick={openMenu}>
            <i className="fas fa-chess-knight" />
            </button>
            {showMenu && (
                <ul className="profile-dropdown">
                    <p>User: {user.username}</p>
                    <p>Email: {user.email}</p>
                    
                    <button id='logout' onClick={logout}>Log Out</button>
                    
                </ul>
            )}
        </div>
    )
}

export default ProfileButton;