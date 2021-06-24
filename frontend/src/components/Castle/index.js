import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as spotsActions from '../../store/spots'
import * as bookingsActions from '../../store/bookings'
import BookingFormModal from '../BookingFormModal'


import styles from '../../css-modules/Castle.module.css'

export default function Castle () {
    const { id } = useParams();
    const dispatch = useDispatch();
    const castle = useSelector(state => state.spots.currentCastle)
    
    useEffect(() => {
        dispatch(spotsActions.getSingleSpot(id))
    }, [dispatch, id])

    useEffect(() => {
        dispatch(bookingsActions.clearErrors());
    }, [dispatch])

    

    return (
            <div id={styles.castleContainer}>
                {castle && 
                <>
                    <div id={styles.header}>
                        <div id={styles.headTop}>
                            <h2 id={styles.title}> {castle.title} </h2>
                        </div>
                    </div>
                    <div id={styles.imgContainer}>
                        <img className={styles.img} src={castle.Images[0].url} alt={castle.title}></img>
                    </div>
                    <div id={styles.info}>
                        <p id={styles.description}>{castle.description}</p>
                    </div>
                    <div id={styles.formWrapper}>
                        <div id={styles.headBottom}>
                            <label id={styles.price}>{castle.price} Gold Dragons</label>
                            <h3 id={styles.location}>{castle.location}</h3>
                        </div>
                        <div id={styles.formDiv}>
                        <BookingFormModal />
                        </div>
                    </div>
                </>
                }
            </div>
    );
}