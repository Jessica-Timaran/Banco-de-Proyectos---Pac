import React from 'react';
import RadioButton2 from './RadioButton2';

const Grid = ({ Text1, id1, id2, name, checkedValue, onChange }) => {
  return (
    <div className="w-full bg-white">
      <div className="grid rounded-lg">
        <div className="grid grid-cols-12 items-center border-b py-4">
          <div className="col-span-12 md:col-span-10 flex items-center pl-4">
            <span className="text-lg">{Text1}</span>
          </div>

{/* columna para Si */}
          <div className="col-span-6 md:col-span-1 flex justify-center items-center space-x-2">
            <RadioButton2 
              id={id1} 
              name={name} 
              value="true" 
              checked={checkedValue === "true"} 
              onChange={onChange} 
            />
          </div>
{/* columna para No */}
          <div className="col-span-6 md:col-span-1 flex justify-center items-center space-x-2">
            <RadioButton2 
              id={id2} 
              name={name} 
              value="false" 
              checked={checkedValue === "false"} 
              onChange={onChange} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grid;