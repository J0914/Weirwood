import React from 'react';
import Spot from '../Spot'
import styles from '../../css-modules/Splash.module.css'

const Splash = () => {

    return (
        <>
        <div className={styles.splashBody}>
            <h1 id={styles.splashH1}> Winter is coming! </h1>
            <div id={styles.welcome}>
                <p id={styles.welcomeMsg}>Make the Most of the long summer before the white ravens fly!</p>
            </div>
            <div id={styles.test}> 
            <Spot />
            </div> 
        </div>   
        </>
    );
}

export default Splash;