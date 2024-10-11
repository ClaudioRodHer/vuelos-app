import { createClient } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';

const supabaseUrl = 'https://ozkrsfyljtngzakkdhxv.supabase.co';
const supabaseKey = 'numerodeapisupabse';
const supabase = createClient(supabaseUrl, supabaseKey);

const SelectForm = ({ onSearch }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [airline, setAirline] = useState('');
  const [flightNum, setFlightNum] = useState('');

  const [origins, setOrigins] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [filteredAirlines, setFilteredAirlines] = useState([]);
  const [filteredFlightNums, setFilteredFlightNums] = useState([]);

  // Cargar los datos iniciales desde Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: vueloData, error } = await supabase.from('vuelos').select('*');
        if (error) throw error;

        // Deduplicar orígenes
        const uniqueOrigins = [...new Set(vueloData.map(item => item.origin))];
        setOrigins(uniqueOrigins);

      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  // Filtrar destinos y aerolíneas basados en el origen seleccionado
  const filterDataByOrigin = async (selectedOrigin) => {
    try {
      const { data: vueloData, error } = await supabase.from('vuelos').select('*').eq('origin', selectedOrigin);
      if (error) throw error;

      // Filtrar destinos en base al origen seleccionado
      const uniqueDestinations = [...new Set(vueloData.map(item => item.destination))];
      setFilteredDestinations(uniqueDestinations);

      // Limpiar las aerolíneas y vuelos cuando se cambia el origen
      setFilteredAirlines([]);
      setFilteredFlightNums([]);
    } catch (error) {
      console.error('Error al filtrar los datos:', error);
    }
  };

  // Filtrar aerolíneas basadas en el destino seleccionado
  const filterAirlinesByDestination = async (selectedDestination) => {
    try {
      const { data: vueloData, error } = await supabase.from('vuelos').select('*').eq('origin', origin).eq('destination', selectedDestination);
      if (error) throw error;

      // Filtrar aerolíneas en base al destino seleccionado
      const uniqueAirlines = [...new Set(vueloData.map(item => item.airline))];
      setFilteredAirlines(uniqueAirlines);

      // Limpiar vuelos cuando se cambia el destino
      setFilteredFlightNums([]);
    } catch (error) {
      console.error('Error al filtrar las aerolíneas:', error);
    }
  };

  // Filtrar vuelos basados en la aerolínea seleccionada
  const filterFlightNumsByAirline = async (selectedAirline) => {
    try {
      const { data: vueloData, error } = await supabase
        .from('vuelos')
        .select('*')
        .eq('origin', origin)
        .eq('destination', destination)
        .eq('airline', selectedAirline);

      if (error) throw error;

      // Filtrar números de vuelo en base a la aerolínea seleccionada
      const uniqueFlightNums = [...new Set(vueloData.map(item => item.flight_num))];
      setFilteredFlightNums(uniqueFlightNums);
    } catch (error) {
      console.error('Error al filtrar los números de vuelo:', error);
    }
  };

  // Manejar el cambio de origen y filtrar los destinos
  const handleOriginChange = (e) => {
    const selectedOrigin = e.target.value;
    setOrigin(selectedOrigin);
    filterDataByOrigin(selectedOrigin); // Filtrar los datos en base al origen
  };

  // Manejar el cambio de destino y filtrar las aerolíneas
  const handleDestinationChange = (e) => {
    const selectedDestination = e.target.value;
    setDestination(selectedDestination);
    filterAirlinesByDestination(selectedDestination); // Filtrar las aerolíneas en base al destino
  };

  // Manejar el cambio de aerolínea y filtrar los números de vuelo
  const handleAirlineChange = (e) => {
    const selectedAirline = e.target.value;
    setAirline(selectedAirline);
    filterFlightNumsByAirline(selectedAirline); // Filtrar los números de vuelo en base a la aerolínea
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Datos enviados:', { origin, destination, airline, flightNum });

    onSearch({ origin, destination, airline, flightNum });
  };

  return (
    <div className="select-form">
      <h2>Selecciona los datos de tu vuelo</h2>
      <form onSubmit={handleSubmit}>
        <select value={origin} onChange={handleOriginChange} required>
          <option value="">-Selecciona un origen-</option>
          {origins.map((originItem, index) => (
            <option key={index} value={originItem}>{originItem}</option>
          ))}
        </select>

        <select value={destination} onChange={handleDestinationChange} required>
          <option value="">-Selecciona un destino-</option>
          {filteredDestinations.map((destinationItem, index) => (
            <option key={index} value={destinationItem}>{destinationItem}</option>
          ))}
        </select>

        <select value={airline} onChange={handleAirlineChange} required>
          <option value="">-Selecciona una aerolínea-</option>
          {filteredAirlines.map((airlineItem, index) => (
            <option key={index} value={airlineItem}>{airlineItem}</option>
          ))}
        </select>

        <select value={flightNum} onChange={(e) => setFlightNum(e.target.value)} required>
          <option value="">-Selecciona un número de vuelo-</option>
          {filteredFlightNums.map((flightNumItem, index) => (
            <option key={index} value={flightNumItem}>{flightNumItem}</option>
          ))}
        </select>

        <button type="submit">Buscar</button>
      </form>
    </div>
  );
};

export default SelectForm;
