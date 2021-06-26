import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as reviewsActions from '../../store/reviews'

import styles from '../../css-modules/DeleteModal.module.css'

export default function DeleteModal ({setShowModal, reviewId}) {

    const castle = useSelector(state => state.spots.currentCastle);
    const dispatch = useDispatch();

    const spotId = castle.id;

    const handleDelete = () => {
        dispatch(reviewsActions.deleteReview(spotId, reviewId))
    }

    const cancel = () => {
        setShowModal(false);
    }
    

    return (
        <div id={styles.deleteWrapper} >
            <div id={styles.deleteConfirm} >
                <p id={styles.pConfirm}>Are you sure you want to delete this review?</p>
            </div>
            <div id={styles.modalBtnsDiv}>
            <button onClick={handleDelete} className={styles.modalBtn}>Delete</button>
            <button onClick={cancel} className={styles.modalBtn}>Cancel</button>
            </div>
        </div>
    )
}