import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProfileButton from './ProfileButton'
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import BookingModal from '../BookingModal'

import styles from '../../css-modules/Nav.module.css'

const Navigation = ({ isLoaded }) => {
    const [showNavMenu, setShowNavMenu] = useState(false)
    const user = useSelector((state) => state.session.user)
    
    let sessionLinks;
    if (user) {
        sessionLinks = (
            <div id={styles.dropdownDiv}>
            <BookingModal />
            <ProfileButton id={styles.profile} user={user} /> 
            </div>
        );
    } else {
        sessionLinks = (
            <span className={styles.authSpan}>
                <div id={styles.authBtns}>
                    <LoginFormModal />
                    <SignupFormModal />
                </div>
            </span>
        )
    }

    const openNavMenu = () => {
        if (showNavMenu) return;
        setShowNavMenu(true);
    }

    useEffect(() => {
        if (!showNavMenu) return;

        const closeMenu = () => {
            setShowNavMenu(false);
        }

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showNavMenu])
    
    return (
        // <div className={styles.navContainer}>
            <nav className={styles.nav}>
                <span className={styles.homeSpan}>
                <button id='btn' onClick={openNavMenu}>
                <i className="fas fa-bars"></i>
                </button>
                {showNavMenu && (
                <ul className={styles.navDropdown}>
                    <NavLink exact to='/' id = {styles.home} className={styles.navLink} activeClassName={styles.activeNav}>Home</NavLink>
                    <NavLink exact to='/castles' id = {styles.castles} className={styles.navLink} activeClassName={styles.activeNav}>Browse</NavLink>   
                </ul>
                )}
                </span>
                <span className={styles.weirSpan}>
                <NavLink exact to='/' id={styles.siteName}> Weirwood </NavLink>
                </span>
                {isLoaded && sessionLinks}
            </nav>
        // </div>
    );
}

export default Navigation