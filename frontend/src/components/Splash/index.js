import React from 'react';
import Slideshow from '../Slideshow'
import styles from '../../css-modules/Splash.module.css'

const Splash = () => {

    return (
        <>
        <div className={styles.splashBody}>
            <div id={styles.header}>
            <h1 id={styles.splashH1}> “Different roads sometimes lead to the same castle.” </h1>
            <h3 id={styles.gm}>- George R.R. Martin</h3>
            </div>
            <div id={styles.welcome}>
                <p id={styles.welcomeMsg}> 
                They say that every person's home is their castle, how about vacationing in
                real one? Here at Weirwood we offer the best selection of castles
                in Westeros for your next vacation. Browse our selection and make one of our
                castles your temporary home!
                </p>
                <div id={styles.spots}>
                <Slideshow />
                </div>
            </div>
        </div>   
        </>
    );
}

export default Splash;