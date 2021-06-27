import React from 'react';

import styles from '../../css-modules/Footer.module.css'

const Footer = () => {


    return (
        <footer className={styles.footer}>
            <div>
            <p> 🤓 Created By Jordyn Sechrist </p>
            </div>
            <div>
            <a href='https://www.linkedin.com/in/jordyn-sechrist-87710b207/' id='linkedIn' >
            <i class="fab fa-linkedin"></i>
            </a>
            </div>
            <div>
            <a href='https://github.com/J0914' id='github' >
            <i class="fab fa-github-square"></i>
            </a>
            </div>
        </footer>
    )
}

export default Footer;