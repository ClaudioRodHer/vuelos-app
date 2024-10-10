import React, { useState } from 'react';

const SelectForm = ({ onSearch }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [airline, setAirline] = useState('');
  const [flightNum, setFlightNum] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ origin, destination, airline, flightNum });
  };

  return (
    <div className="select-form">
      <h2>Selecciona los datos de tu vuelo</h2>
      <form onSubmit={handleSubmit}>
        <select value={origin} onChange={(e) => setOrigin(e.target.value)} required>
          <option value="">-Selecciona un origen-</option>
          {/* Agrega aquí más opciones de origen */}
          <option value="MEX">MEX</option>
          <option value="LAX">LAX</option>
        </select>

        <select value={destination} onChange={(e) => setDestination(e.target.value)} required>
          <option value="">-Selecciona un destino-</option>
          {/* Agrega aquí más opciones de destino */}
          <option value="CDG">CDG</option>
          <option value="JFK">JFK</option>
        </select>

        <select value={airline} onChange={(e) => setAirline(e.target.value)} required>
          <option value="">-Selecciona una aerolínea-</option>
          {/* Agrega aquí más opciones de aerolínea */}
          <option value="AF">Air France</option>
          <option value="AM">Aeroméxico</option>
        </select>

        <select value={flightNum} onChange={(e) => setFlightNum(e.target.value)} required>
          <option value="">-Selecciona un número de vuelo-</option>
          {/* Agrega aquí más números de vuelo */}
          <option value="179">179</option>
          <option value="100">100</option>
        </select>

        <button type="submit">Buscar</button>
      </form>
    </div>
  );
};

export default SelectForm;
