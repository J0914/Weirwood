import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

import '../../css-modules/ProfileButton.css'

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
        <div id="dropdownDiv">
            <button id='btn' onClick={openMenu}>
            <i className="fas fa-chess-knight" />
            </button>
            {showMenu && (
                <ul className='profileDropdown'>
                    <label>
                        User:
                    </label>
                    <p className='userInfo'>{user.username}</p>
                    <label>
                        Email:
                    </label>
                    <p className='userInfo'>{user.email}</p>
                    
                    <button id='logout' onClick={logout}>Log Out</button>  
                </ul>
            )}
        </div>
    )
}

export default ProfileButton;