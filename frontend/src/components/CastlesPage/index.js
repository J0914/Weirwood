import React from 'react';
import Spots from '../Spots'

import styles from '../../css-modules/CastlesPage.module.css'

const CastlesPage = ({allSpots}) => {
    const [currentSpots, setCurrentSpots] = React.useState(allSpots)
    const [region, setRegion] = React.useState('all')
    
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
    
    React.useEffect(() => {
        if (region === 'all') {
            getAll();
        }
        if (region === 'north') {
            getTheNorth();
        }
        if (region === 'south') {
            getTheSouth();
        }
        if (region === 'central') {
            getCentral();
        }
    }, [region])

    return (
        <div id={styles.castlesContainer}>
            <select 
            className={styles.btnContainer}
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            >
                <option value='all' className={styles.navBtns}> All </option>
                <option value='north' className={styles.navBtns}> North </option>
                <option value='central' className={styles.navBtns}> Central </option>
                <option value='south' className={styles.navBtns}> South </option>
            </select>
            <div id={styles.spots}>
            <Spots allSpots={currentSpots}/>
            </div>
        </div>
    );
}

export default CastlesPage;