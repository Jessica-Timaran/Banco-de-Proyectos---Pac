
import PropTypes from 'prop-types';

const RadioButton3 = ({ Text, id }) => {
  return (
    <div className="flex items-center mr-[16px]">
      <input
        type="radio"
        id={id}
        name="estado"
        className="form-radio h-5 w-5 focus:ring-Verde checked:bg-Verde"
      />
      <label
        htmlFor={id}
        className="ml-2 text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
      >
        {Text}
      </label>
    </div>
  );
};

RadioButton3.propTypes = {
  Text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default RadioButton3;