import { useState } from 'react';
import './App.css';

function App() {
  const [symptoms, setSymptoms] = useState('');
  const [prediction, setPrediction] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms }),
      });

      const data = await response.json();
      if (response.ok) {
        setPrediction(data.predicted_disease);
        setError('');
      } else {
        setPrediction('');
        setError(data.error || 'An error occurred');
      }
    } catch (err) {
      setPrediction('');
      setError('Could not connect to backend');
    }
  };

  return (
    <div className="app">
      <h1>Animal Disease Predictor</h1>
      <textarea
        rows="5"
        cols="50"
        placeholder="Enter symptoms like 'depression painless lumps'"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Predict</button>
      {prediction && <h3>Prediction: {prediction}</h3>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
