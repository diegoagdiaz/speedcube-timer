import React from 'react';

const Tutorial = () => {
  return (
    <div style={{ backgroundColor: 'var(--black)', color: 'var(--white)', marginLeft: '200px', padding: '20px' }}>
      <h1>Speedcube Timer Tutorial</h1>

      <h2>Basic Timing</h2>
      <p>To start the main timer without inspection, press the spacebar or click the timer display. The timer will begin counting immediately. To stop the timer, press the spacebar again or click the timer display once more. Your solve time will be recorded automatically.</p>

      <h2>Inspection Feature</h2>
      <p>The inspection feature can be toggled on or off by pressing the 'I' key. When enabled, the full sequence is as follows:</p>
      <ul>
        <li>Start inspection by pressing the spacebar or clicking the timer display. A 15-second countdown begins.</li>
        <li>If you exceed 15 seconds, a +2 penalty is applied. If you exceed 17 seconds, the solve is marked as DNF (Did Not Finish).</li>
        <li>After inspection, press the spacebar or click to start the solve timer.</li>
        <li>To reset the timer at any point during inspection or solving, press the 'Esc' key.</li>
      </ul>

      <h2>Managing Solves</h2>
      <p>Your solve list can be viewed on the Timer page. To add penalties:</p>
      <ul>
        <li>Click on a solve time in the list to open the details modal.</li>
        <li>Select '+2' to add a 2-second penalty or 'DNF' to mark the solve as Did Not Finish.</li>
      </ul>
      <p>To delete a solve, click the delete button (trash icon) next to the solve in the list.</p>

      <h2>Navigation</h2>
      <p>The app has three main pages accessible via the sidebar:</p>
      <ul>
        <li><strong>Timer:</strong> The main page for timing solves, viewing scrambles, and managing your solve list.</li>
        <li><strong>Stats:</strong> View detailed statistics and analysis of your solving performance.</li>
        <li><strong>Settings:</strong> Customize timer preferences, inspection settings, and other app configurations.</li>
      </ul>
    </div>
  );
};

export default Tutorial;