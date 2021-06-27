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
                Welcome to Weirwood, where fans of George R.R. Martin's 'Game of Thrones' series can
                come together to discuss and hopefully spend their next vacay in the amazing 
                castles their favorite characters lived in! This site includes some of the creators
                favorite characters and quotes from those characters. I hope you enjoy your stay!
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