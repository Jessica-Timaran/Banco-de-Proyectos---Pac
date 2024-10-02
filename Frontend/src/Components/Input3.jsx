import PropTypes from 'prop-types';

const Input2 = ({ id, value, onChange, placeholder, type, Text, error }) => {
  return (
    <div>
      {Text && <label htmlFor={id} className="block text-sm font-medium text-gray-700">{Text}</label>}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-[#F5F6FA] w-full min-h-11 mt-3 rounded-[4px] border border-[#D5D5D5] px-[20px] py-[7px] mb-2 text-[15px] transition-transform transform outline-none focus:translate-y-[-5px]"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

Input2.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  Text: PropTypes.string,
  error: PropTypes.string,
};

export default Input2;