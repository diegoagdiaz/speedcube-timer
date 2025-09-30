import React, { useState, useRef, useEffect } from 'react';
import ScrambleDisplay from './ScrambleDisplay';

function Timer({ onSaveTime, scramble }) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [prepared, setPrepared] = useState(false);
  const startTimeRef = useRef(null);
  const intervalRef = useRef(null);

  const start = () => {
    setTime(0);
    setIsRunning(true);
    startTimeRef.current = performance.now();
    intervalRef.current = setInterval(() => {
      setTime((performance.now() - startTimeRef.current) / 1000);
    }, 10);
  };

  const stop = () => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(intervalRef.current);
      const finalTime = (performance.now() - startTimeRef.current) / 1000;
      setTime(finalTime);
      onSaveTime(finalTime);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isRunning) {
        stop();
      } else if (event.code === 'Space' && !prepared) {
        event.preventDefault();
        setPrepared(true);
      }
    };

    const handleKeyUp = (event) => {
      if (event.code === 'Space' && prepared && !isRunning) {
        event.preventDefault();
        setPrepared(false);
        start();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isRunning, prepared]); // eslint-disable-line react-hooks/exhaustive-deps

  const reset = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTime(0);
  };

  const formatTime = (t) => {
    const minutes = Math.floor(t / 60);
    const seconds = Math.floor(t % 60);
    const milliseconds = Math.floor((t % 1) * 100);
    return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

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
          color: isRunning ? '#ff6b6b' : prepared ? '#4ecdc4' : '#ffffff',
          transition: 'color 0.3s'
        }}
      >
        {formatTime(time)}
      </div>
      <div style={{ fontSize: '18px', color: '#cccccc' }}>
        {isRunning ? 'Press space to stop' : prepared ? 'Release space to start' : 'Hold space to prepare'}
      </div>
    </div>
  );
}

export default Timer;