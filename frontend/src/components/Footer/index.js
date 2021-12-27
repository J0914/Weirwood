import React from 'react';
import {DiGithubBadge} from 'react-icons/di'
import {FaLinkedin, FaAngellist} from 'react-icons/fa'
import {BiUserCircle} from 'react-icons/bi'

import styles from '../../css-modules/Footer.module.css'

const Footer = () => {


    return (
        <footer className={styles.footer}>
            <div id={styles.footer_content}>
                <label className={styles.footer_text}>Created by: Jordyn Sechrist</label>
                <a rel='noreferrer' target="_blank" className={`${styles.footer_link} ${styles.github}`} href='https://github.com/J0914'><DiGithubBadge /></a>
                <a rel='noreferrer' target="_blank" className={styles.footer_link} href='https://www.linkedin.com/in/jordyn-sechrist-87710b207/'><FaLinkedin /></a>
                <a rel='noreferrer' target="_blank" className={styles.footer_link} href='https://angel.co/u/jordyn-sechrist'><FaAngellist /></a>
                <a rel='noreferrer' target="_blank" className={styles.footer_link} href='https://j0914.github.io/'><BiUserCircle /></a>
            </div>
        </footer>
    )
}

export default Footer;