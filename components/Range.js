import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRange } from '../store/rangeSlice';
import axios from 'axios';
import styles from '../styles/Range.module.css';

const Range = ({ mode, rangeColor = '#ccc', bulletColor = '#000' }) => {
  const dispatch = useDispatch();
  const { min, max, rangeValues, selectedRange } = useSelector((state) => state.range);
  const [currentMin, setCurrentMin] = useState(selectedRange.min);
  const [currentMax, setCurrentMax] = useState(selectedRange.max);
  const rangeRef = useRef(null);
  const draggingRef = useRef(null);


//   const NORMAL_RANGE_URL = 'http://localhost:3001/range';
//   const FIXED_VALUES_URL = 'http://localhost:3001/rangeValues';

  const NORMAL_RANGE_URL = 'http://demo5589640.mockable.io/range';
  const FIXED_VALUES_URL = 'http://demo5589640.mockable.io/rangeValues';

  useEffect(() => {
    if (mode === 'normal') {
      axios.get(NORMAL_RANGE_URL).then(response => {
        console.log(response)
        const { min, max } = response.data;
        setCurrentMin(min);
        setCurrentMax(max);
        dispatch(setRange({ min, max }));
      });
    } else {
      axios.get(FIXED_VALUES_URL).then(response => {
        console.log(response)
        const rangeValues = response.data.values;
        setCurrentMin(rangeValues[0]);
        setCurrentMax(rangeValues[rangeValues.length - 1]);
        dispatch(setRange({ min: rangeValues[0], max: rangeValues[rangeValues.length - 1] }));
      });
    }
  }, [mode, dispatch]);

  const handleDrag = (e) => {
    if (!draggingRef.current) return;

    const rangeWidth = rangeRef.current.offsetWidth;
    const rect = rangeRef.current.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const offsetX = clientX - rect.left;
    const newValue = min + ((offsetX / rangeWidth) * (max - min));

    let closestValue = rangeValues.reduce((prev, curr) => {
      return Math.abs(curr - newValue) < Math.abs(prev - newValue) ? curr : prev;
    });

    if (draggingRef.current === 'min' && closestValue < currentMax) {
      setCurrentMin(closestValue);
      dispatch(setRange({ min: closestValue, max: currentMax }));
    } else if (draggingRef.current === 'max' && closestValue > currentMin) {
      setCurrentMax(closestValue);
      dispatch(setRange({ min: currentMin, max: closestValue }));
    }
  };

  const startDrag = (e, bullet) => {
    e.preventDefault();
    draggingRef.current = bullet;
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('touchmove', handleDrag);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);
  };

  const endDrag = () => {
    draggingRef.current = null;
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('touchmove', handleDrag);
    document.removeEventListener('mouseup', endDrag);
    document.removeEventListener('touchend', endDrag);
  };

  const handleFixedValueClick = (value) => {
    if (draggingRef.current === 'min' && value < currentMax) {
      setCurrentMin(value);
      dispatch(setRange({ min: value, max: currentMax }));
    } else if (draggingRef.current === 'max' && value > currentMin) {
      setCurrentMax(value);
      dispatch(setRange({ min: currentMin, max: value }));
    }
  };

  return (
    <div className={styles.rangeContainer}>
      {mode === 'normal' && (
        <div className={styles.rangeLabels}>
          <input
            type="number"
            value={currentMin.toFixed(2)}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (value >= min && value <= currentMax) {
                setCurrentMin(value);
                dispatch(setRange({ min: value, max: currentMax }));
              }
            }}
          />
          <span>€</span>
          <input
            type="number"
            value={currentMax.toFixed(2)}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (value <= max && value >= currentMin) {
                setCurrentMax(value);
                dispatch(setRange({ min: currentMin, max: value }));
              }
            }}
          />
          <span>€</span>
        </div>
      )}
      <div className={styles.rangeSliderContainer}>
        <div className={styles.rangeSlider} ref={rangeRef} style={{ backgroundColor: rangeColor }}>
          <div
            className={styles.rangeBullet}
            style={{ left: `${((currentMin - min) / (max - min)) * 100}%`, backgroundColor: bulletColor }}
            onMouseDown={(e) => startDrag(e, 'min')}
            onTouchStart={(e) => startDrag(e, 'min')}
          />
          <div
            className={styles.rangeBullet}
            style={{ left: `${((currentMax - min) / (max - min)) * 100}%`, backgroundColor: bulletColor }}
            onMouseDown={(e) => startDrag(e, 'max')}
            onTouchStart={(e) => startDrag(e, 'max')}
          />
        </div>
        {mode === 'fixed' && (
          <div className={styles.fixedValues}>
            {rangeValues.map((value, index) => (
              <span
                key={value}
                className={styles.valueLabel}
                style={{ left: `${(index / (rangeValues.length - 1)) * 100}%` }}
              >
                {value.toFixed(2)} €
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Range;
