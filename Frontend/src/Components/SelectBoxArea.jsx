import PropTypes from 'prop-types';

const SelectBox = ({ Text, id, options }) => {
    return (
        <form className="">
            <label htmlFor={id} className="pace-y-2 w-1/2 font-nunito-sans font-semibold">
                {Text}
            </label>
            <select
                id={id}
                className="bg-[#F5F6FA] w-[100%] min-h-11 mt-3 rounded-[4px] border border-[#D5D5D5] px-[20px] py-[7px] mb-2 text-[15px] transition-transform transform outline-none focus:translate-y-[-5px]"
            >
                <option selected disabled>Elige una opción</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </form>
    );
};

SelectBox.propTypes = {
    Text: PropTypes.func.isRequired,
    id: PropTypes.func.isRequired,
    options: PropTypes.func.isRequired,
  };

export default SelectBox;