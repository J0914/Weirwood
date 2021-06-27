import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as bookingsActions from '../../store/bookings'

import styles from '../../css-modules/Booking.module.css'

export default function BookingForm ({setShowModal}) {
    const user = useSelector(state => state.session.user)
    const castle = useSelector(state => state.spots.currentCastle)
    const dispatch = useDispatch();
    
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    
    const [selectedStart, setSelectedStart] = useState(today);
    const [selectedEnd, setSelectedEnd] = useState(selectedStart);
    const [errors, setErrors] = useState([]);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

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
                if (data && data.errors) setErrors(data.errors);    
            })

            if (errors.length === 0) {
                setIsSubmitted(true);
                setIsSuccess(true);
            }
            
        } else {
            setErrors(['You must be logged in to create a booking!'])
        } 
        
        setTimeout (() => {
            setShowModal(false)
        }, 2500)
    }

    console.log(isSubmitted)
    
    useEffect(() => {
        if (errors.length > 0) setIsSuccess(false);
        if (isSubmitted && errors.length === 0) setIsSuccess(true);
    },[isSubmitted, errors])

    return (
        <div id={styles.bookingFormDiv} >
            <form id={styles.bookingForm} onSubmit={handleBookingSubmit}>
                <h3 className={styles.header}> Select your dates! </h3>
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
                        <li className={styles.li}>'Booking Successful!'</li>
                    </ul> 
                </div> 
                    : null
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
                </div>
                    <button className={styles.submitBtn} type="submit">Book!</button>
            </form>
        </div>
    )
}