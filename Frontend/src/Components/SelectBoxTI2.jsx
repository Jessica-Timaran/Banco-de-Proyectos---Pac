import PropTypes from 'prop-types';

const SelectBoxTi = ({ id, text, value, onChange, error }) => {
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
      >
        <option value="" disabled>Elije una opción</option>
        <option value="CC">Cédula de ciudadanía</option>
        <option value="CE">Cédula de extranjería</option>
        <option value="TI">Tarjeta de identidad</option>
        <option value="PEP">Permiso especial de permanencia</option>
        <option value="PPT">Permiso de protección temporal</option>
      </select>
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
};

SelectBoxTi.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string, // Nueva propiedad para mensajes de error
};

export default SelectBoxTi;
