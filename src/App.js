import './App.css';
import SelectForm from './components/Selectform';
import FlightDetails from './components/FlightDetails';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ozkrsfyljtngzakkdhxv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96a3JzZnlsanRuZ3pha2tkaHh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg0MzM0NjAsImV4cCI6MjA0NDAwOTQ2MH0.-Z7WtE13WIUTrec2MrBqk9Etgt5JhQY2J93erZgn1Os';
const supabase = createClient(supabaseUrl, supabaseKey);

const App = () => {
  
  const [flightData, setFlightData] = useState({
    origin: '',
    destination: '',
    airline: '',
    flightNum: '',
    weatherOrigin: '',
    weatherDestination: '',
  });

  const handleSearch = async (data) => {
    const { origin, destination, airline, flightNum } = data;
    try {
      const { data: flightDetailsArray, error } = await supabase
        .from('vuelos')
        .select('*')
        .eq('origin', origin)
        .eq('destination', destination)
        .eq('airline', airline)
        .eq('flight_num', flightNum)
        .limit(1);  // Devuelve un array con una sola fila.

      if (error) throw error;

      // Verifica si se ha devuelto un resultado
      if (!flightDetailsArray || flightDetailsArray.length === 0) {
        throw new Error('No se encontraron datos para el vuelo especificado.');
      }

      // Accede a la primera fila del array
      const flightDetails = flightDetailsArray[0];

      const { origin_latitude, origin_longitude, destination_latitude, destination_longitude } = flightDetails;

      // Verificar que las coordenadas existan antes de hacer la solicitud del clima
      if (!origin_latitude || !origin_longitude || !destination_latitude || !destination_longitude) {
        throw new Error('Faltan datos de coordenadas para el vuelo seleccionado.');
      }

      // Llamada a la API del clima para el aeropuerto de origen
      const weatherOrigin = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${origin_latitude}&lon=${origin_longitude}&appid=577b6831c72a0303beecf178d7a1a1d4`
      ).then((res) => res.json());
      console.log('Coordenadas origen:', { origin_latitude, origin_longitude });

      // Llamada a la API del clima para el aeropuerto de destino
      const weatherDestination = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${destination_latitude}&lon=${destination_longitude}&appid=577b6831c72a0303beecf178d7a1a1d4`
      ).then((res) => res.json());
      console.log('Coordenadas destino:', { destination_latitude, destination_longitude });

      setFlightData({
        origin,
        destination,
        airline,
        flightNum,
        weatherOrigin: weatherOrigin.weather[0]?.description || 'Sin datos',
        weatherDestination: weatherDestination.weather[0]?.description || 'Sin datos',
      });
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  return (
    <div className="app">
      <h1>Bienvenido</h1>
      <SelectForm onSearch={handleSearch} />
      <FlightDetails flightData={flightData} />    
    </div>    
  );
};

export default App;
