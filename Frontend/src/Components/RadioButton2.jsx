// import React from 'react';

// const RadioButton2 = ({ id, name, value, checked, onChange, label }) => {
//   return (
//     <div className="flex items-center">
//       <input
//         type="radio"
//         id={id}
//         name={name}
//         value={value}
//         checked={checked}
//         onChange={onChange}
//         className="form-radio h-5 w-5 focus:ring-red-600"
//       />
//       {label && <label htmlFor={id} className="ml-2">{label}</label>}
//     </div>
//   );
// };

// export default RadioButton2;

import React from 'react';

const RadioButton2 = ({ id, name, value, checked, onChange, label, Text, disabled, readOnly }) => {
  return (
    <div className="flex items-center">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="form-radio h-5 w-5 focus:ring-red-600"
        disabled={disabled}
        readOnly={readOnly}
      />
      {(label || Text) && (
        <label htmlFor={id} className="ml-2">
          {label || Text}
        </label>
      )}
    </div>
  );
};

export default RadioButton2;
