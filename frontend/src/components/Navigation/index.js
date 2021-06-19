import React from 'react';
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProfileButton from './ProfileButton'

import styles from '../../css-modules/Nav.module.css'

const Navigation = ({ isLoaded }) => {
    const user = useSelector((state) => state.session.user)
    
    return (
        <div className={styles.navContainer}>
            <nav className={styles.nav}>
                <span className={styles.homeSpan}>
                <p id={styles.siteName}> Weirwood </p>
                </span>
                <span className={styles.authSpan}>
                {isLoaded && user ? 
                <>
                <NavLink exact to='/' id = {styles.home} className={styles.navLink} activeClassName={styles.activeNav}>Home</NavLink>
                <ProfileButton user={user} /> 
                </>
                :
                <>
                <NavLink exact to='/' id = {styles.home} className={styles.navLink} activeClassName={styles.activeNav}>Home</NavLink>
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