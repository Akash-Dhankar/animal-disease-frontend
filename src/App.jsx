import { useState } from 'react';
import './App.css';

function App() {
  const [symptoms, setSymptoms] = useState('');
  const [prediction, setPrediction] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/predict`, {
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
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setPrediction('');
      setError('Failed to connect to backend');
    }
  };

  return (
    <div className="app">
      <h1>Animal Disease Predictor</h1>
      <textarea
        rows="5"
        cols="50"
        placeholder="Describe the animal's symptoms in detail..."
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
