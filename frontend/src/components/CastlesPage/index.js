import React from 'react';
import Spots from '../Spots'

import styles from '../../css-modules/CastlesPage.module.css'

const CastlesPage = ({allSpots}) => {
    const [currentSpots, setCurrentSpots] = React.useState(allSpots)
    
    const getTheNorth = () => {
        const res = allSpots.filter(spot => spot.regionId === 1);
        setCurrentSpots(res);
    }

    const getTheSouth = () => {
        const res = allSpots.filter(spot => spot.regionId === 2);
        setCurrentSpots(res);
    }

    const getCentral = () => {
        const res = allSpots.filter(spot => spot.regionId === 3);
        setCurrentSpots(res);
    }

    const getAll = () => {
        setCurrentSpots(allSpots)
    }

    React.useEffect(() => {
        setCurrentSpots(allSpots)
    }, [allSpots])     

    return (
        <div id={styles.castlesContainer}>
            <div className={styles.btnContainer}>
                <button onClick={() => getAll()} className={styles.navBtns}> All </button>
                <button onClick={() => getTheNorth()} className={styles.navBtns}> The North </button>
                <button onClick={() => getTheSouth()} className={styles.navBtns}> The South </button>
                <button onClick={() => getCentral()} className={styles.navBtns}> Central </button>
            </div>
            <div id={styles.spots}>
            <Spots allSpots={currentSpots}/>
            </div>
        </div>
    );
}

export default CastlesPage;