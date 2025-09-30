import React, { useState, useRef, useEffect } from 'react';
import ScrambleDisplay from './ScrambleDisplay';

function Timer({ onSaveTime, scramble, inspectionEnabled, inspectionDuration, onToggleInspection }) {
  const [time, setTime] = useState(0);
  const [state, setState] = useState('IDLE');
  const [inspectionStartTime, setInspectionStartTime] = useState(null);
  const [penalty, setPenalty] = useState(null);
  const [holdStart, setHoldStart] = useState(null);
  const [holdColor, setHoldColor] = useState(null);
  const [displayValue, setDisplayValue] = useState('0.00');
  const [inspectionTimeLeft, setInspectionTimeLeft] = useState(0);
  const [inspectionTick, setInspectionTick] = useState(0);
  const startTimeRef = useRef(null);
  const intervalRef = useRef(null);
  const inspectionIntervalRef = useRef(null);
  const holdTimeoutRef = useRef(null);
  const spacePressedDuringRunningRef = useRef(false);

  const start = () => {
    setTime(0);
    startTimeRef.current = performance.now();
    intervalRef.current = setInterval(() => {
      setTime((performance.now() - startTimeRef.current) / 1000);
    }, 10);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    const finalTime = (performance.now() - startTimeRef.current) / 1000;
    setTime(finalTime);
    onSaveTime(finalTime, penalty);
    setPenalty(null);
  };

  const cancelInspection = () => {
    clearInterval(inspectionIntervalRef.current);
    setInspectionStartTime(null);
    setInspectionTimeLeft(0);
    setInspectionTick(0);
    setState('IDLE');
    setPenalty(null);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'KeyI') {
        onToggleInspection();
        return;
      }
      if (state === 'INSPECTING' && event.code === 'Escape') {
        cancelInspection();
        return;
      }
      if (event.code === 'Space' && (state === 'IDLE' || state === 'INSPECTING')) {
        if (event.repeat) {
          return;
        }
        event.preventDefault();
        setHoldStart(performance.now());
        setHoldColor('orange');
        setDisplayValue(state === 'INSPECTING' ? Math.ceil(Math.max(0, inspectionDuration - ((performance.now() - inspectionStartTime) / 1000))).toString() : formatTime(time));
        holdTimeoutRef.current = setTimeout(() => {
          setHoldColor('green');
        }, 200);
        return;
      }
      if (event.code === 'Space' && state === 'READY') {
        event.preventDefault();
        return;
      }
      if (state === 'RUNNING' && event.code !== 'KeyI' && event.code !== 'Escape') {
        event.preventDefault();
        stop();
        reset();
        if (event.code === 'Space') {
          spacePressedDuringRunningRef.current = true;
        }
        return;
      }
    };

    const handleKeyUp = (event) => {
      if (event.code === 'Space') {
        if (spacePressedDuringRunningRef.current) {
          spacePressedDuringRunningRef.current = false;
          return;
        }
        if (holdStart) {
          event.preventDefault();
          const holdTime = performance.now() - holdStart;
          clearTimeout(holdTimeoutRef.current);
          setHoldStart(null);
          setHoldColor(null);
          if (holdTime > 200) {
            if (state === 'IDLE') {
              if (inspectionEnabled) {
                setState('INSPECTING');
                setInspectionStartTime(performance.now());
                setInspectionTimeLeft(inspectionDuration);
                setInspectionTick(0);
                inspectionIntervalRef.current = setInterval(() => {
                  setInspectionTick(prev => prev + 1);
                }, 500);
              } else {
                setState('RUNNING');
                start();
              }
            } else if (state === 'INSPECTING') {
              clearInterval(inspectionIntervalRef.current);
              const elapsed = (performance.now() - inspectionStartTime) / 1000;
              if (elapsed > inspectionDuration + 2) {
                setPenalty('DNF');
                setState('RUNNING');
                start();
              } else if (elapsed > inspectionDuration) {
                setPenalty('+2');
                setState('RUNNING');
                start();
              } else {
                setPenalty(null);
                setState('RUNNING');
                start();
              }
            }
          }
          return;
        }
        if (state === 'READY') {
          event.preventDefault();
          setState('RUNNING');
          start();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [state, inspectionStartTime, inspectionDuration, inspectionEnabled, holdStart, time, penalty, onSaveTime]); // eslint-disable-line react-hooks/exhaustive-deps

  const reset = () => {
    clearInterval(intervalRef.current);
    clearInterval(inspectionIntervalRef.current);
    setTime(0);
    setInspectionStartTime(null);
    setInspectionTimeLeft(0);
    setInspectionTick(0);
    setPenalty(null);
    setState('IDLE');
    setHoldStart(null);
    setHoldColor(null);
    setDisplayValue('0.00');
    clearTimeout(holdTimeoutRef.current);
  };

  const formatTime = (t) => {
    const minutes = Math.floor(t / 60);
    const seconds = Math.floor(t % 60);
    const milliseconds = Math.floor((t % 1) * 100);
    return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  const getDisplayText = () => {
    if (holdStart) return displayValue;
    if (state === 'INSPECTING') {
      const elapsed = (performance.now() - inspectionStartTime) / 1000;
      let display;
      if (elapsed > inspectionDuration + 2) display = 'DNF';
      else if (elapsed > inspectionDuration) display = '+2';
      else display = Math.ceil(Math.max(0, inspectionDuration - elapsed));
      return display;
    }
    if (state === 'STOPPED' && penalty === 'DNF') return 'DNF';
    return formatTime(time);
  };

  const getDisplayColor = () => {
    const text = getDisplayText();
    if (text === '+2') return 'orange';
    if (text === 'DNF') return 'red';
    if (state === 'READY') return 'rgba(0,255,0,0.7)';
    if (holdColor) return holdColor === 'orange' ? 'rgba(255,165,0,0.7)' : 'rgba(0,255,0,0.7)';
    return 'var(--white)';
  };

  const displayText = getDisplayText();
  const displayColor = getDisplayColor();

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        cursor: 'pointer',
        userSelect: 'none'
      }}
      onClick={reset}
    >
      <ScrambleDisplay scramble={scramble} />
      <div
        style={{
          fontSize: '120px',
          fontFamily: 'monospace',
          marginBottom: '20px',
          transition: 'color 0.3s',
          color: displayColor,
          position: 'relative'
        }}
      >
        {displayText}
      </div>
      <div style={{ fontSize: '16px', color: inspectionEnabled ? 'green' : 'gray', textShadow: inspectionEnabled ? '0 0 5px green' : 'none' }}>
        Inspection
      </div>
      <div style={{ fontSize: '18px', color: state === 'INSPECTING' ? 'green' : 'gray' }}>
        {state === 'IDLE' ? 'Hold Space to Start' : state === 'INSPECTING' ? 'Hold Space to start' : state === 'READY' ? 'Ready' : state === 'RUNNING' ? 'Press any key to stop' : 'Click to reset'}
      </div>
    </div>
  );
}

export default Timer;