import React from 'react';
import styles from '../../css-modules/Signup.module.css'

const Splash = () => {

    return (
        <>
        <div className={styles.splashBody}>
            <h1 id={styles.splashH1}> Winter is coming! </h1>
            <div id={styles.welcome}>
                <p id={styles.welcomeMsg}>Make the Most of the long summer before the white ravens fly!</p>
            </div>
            <h1 id={styles.test}> Hi </h1> 
        </div>   
        </>
    );
}

export default Splash;