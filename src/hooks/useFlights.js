// src/hooks/useFlights.js
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ozkrsfyljtngzakkdhxv.supabase.co';
const supabaseKey = 'numerodeapisupabse';
const supabase = createClient(supabaseUrl, supabaseKey);

export const useFlights = () => {
  const [flightData, setFlightData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFlightData = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('vuelos').select('*');
    setLoading(false);

    if (error) {
      console.error('Error al obtener datos:', error);
      setError(error);
    } else {
      setFlightData(data);
    }
  };

  useEffect(() => {
    fetchFlightData();
  }, []);

  return { flightData, loading, error };
};
