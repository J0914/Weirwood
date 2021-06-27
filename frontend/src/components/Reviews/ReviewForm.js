import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as reviewsActions from '../../store/reviews'

import styles from '../../css-modules/Review.module.css'

export default function ReviewForm () {
    const user = useSelector(state => state.session.user)
    const castle = useSelector(state => state.spots.currentCastle)
    const dispatch = useDispatch();    
    
    const [errors, setErrors] = useState([]);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [body, setBody] = useState('');

    let userId;
    let spotId;

    if (castle) {
        spotId = castle.id;
    }
    if (user) {
        userId = user.id;

    }
    
    const handleReviewSubmit= async (e) => {
        e.preventDefault();

        if (user) {
            setErrors([]);
            setIsSubmitted(true);
            await dispatch(reviewsActions.createReview({ spotId, userId, body }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                } else if (data) setIsSuccess(true)
            })
    
        } else {
            setErrors(['You must be logged in to create a review!'])
        }  
    }

    useEffect(() => {
        if (errors.length > 0) setIsSuccess(false);
        if (isSubmitted && errors.length === 0) setIsSuccess(true);

        setTimeout (() => {
            setIsSuccess(false)
        }, 3000)
    },[isSubmitted, errors])
    

    return (
        <div id={styles.formDiv} >
            <form id={styles.bookingForm} onSubmit={handleReviewSubmit}>
                <h3 className={styles.header}> Leave a Review! </h3>
                {errors ? 
                <div className={styles.errors}>
                    <ul>
                        {errors.map((error, idx) => <li className={styles.li} key={idx}>{error}</li>)}
                    </ul>
                </div>
                    : null 
                }
                {isSuccess ? 
                <div className={styles.errors}>
                     <ul>
                        <li className={styles.li}>'Review Posted!'</li>
                    </ul> 
                </div> 
                    : null
                }
                <div className={styles.textAreaDiv}>
                    <textarea
                        name='textarea'
                        placeholder='Please be kind'
                        id={styles.textarea}
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                    />
                    <button className={styles.submitBtn} type="submit">Post</button>
                </div>
            </form>
        </div>
    );
}