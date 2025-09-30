import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { calculateMeanOf3, calculateAverageOf5, getBestTime, getWorstTime, getSessionAverage } from '../utils/calculations';

function Stats({ solves }) {
  const validSolves = solves.filter(solve => solve.penalty !== 'DNF');
  const times = validSolves.map(solve => solve.penalty === '+2' ? solve.baseTime + 2 : solve.baseTime);

  const mean3 = calculateMeanOf3(times);
  const ao5 = calculateAverageOf5(times);
  const best = getBestTime(times);
  const worst = getWorstTime(times);
  const sessionAvg = getSessionAverage(times);

  // Prepare data for chart: times over solves
  const chartData = validSolves.map((solve, index) => ({
    solve: index + 1,
    time: solve.penalty === '+2' ? solve.baseTime + 2 : solve.baseTime,
  }));

  return (
    <div style={{ backgroundColor: 'rgba(26, 26, 26, 0.9)', padding: '10px', borderRadius: '5px' }}>
      <h2 style={{ marginTop: 0, marginBottom: '15px', fontWeight: 'bold', textAlign: 'center' }}>Statistics</h2>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Mean of 3:</span><span>{mean3 ? mean3.toFixed(2) + 's' : 'N/A'}</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Average of 5:</span><span>{ao5 ? ao5.toFixed(2) + 's' : 'N/A'}</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Best Time:</span><span>{best ? best.toFixed(2) + 's' : 'N/A'}</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Worst Time:</span><span>{worst ? worst.toFixed(2) + 's' : 'N/A'}</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Session Average:</span><span>{sessionAvg ? sessionAvg.toFixed(2) + 's' : 'N/A'}</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Total Solves:</span><span>{solves.length}</span></div>
      </div>
      {chartData.length > 0 && (
        <div style={{ width: '100%', height: 200 }}>
          <h3>Time Trend</h3>
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="solve" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="time" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default Stats;