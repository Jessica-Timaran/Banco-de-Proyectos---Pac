import { useState, useEffect } from 'react';

const useFichasYAprendices = () => {
  const [fichas, setFichas] = useState([]);
  const [aprendices, setAprendices] = useState([]);
  const [selectedFicha, setSelectedFicha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar todas las fichas al montar el hook
  useEffect(() => {
    const fetchFichas = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:4000/api/admin/fichas');
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setFichas(data);
      } catch (error) {
        setError(error.message);
        console.error('Error al cargar las fichas:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFichas();
  }, []);

  // Cargar los aprendices cuando se selecciona una ficha
  useEffect(() => {
    const fetchAprendices = async () => {
      if (selectedFicha) {
        setLoading(true);
        try {
          const response = await fetch(`http://localhost:4000/api/admin/aprendices/${selectedFicha}`);
          if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
          }
          const data = await response.json();
          setAprendices(data);
        } catch (error) {
          setError(error.message);
          console.error('Error al cargar los aprendices:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAprendices();
  }, [selectedFicha]);

  return {
    fichas,
    aprendices,
    selectedFicha,
    setSelectedFicha,
    loading,
    error,
  };
};

export default useFichasYAprendices;