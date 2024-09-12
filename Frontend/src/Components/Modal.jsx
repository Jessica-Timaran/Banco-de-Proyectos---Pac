import PropTypes from 'prop-types';
import checkmarkImg from '../../public/Img/checkmark.png';

const Modal = ({ Text, isOpen, onClose, message }) => {
  return (
    <>
      {isOpen && (
        <div className="modal h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-[#B9B9B9] bg-opacity-70">
          <div className="bg-white rounded shadow-lg w-96 max-[768px]:w-[20rem]">
            <div className="border-b px-4 py-2 flex justify-end items-center">
              <button
                className="text-black closed-modal close-modal"
                onClick={onClose}
              >
                <i className="fas fa-times" aria-hidden="true"></i>
              </button>
            </div>
            <div className="border-b px-4 py-2 flex flex-col justify-center items-center">
              <span className="font-Josefin-Slab">{Text}</span>
              <p>{message}</p>
              <img src={checkmarkImg} alt="Checkmark" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Modal.propTypes = {
  Text: PropTypes.string.isRequired,
  isOpen: PropTypes.string.isRequired,
  onClose: PropTypes.string.isRequired,
};

export default Modal;