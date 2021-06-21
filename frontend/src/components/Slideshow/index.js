import React from 'react';
import { useSelector } from 'react-redux';
import Spots from '../Spots';

import '../../css-modules/Slideshow.css'
import styles from '../../css-modules/Spots.module.css';

function Slideshow() {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);
  const allSpots = useSelector((state) => state.spots.list);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
      resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
            allSpots && prevIndex === allSpots.length - 1 ? 0 : prevIndex + 1  
        ),
      5000
    );

    return () => {};
  }, [index]);

  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {allSpots && allSpots.map((spot, index) => (
          <div
            className="slide"
            key={index}
          >
              <div className={styles.spotImg} key={spot.id} >
                    <div className={styles.textDiv}>
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
                        <p className={styles.description}>{spot.description}</p>
                    </div>
                    <img className={styles.img} src={spot.Images[0].url} alt={spot.title}></img>
                </div> 
          </div>
        ))}
      </div>

      <div className="slideshowDots">
        {allSpots && allSpots.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
                setIndex(idx);
              }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Slideshow;