import PropTypes from 'prop-types';

const RadioButton3 = ({ Text, id, value, checked, onChange, error }) => {
  return (
    <div className="flex items-center mr-[16px]">
      <input
        type="radio"
        id={id}
        value={value}
        name="estado" // Asegura que todos los radios compartan el mismo nombre
        className="form-radio h-5 w-5 focus:ring-Verde checked:bg-Verde"
        checked={checked} // Controla si está seleccionado
        onChange={onChange} // Maneja el cambio cuando se selecciona
      />
      <label
        htmlFor={id}
        className="ml-2 text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
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
  value: PropTypes.string.isRequired, // Añadida la validación para value
  checked: PropTypes.bool.isRequired, // Añade la validación para el estado checked
  onChange: PropTypes.func.isRequired, // Añade la validación para la función onChange
  error: PropTypes.string, // Añadida la validación opcional para error
};

export default RadioButton3;
