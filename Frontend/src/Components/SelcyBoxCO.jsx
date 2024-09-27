import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const SelectBoxFicha = ({ id, text, value, onChange, error }) => {
  const [categoria, setFichas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    const fetchObjetivos = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/objetivos');
        if (!response.ok) {
          throw new Error(`Error fetching objetivos: ${response.statusText}`);
        }
        const data = await response.json();
        setFichas(data);
      } catch (error) {
        setFetchError('Error al obtener las fichas.');
        console.error('Error al obtener las fichas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchObjetivos();
  }, []);

  return (
    <div className="space-y-2 w-full">
      <label
        htmlFor={id}
        className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
      >
        {text}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`bg-[#F5F6FA] w-full min-h-6 mt-3 rounded-[4px] border px-[20px] py-[7px] mb-2 text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong ${error ? 'border-red-500' : 'border-[#D5D5D5]'}`}
        disabled={loading}
      >
        <option value="">Elige una ficha</option>
        {loading ? (
          <option disabled>Cargando...</option>
        ) : fetchError ? (
          <option disabled>{fetchError}</option>
        ) : (
          categoria.map((ficha) => (
            <option key={ficha.id} value={ficha.id}>
              {`${ficha.nombre} - ${ficha.numeroficha}`}
            </option>
          ))
        )}
      </select>
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
};

SelectBoxFicha.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default SelectBoxFicha;
