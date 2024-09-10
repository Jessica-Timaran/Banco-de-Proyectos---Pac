
import PropTypes from 'prop-types';

const SelectBoxRol2 = ({ id, text }) => {
  return (
    <form className="">
      <label htmlFor={id} className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        {text}
      </label>
      <select
        id={id}
        className="bg-[#F5F6FA] w-full min-h-6 mt-3 rounded-[4px] border border-[#D5D5D5] px-[20px] py-[7px] mb-2 text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong"
      >
        <option selected>Elige una opción</option>
        <option value="Administrador">Instructor</option>
        <option value="Aprendiz">Aprendiz</option>
      </select>
    </form>
  );
};2

SelectBoxRol2.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default SelectBoxRol2;