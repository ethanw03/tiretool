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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTire({ ...tire, [e.target.name]: e.target.value });
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
        <button type="submit">Add Tire</button>
      </form>
      <button onClick={handleFetchTires}>Show Tires</button>

      <h2>Tire List</h2>
      <ul>
      {tireList.map((t) => (
        <li key={t.id}>
          Tire ID: {t.id}, <br></br> Rim Size: {t.rimSize}, Width: {t.width}, Aspect Ratio: {t.aspectRatio}
          <br></br>
          <br></br>
        </li>
        
      ))}

      </ul>
 

    </div>
  );
}

export default App;
