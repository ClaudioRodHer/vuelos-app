// src/hooks/useFlights.js
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ozkrsfyljtngzakkdhxv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96a3JzZnlsanRuZ3pha2tkaHh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg0MzM0NjAsImV4cCI6MjA0NDAwOTQ2MH0.-Z7WtE13WIUTrec2MrBqk9Etgt5JhQY2J93erZgn1Os';
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
