import React from 'react';
import { Link } from 'react-router-dom'
import styles from '../../css-modules/Spots.module.css';


const Spots = ({allSpots}) => {

    return (
        <div id={styles.spots}> 
            {allSpots && allSpots.map(spot => (
                <Link  to={`/castles/${spot.id}`}>
                    <div key={spot.id} className={styles.spotContainer}>
                        <div className={styles.spotImg} key={spot.id} >     
                            <img className={styles.img} src={spot.Images[0].url} alt={spot.title}></img>
                        </div>
                        <div className={styles.textHeaderDiv}>
                            <div id={styles.leftSide}>
                                <label id={styles.price} className={styles.spotLabel}>{spot.price} Gold Dragons</label>
                                <label id={styles.perWeek} className={styles.spotLabel}>weekly</label>
                            </div>
                            <div id={styles.rightSide}>
                                <label className={styles.spotLabel}>{spot.title}</label>
                                <label id={styles.location} className={styles.spotLabel}>{spot.location}</label>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
            </div>
    )
}

export default Spots;