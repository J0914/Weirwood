import React, { useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as spotsActions from '../../store/spots'
import * as reviewsActions from '../../store/reviews'
import BookingFormModal from '../BookingFormModal'
import Reviews from '../Reviews';
import ReviewForm from '../Reviews/ReviewForm';


import styles from '../../css-modules/Castle.module.css'

export default function Castle () {
    const { id } = useParams();
    const dispatch = useDispatch();
    const castle = useSelector(state => state.spots.currentCastle)
    let spotId;
    if (castle) spotId = castle.id

    useLayoutEffect(() => {
        window.scrollTo(0, 0)
    });
    
    useEffect(() => {
        dispatch(spotsActions.getSingleSpot(id))
    }, [dispatch, id]) 
    
    useEffect(() => {
        if (castle)
        dispatch(reviewsActions.getReviews(spotId))
    }, [dispatch, spotId, castle])

    return (
            <div id={styles.castleContainer}>
                {castle && 
                <>
                    <div id={styles.header}>
                        <div id={styles.headTop}>
                            <h2 id={styles.title}> {castle.title} </h2>
                            <h3 id={styles.castleLocation}>{castle.location}</h3>
                        </div>
                    </div>
                    <div id={styles.imgContainer}>
                        <img className={styles.img} src={castle.Images[0].url} alt={castle.title}></img>
                    </div>
                    <div id={styles.underImgDiv} >
                    <div id={styles.info}>
                        <p id={styles.description}>{castle.description}</p>
                    </div>
                    <div id={styles.formWrapper}>
                        <div id={styles.headBottom}>
                            <label id={styles.price}>{castle.price} Gold Dragons</label>
                        </div>
                        <div id={styles.formDiv}>
                            <BookingFormModal />
                        </div>
                    </div>
                    </div>
                    <div id={styles.reviewFormDiv}>
                        <ReviewForm />
                    </div>
                    <div id={styles.reviewsDiv}>
                        <Reviews />
                    </div>
                </>
                }
            </div>
    );
}