import PropTypes from 'prop-types';

const SelectBoxArea = ({ id, Text, options, value, onChange, error }) => {
  return (
      <div>
          <label htmlFor={id}>{Text}</label>
          <select id={id} value={value} onChange={onChange} className={`block w-full ${error ? 'border-red-500' : ''}`}>
              <option value="">Seleccione una categoría</option>
              {options.map(option => (
                  <option key={option.idcategoriasalcance} value={option.idcategoriasalcance}>
                      {option.categoria}
                  </option>
              ))}
          </select>
          {error && <p className="text-red-500">{error}</p>} {/* Mostrar mensaje de error aquí */}
      </div>
  );
};
SelectBoxArea.propTypes = {
    Text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        idcategoriasalcance: PropTypes.number.isRequired,
        categoria: PropTypes.string.isRequired
    })).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string
};

export default SelectBoxArea;
