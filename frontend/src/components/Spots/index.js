import React from 'react';
import { Link } from 'react-router-dom'
import styles from '../../css-modules/Spots.module.css';


const Spots = ({allSpots}) => {

    return (
        <div id={styles.spotsDiv}> 
            {allSpots && allSpots.map(spot => (
                <Link key={spot.id} className={styles.link}  to={`/castles/${spot.id}`}>
                    <div className={styles.spotContainer}>
                        <div className={styles.spotImg} key={spot.id} >     
                            <img className={styles.img} src={spot.Images[0].url} alt={spot.title}></img>
                        </div>
                        <div className={styles.textHeaderDiv}>
                            <div id={styles.leftSide}>
                                <label id={styles.price} className={styles.spotLabel}>{spot.price} Gold Dragons</label>
                                <label id={styles.perWeek} className={styles.spotLabel}>weekly</label>
                            </div>
                            <div id={styles.rightSide}>
                                <div id={styles.titleDiv}>
                                <label className={styles.spotLabel}>{spot.title}</label>
                                </div>
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