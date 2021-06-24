import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as bookingsActions from '../../store/bookings'

import styles from '../../css-modules/Login.module.css'

export default function BookingForm () {
    const user = useSelector(state => state.session.user)
    const castle = useSelector(state => state.spots.currentCastle)
    const stateErr = useSelector(state => state.bookings.errors)
    const dispatch = useDispatch();

    
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    
    const [selectedStart, setSelectedStart] = useState(today);
    const [selectedEnd, setSelectedEnd] = useState(selectedStart);
    const [errors, setErrors] = useState([]);
    const [theStateErr, setTheStateErr] = useState([]);

    useEffect(() => {
        setSelectedEnd(selectedStart)
    }, [selectedStart])
    
    const handleBookingSubmit= (e) => {
        e.preventDefault();
        setErrors([]);
        
        const spotId = castle.id;
        const userId = user.id;
        dispatch(bookingsActions.createBooking({ spotId, userId, selectedStart, selectedEnd }))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        })

        if (stateErr !== null)
        setErrors(...errors ,stateErr);        
    }
    
    useEffect(() => {
        if (stateErr)
        window.alert(stateErr)
        // setTheStateErr(stateErr)
    },[stateErr])

    return (
        <div id={styles.formDiv} >
            <form id={styles.bookingForm} onSubmit={handleBookingSubmit}>
                <h3> Book a stay! </h3>
                {errors.length || theStateErr.length ? 
                <div className={styles.errors}>
                    <ul>
                        {errors && errors.map((error, idx) => <li className={styles.li} key={idx}>{error}</li>)}
                    </ul>
                    <ul>
                        {theStateErr && theStateErr.map((error, idx) => <li className={styles.li} key={idx}>{error}</li>)}
                    </ul>
                </div> : null
                }
                <div className={styles.inputs}>
                    <label>
                        Start Date:
                    </label>
                    <input
                        type="date"
                        min={today}
                        value={selectedStart}
                        onChange={(e) => setSelectedStart(e.target.value)}
                        required
                    />
                    <label>
                        End Date:
                    </label>
                    <input
                        type="date"
                        value={selectedEnd}
                        min={selectedStart}
                        onChange={(e) => setSelectedEnd(e.target.value)}
                        required
                    />
                    <button className={styles.submitBtn} type="submit">Book!</button>
                </div>
            </form>
        </div>
    )
}