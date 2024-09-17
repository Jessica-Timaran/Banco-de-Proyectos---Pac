import PropTypes from 'prop-types';

const RadioButton3 = ({ Text, id, value, checked, onChange, error }) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="relative">
        <input
          type="radio"
          id={id}
          value={value}
          name="estado"
          className="hidden peer" // Ocultar el radio button nativo
          checked={checked}
          onChange={onChange}
        />
        {/* Estilo personalizado para el radio button */}
        <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center peer-checked:border-[#A3E784] peer-checked:bg-[#A3E784] transition-colors duration-300">
          <div className={`w-2.5 h-2.5 bg-white rounded-full ${checked ? 'visible' : 'invisible'} peer-checked:bg-white transition-all duration-300`}></div>
        </div>
      </div>
      
      <label
        htmlFor={id}
        className="ml-2 text-tremor-default font-medium text-gray-700 peer-checked:text-[#A3E784] transition-colors duration-300"
      >
        {Text}
      </label>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

RadioButton3.propTypes = {
  Text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default RadioButton3;
