import React from 'react';
import { useSelector } from 'react-redux';

import '../../css-modules/Slideshow.css'

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
  }, [index, allSpots]);

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
              <div className='spotImg' key={spot.id} >
                    <div className='textDiv'>
                        <div className='textHeaderDiv'>
                          <div id='leftSide'>
                            <label id='price' className='spotLabel'>{spot.price} Gold Dragons</label>
                            <label id='perWeek' className='spotLabel'>weekly</label>
                          </div>
                          <div id='rightSide'>
                            <label className='spotLabel'>{spot.title}</label>
                            <label id='location' className='spotLabel'>{spot.location}</label>
                          </div>
                        </div>
                        <p className='description'>{spot.description}</p>
                    </div>
                    <img className='img' src={spot.Images[0].url} alt={spot.title}></img>
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