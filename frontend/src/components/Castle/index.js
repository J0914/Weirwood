import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as spotsActions from '../../store/spots'


import styles from '../../css-modules/Castle.module.css'


export default function Castle () {
    const { id } = useParams();
    const dispatch = useDispatch();
    const castle = useSelector(state => state.spots.currentCastle)
    const [end, setEnd] = useState('null');
    
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;

    const [selectedStart, setSelectedStart] = useState(today);
    const [selectedEnd, setSelectedEnd] = useState(selectedStart);
    
    useEffect(() => {
        dispatch(spotsActions.getSingleSpot(id))
    }, [dispatch, id])

    useEffect(() => {
        setSelectedEnd(selectedStart)
    }, [selectedStart])

    const handleSubmit= () => {
        return null;
    }


    return (
        // <div className={styles.background}>
            <div id={styles.castleContainer}>
                {castle && 
                <>
                <div id={styles.header}>
                    <div id={styles.headTop}>
                    <h2 id={styles.title}> {castle.title} </h2>
                    </div>
                    <div id={styles.headBottom}>
                    <label id={styles.price}>{castle.price} Gold Dragons</label>
                    <h3 id={styles.location}>{castle.location}</h3>
                    </div>
                </div>
                <div id={styles.imgContainer}>
                    <img className={styles.img} src={castle.Images[0].url} alt={castle.title}></img>
                </div>
                <div id={styles.info}>
                    <p id={styles.description}>{castle.description}</p>
                </div>
                    <div id={styles.formDiv} >
                    <form id={styles.bookingForm} onSubmit={handleSubmit}>
                        <h3> Book a stay! </h3>
                        {/* {errors.length ? 
                        <div className={styles.errors}>
                            <ul>
                                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                            </ul>
                        </div> : null
                        } */}
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
                </>
                }
            </div>
    );
}