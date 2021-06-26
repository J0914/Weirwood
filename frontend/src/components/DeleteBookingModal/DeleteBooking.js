import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as bookingsActions from '../../store/bookings'

import styles from '../../css-modules/DeleteModal.module.css'

export default function DeleteModal ({setShowModal, bookingId}) {

    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const userId = user.id

    const handleDelete = () => {
        dispatch(bookingsActions.deleteBooking(userId, bookingId))
    }

    const cancel = () => {
        setShowModal(false);
    }
    

    return (
        <div id={styles.deleteWrapper} >
            <div id={styles.deleteConfirm} >
                <p id={styles.pConfirm}>Are you sure you want to delete this booking?</p>
            </div>
            <div id={styles.modalBtnsDiv}>
            <button onClick={handleDelete} className={styles.modalBtn}>Delete</button>
            <button onClick={cancel} className={styles.modalBtn}>Cancel</button>
            </div>
        </div>
    )
}