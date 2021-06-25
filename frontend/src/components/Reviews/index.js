import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReviewFormModal from '../ReviewFormModal'
import DeleteModalProvider from '../DeleteModal'
import * as reviewsActions from '../../store/reviews'

import styles from '../../css-modules/Review.module.css'

export default function Reviews () {
    const reviews = useSelector(state => state.reviews.spotReviews);
    const user = useSelector(state => state.session.user);
    const castle = useSelector(state => state.spots.currentCastle);


    

    return (
        <>
        {
            reviews && reviews.map(review => (
                <div key={review.id} id={styles.reviewContainer}>
                    <div id={styles.reviewHead}>
                        <label id={styles.username}>{review.User.username}</label>
                        <p id={styles.date}>{review.createdAt}</p>
                    </div>
                    <div id={styles.body}>
                        <p id={styles.review} >{review.body}</p>
                    </div>
                        {user && user.id === review.userId && 
                        <div id={styles.udBtns}>
                          <ReviewFormModal reviewId={review.id} body={review.body}/>
                          <DeleteModalProvider reviewId={review.id} />
                        </div>
                        }
                </div>
            ))
        }
        </>
    );
}