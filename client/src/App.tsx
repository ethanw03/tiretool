import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import './App.css';

type Tire = {
  id?: number;
  rimSize: string;
  width: string;
  aspectRatio: string;
};

function App() {
  const [tire, setTire] = useState<Tire>({ rimSize: '', width: '', aspectRatio: '' });
  const [tireList, setTireList] = useState<Tire[]>([]);
  const [singleTire, setSingleTire] = useState<Tire | null>(null);
  const [tireId, setTireId] = useState<number | undefined>(); 


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTire({ ...tire, [e.target.name]: e.target.value });
  };

  const handleTireIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTireId(parseInt(e.target.value)); // Update tireId state
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/tire/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tire)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Tire added', data);
    } catch (error) {
      console.error('Error adding tire', error);
    }
  };

  const getSingleTire = async () => {
    if (!tireId) return; // Check if tireId is defined
    try {
      const response = await fetch(`/api/tires/${tireId}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setSingleTire(data[0]); // Set singleTire with the first element of the array
    } catch (error) {
      console.error('Error fetching tire', error);
    }
  };

  
  const handleFetchTires = async () => {
    try {
      const response = await fetch('/api/tires/list');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setTireList(data);
    } catch (error) {
      console.error('Error fetching tires', error);
    }
  };

  return (
    <div>
      <h1>React App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="rimSize"
          placeholder="Rim Size"
          value={tire.rimSize}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="width"
          placeholder="Width"
          value={tire.width}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="aspectRatio"
          placeholder="Aspect Ratio"
          value={tire.aspectRatio}
          onChange={handleInputChange}
          required
        />
        <br></br>
        <button type="submit">Add Tire</button>
      </form>
      <h2>Tire List</h2>
      <button onClick={handleFetchTires}>Show Tires</button>
      <ul>
      {tireList.map((t) => (
        <li key={t.id}>
          Tire ID: {t.id}, <br></br> Rim Size: {t.rimSize}, Width: {t.width}, Aspect Ratio: {t.aspectRatio}
          <br></br>
          <br></br>
        </li>
      ))}
      </ul>

      <h2> Get tire by id </h2>
      <form>
        <input
          type="number"
          name="id"
          placeholder="Tire ID"
          onChange={handleTireIdChange} // Use handleTireIdChange here
          required
        />
        <button type="button" onClick={getSingleTire}>Get Tire</button>
      </form>
      {singleTire && (
        <div>
          <h3>Single Tire Details</h3>
          <p>Tire ID: {singleTire.id}</p>
          <p>Rim Size: {singleTire.rimSize}</p>
          <p>Width: {singleTire.width}</p>
          <p>Aspect Ratio: {singleTire.aspectRatio}</p>
        </div>
      )}

    </div>
  );
}

export default App;
