import React from 'react';
import { useSelector } from 'react-redux';

import styles from '../../css-modules/Review.module.css'

export default function Reviews () {
    const reviews = useSelector(state => state.reviews.spotReviews)

    return (
        <>
        {
            reviews && reviews.map(review => (
                <div id={styles.reviewContainer}>
                <div id={styles.reviewHead}>
                <label id={styles.username}>{review.User.username}</label>
                <p id={styles.date}>{review.createdAt}</p>
                </div>
                <div id={styles.body}>
                <p id={styles.review} >{review.body}</p>
                </div>
                </div>
            ))
        }
        </>
    );
}