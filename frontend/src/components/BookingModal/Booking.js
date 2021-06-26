import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as bookingsActions from '../../store/bookings';
import DeleteBookingModal from '../DeleteBookingModal'

import styles from '../../css-modules/BookingModal.module.css'

export default function Booking () {
    const [edit, setEdit] = useState(false)
    const castle = useSelector(state => state.spots.currentCastle);
    const user = useSelector(state => state.session.user);
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
    const bookings = useSelector(state => state.bookings.userBookings)
 
    useEffect(() => {
        if (selectedEnd !== selectedStart) {
            setSelectedEnd(selectedStart)
        }
    }, [selectedStart])

    const handleSubmit = (bookingId) => {
        setErrors([]);
        
        const spotId = castle.id;
        const userId = user.id;
        dispatch(bookingsActions.editBooking({bookingId, spotId, userId, selectedStart, selectedEnd}))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            } else if (data) {
                setIsSuccess(true)
            }
        }) 
        setEdit(false);
    }

    const handleDelete = () => {

    }
    
    
    return (
        <div id={styles.wrapper}>
            <div id={styles.headerDiv} >
                <h2 id={styles.header}>Current Bookings</h2>
                <p className={styles.pHeader}>Check-in is at 11am, payment is due at check-in.</p>
            </div>
            <div id={styles.bookingsDiv}>
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
                            <li className={styles.li}>'Edit Successful!'</li>
                        </ul> 
                    </div> 
                : null
                } 
                {bookings.length ? bookings.map(booking => (
                    <div key={booking.id} id={styles.bookingDiv}>
                        <label className={styles.label}>Castle:</label>
                        <p className={styles.p}>{booking.Spot.title}</p>
                        <label className={styles.label}>Location:</label>
                        <p className={styles.p}>{booking.Spot.location}</p>
                        <label className={styles.label}>Price:</label>
                        <p className={styles.p}>{booking.Spot.price} gold dragons</p>
                        {!edit ?
                        <>
                        <div id={styles.datesContainer}>
                            <div className={styles.dateDivs}>
                                <label className={styles.label}>Check-in Date:</label>
                                <p className={styles.p}>{booking.start}</p>
                            </div>
                            <div className={styles.dateDivs}>
                                <label className={styles.label}>Check-out Date:</label>
                                <p className={styles.p}>{booking.end}</p>
                            </div>
                        </div>
                        <div id={styles.deleteDiv}>   
                            <button
                                onClick={() => setEdit(true)}
                                id={styles.delete}>
                                Edit</button>                   
                            <DeleteBookingModal bookingId={booking.id}/>    
                        </div> 
                        </>
                        :
                        <>
                        <div id={styles.datesContainer}>
                            <div className={styles.dateDivs}>
                                <label className={styles.label}>Check-in Date:</label>
                                <input
                                    className={styles.input}
                                    type="date"
                                    min={today}
                                    value={selectedStart}
                                    onChange={(e) => setSelectedStart(e.target.value)}
                                    required
                                />
                            </div>
                            <div className={styles.dateDivs}>
                                <label className={styles.label}>Check-out Date:</label>
                                <input
                                    className={styles.input}
                                    type="date"
                                    value={selectedEnd}
                                    min={selectedStart}
                                    onChange={(e) => setSelectedEnd(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                            <div id={styles.deleteDiv}>   
                                <button 
                                id={styles.delete} 
                                onClick={() => handleSubmit(booking.id)}
                                >Book!</button>                   
                                <DeleteBookingModal bookingId={booking.id}/>  
                            </div> 
                        </>
                        }
                        
                    </div>
                ))
                :
                <div id={styles.bookingDiv}>
                    <p id={styles.empty}>You do not have any bookings!</p>
                </div>
                } 
            </div>
        </div>
    )
}


                