
import PropTypes from 'prop-types';

const BotonSegundoModal = ({ text, id, onClick}) => {
    return (
        <div className="flex justify-end">
            <button
                id={id}
                onClick={onClick} 
                className="w-[147px] h-[40px] z-30 rounded-[5px] text-white relative font-semibold font-sans border border-[#A3E784]
          after:-z-20 after:absolute after:h-1 after:w-1 after:bg-[#90cc74] after:left-5 overflow-hidden after:bottom-0 after:translate-y-full
          after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700
          transition-all duration-700 mt-3">
                <span className="relative z-10 text-black group-hover:text-black text-[16px] duration-500">
                    {text}
                </span>
            </button>
        </div>
    );
};

BotonSegundoModal.propTypes = {
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onClick: PropTypes.string.isRequired,
};

export default BotonSegundoModal;