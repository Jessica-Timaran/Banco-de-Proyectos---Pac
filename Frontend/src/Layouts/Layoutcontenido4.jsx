import PropTypes from 'prop-types';

const Layoutcontenido4 = ({ title, children }) => {
  return (
    <>
      <div className="text-center px-20 mt-1">
        <span className="text-2xl font-bold font-josefin-slab">
          {title}
        </span>
      </div>

      <main className="flex justify-center overflow-x-auto">
        <div className="flex flex-wrap w-[78%] max-[768px]:w-[70%] mt-[1%] h-auto bg-white rounded-lg border-none border-Borde_gris items-center">

       
          <div className="flex flex-wrap justify-center w-full">
            {children}
          </div>
        </div>
      </main>
    </>
  );
};

Layoutcontenido4.propTypes = {
  title: PropTypes.string, // 'title' es opcional
  children: PropTypes.node.isRequired, // 'children' es requerido
};

export default Layoutcontenido4;
