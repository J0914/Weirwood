import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as reviewsActions from '../../store/reviews'

import styles from '../../css-modules/ReviewModal.module.css'

export default function ModalReviewForm ({setShowModal, reviewId, reviewBody}) {

    const user = useSelector(state => state.session.user)
    const castle = useSelector(state => state.spots.currentCastle)
    const dispatch = useDispatch();    
    
    const [errors, setErrors] = useState([]);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [body, setBody] = useState(reviewBody);
    
    const handleSubmit= (e) => {
        e.preventDefault();
        setErrors([]);
        setIsSubmitted(true);
        const spotId = castle.id;
        const userId = user.id;

        dispatch(reviewsActions.editReview({ reviewId, userId, spotId, body }))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            } else if (data) setIsSuccess(true)
        })

        setTimeout (() => {
            setShowModal(false)
        }, 1500)
    }

    useEffect(() => {
        if (errors.length > 0) setIsSuccess(false);
        if (isSubmitted && errors.length === 0) setIsSuccess(true);
    },[isSubmitted, errors])
    

    return (
        <div id={styles.formDiv} >
            <form id={styles.bookingForm} onSubmit={handleSubmit}>
                <h3 className={styles.header}> Edit your Review </h3>
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
                        <p className={styles.li}>Review Updated!</p>
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
                    <button className={styles.submitBtn} type="submit">Edit</button>
                </div>
            </form>
        </div>
    );
}