import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as reviewsActions from '../../store/reviews'

import styles from '../../css-modules/Review.module.css'

export default function Reviews () {
    const reviews = useSelector(state => state.reviews.spotReviews);
    const user = useSelector(state => state.session.user);
    const castle = useSelector(state => state.spots.currentCastle)
    const dispatch = useDispatch();

    

    return (
        <>
        {
            reviews && reviews.map(review => (
                <div key={review.id} id={styles.reviewContainer}>
                    <div id={styles.reviewHead}>
                        <label id={styles.username}>{user.username}</label>
                        <p id={styles.date}>{review.createdAt}</p>
                    </div>
                    <div id={styles.body}>
                        <p id={styles.review} >{review.body}</p>
                    </div>
                        {user.id === review.userId && 
                        <div id={styles.udBtns}>
                          <button 
                          value={review.id} 
                          className={styles.udBtn} 
                        //   make it pop up a modal to edit
                          >edit</button>
                          <button 
                          value={review.id} 
                          className={styles.udBtn}
                          >delete</button>
                        </div>
                        }
                </div>
            ))
        }
        </>
    );
}