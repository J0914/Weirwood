import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as bookingsActions from '../../store/bookings'

import styles from '../../css-modules/Booking.module.css'

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
    const [success, setSuccess] = useState([]);

    useEffect(() => {
        setSelectedEnd(selectedStart)
    }, [selectedStart])
    
    const handleBookingSubmit= (e) => {
        e.preventDefault();

        if (user) {
            setErrors([]);
            
            const spotId = castle.id;
            const userId = user.id;
            dispatch(bookingsActions.createBooking({ spotId, userId, selectedStart, selectedEnd }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                } else if (stateErr !== null) {
                    setErrors(...errors ,stateErr);        
                } else {
                    setSuccess(['Congrats, you have created a booking for this casle!']);
                }
            })
    
        } else {
            setErrors(['You must be logged in to create a booking!'])
        }

       
    }
    
    useEffect(() => {
        if (stateErr)
        setTheStateErr(stateErr)
    },[stateErr])

    useEffect(() => {
        dispatch(bookingsActions.clearErrors());
        setErrors([])
    }, [castle])

    return (
        <div id={styles.formDiv} >
            <form id={styles.bookingForm} onSubmit={handleBookingSubmit}>
                <h3 className={styles.header}> Select your dates! </h3>
                {errors.length || theStateErr.length ? 
                <div className={styles.errors}>
                    <ul>
                        {success && success.map((error, idx) => <li className={styles.li} key={idx}>{error}</li>)}
                    </ul>
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