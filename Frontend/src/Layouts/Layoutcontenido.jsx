
import PropTypes from 'prop-types';

const Layoutcontenido = ({  title, children }) => {
  return (
    <main className="flex justify-center items-center min-h-screen min-w-full md:h-auto 2xl:p-10 pl-9 p-10 xl:pl-32 2xl:pl-32 xl:pr-8">
      <div className="xl:w-full 2xl:h-auto lg:w-auto md:h-full h-auto p-8 rounded-lg border-none bg-white"> 
       {title}
        {children}
      </div>
    </main>
  );
};

Layoutcontenido.propTypes = {
  title: PropTypes.string, // 'title' es opcional, por lo que no se marca como requerido
  children: PropTypes.node.isRequired, // 'children' es requerido
};

export default Layoutcontenido;
