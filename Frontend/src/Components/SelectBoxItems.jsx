import PropTypes from 'prop-types';

const SelectBoxArea = ({ Text, id, options, value, onChange, error }) => {
    return (
        <form className="">
            <label htmlFor={id} className="pace-y-2 w-1/2 font-nunito-sans font-semibold">
                {Text}
            </label>
            <select
                id={id}
                value={value}
                onChange={onChange}
                className="bg-[#F5F6FA] w-full min-h-6 mt-3 rounded-[4px] border px-[20px] py-[7px] mb-2 text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong ${error ? 'border-red-500' : 'border-[#D5D5D5]'}`"
            >
                <option value="" disabled>Elige una opción</option>
                {options.length > 0 ? (
                    options.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.nombre}
                        </option>
                    ))
                ) : (
                    <option value="" disabled>No hay opciones disponibles</option>
                )}
            </select>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </form>
    );
};

SelectBoxArea.propTypes = {
    Text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        nombre: PropTypes.string.isRequired
    })).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string
};

export default SelectBoxArea;
