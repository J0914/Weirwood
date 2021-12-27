import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as bookingsActions from '../../store/bookings';
import DeleteBookingModal from '../DeleteBookingModal'
import {AiFillCloseCircle} from 'react-icons/ai'

import styles from '../../css-modules/BookingModal.module.css'

export default function Booking ({setShowModal}) {
    const [edit, setEdit] = useState(false)
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    
    const [selectedStart, setSelectedStart] = useState(null);
    const [selectedEnd, setSelectedEnd] = useState(null);
    const [errors, setErrors] = useState([]);
    const [currentEle, setCurrentEle] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const bookings = useSelector(state => state.bookings.userBookings)
 
    useEffect(() => {
        if (selectedEnd !== selectedStart) {
            setSelectedEnd(selectedStart)
        }
    }, [selectedStart])

    const handleSubmit = (booking) => {
        setErrors([]);
        
        dispatch(bookingsActions.editBooking({bookingId: booking.id, spotId: booking.spotId, userId: booking.userId, start: selectedStart, end: selectedEnd}))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            } else if (data) {
                setIsSuccess(true)
            }
        }) 
        setCurrentEle(null);
        setEdit(false);
    }

    const handleEdit = (id, start, end) => {
        setEdit(true);
        setCurrentEle(id)
        setSelectedStart(start)
        setSelectedEnd(end)
    }
    
    
    return (
        <div id={styles.wrapper}>
            <div className={styles.btnWrapper}>
                <button className={styles.closeBtn} onClick={() => setShowModal(false)}><AiFillCloseCircle /></button>
            </div>
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
                        {edit && currentEle === booking.id?
                        <>
                        {console.log(booking)}
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
                                onClick={() => handleSubmit(booking)}
                                >Book!</button>                   
                                <button 
                                id={styles.delete} 
                                onClick={() => setEdit(false)}
                                >Cancel</button>                   
                                <DeleteBookingModal bookingId={booking.id}/>  
                            </div> 
                        </>
                        :
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
                                onClick={() => handleEdit(booking.id, booking.start, booking.end)}
                                id={styles.delete}>
                                Edit</button>                   
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


                