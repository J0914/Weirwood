import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProfileButton from './ProfileButton'

import styles from '../../css-modules/Nav.module.css'

const Navigation = ({ isLoaded }) => {
    const [showNavMenu, setShowNavMenu] = useState(false)
    const user = useSelector((state) => state.session.user)

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
        <div className={styles.navContainer}>
            <nav className={styles.nav}>
                <span className={styles.homeSpan}>
                <button id='btn' onClick={openNavMenu}>
                <i className="fas fa-bars"></i>
                </button>
                {showNavMenu && (
                <ul className={styles.navDropdown}>
                    <NavLink exact to='/' id = {styles.home} className={styles.navLink} activeClassName={styles.activeNav}>Home</NavLink>
                </ul>
                )}
                </span>
                <span className={styles.weirSpan}>
                <p id={styles.siteName}> Weirwood </p>
                </span>
                <span className={styles.authSpan}>
                {isLoaded && user ? 
                <>
                <ProfileButton id={styles.profile} user={user} /> 
                </>
                :
                <>
                <NavLink to='/login' id={styles.login} className={styles.navLink} activeClassName={styles.activeNav}>Log In</NavLink> 
                <NavLink to='/signup' id={styles.signup} className={styles.navLink} activeClassName={styles.activeNav}>Create Account</NavLink>
                </>
                }
                </span>
            </nav>
        </div>
    );
}

export default Navigation