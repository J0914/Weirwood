import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import styles from '../../css-modules/Spots.module.css';


const Spots = () => {
    const [spots, setSpots] = useState(null)
    const allSpots = useSelector((state) => state.spots.list);

    useEffect(() => {
        setSpots(allSpots)
    }, [spots, allSpots])

    return (
        <div id={styles.spots}> 
            {spots && spots.map(spot => (
                <div className={styles.spotImg} key={spot.id} >
                    <div className={styles.textDiv}>
                        <div className={styles.textHeaderDiv}>
                        <label className={styles.spotLabel}>{spot.title}</label>
                        <label id={styles.location} className={styles.spotLabel}>{spot.location}</label>
                        </div>
                        <p className={styles.description}>{spot.description}</p>
                    </div>
                    <img className={styles.img} src={spot.Images[0].url} alt={spot.title}></img>
                </div>
            ))}
            </div>
    )
}

export default Spots;