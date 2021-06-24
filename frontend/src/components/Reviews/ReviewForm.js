import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as reviewsActions from '../../store/reviews'

import styles from '../../css-modules/Review.module.css'

export default function ReviewForm () {
    const user = useSelector(state => state.session.user)
    const castle = useSelector(state => state.spots.currentCastle)
    const stateErr = useSelector(state => state.bookings.errors)
    const success = useSelector(state => state.bookings.success)
    const dispatch = useDispatch();    
    
    const [errors, setErrors] = useState([]);
    const [theStateErr, setTheStateErr] = useState([]);
    const [isSuccess, setIsSuccess] = useState([]);
    const [body, setBody] = useState('');
    console.log(body)
    
    const handleReviewSubmit= (e) => {
        e.preventDefault();

        if (user) {
            setErrors([]);
            
            const spotId = castle.id;
            const userId = user.id;
            console.log('************', 'got here')
            dispatch(reviewsActions.createReview({ spotId, userId, body }))
            .catch(async (res) => {
                console.log(res)
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
                if (stateErr !== null) setTheStateErr([stateErr]);  
                if (!errors && !stateErr) setIsSuccess([success])
            })
    
        } else {
            setErrors(['You must be logged in to create a review!'])
        }  
    }
    
    // useEffect(() => {
    // },[stateErr])
    
    // useEffect(() => {
    //     if (success) setIsSuccess([success])
    //     if (stateErr){
    //         setTheStateErr([stateErr])
    //         setIsSuccess([])
    //     }
    // },[stateErr, success,])

    return (
        <div id={styles.formDiv} >
            <form id={styles.bookingForm} onSubmit={handleReviewSubmit}>
                <h3 className={styles.header}> Leave a Review! </h3>
                {errors ? 
                <div className={styles.errors}>
                    <ul>
                        {errors && errors.map((error, idx) => <li className={styles.li} key={idx}>{error}</li>)}
                    </ul>
                </div>
                    : null 
                }
                {theStateErr ?
                <div className={styles.errors}>
                     <ul>
                        {theStateErr && theStateErr.map((error, idx) => <li className={styles.li} key={idx}>{error}</li>)}
                    </ul>
                </div> 
                    : null
                }
                {isSuccess ? 
                <div className={styles.errors}>
                     <ul>
                        {isSuccess && isSuccess.map((msg, idx) => <li className={styles.li} key={idx}>{msg}</li>)}
                    </ul> 
                </div> 
                    : null
                }
                <div className={styles.textAreaDiv}>
                    <input
                        type="textarea"
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