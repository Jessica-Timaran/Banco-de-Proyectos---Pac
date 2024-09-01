import React from 'react';

const BarraPreguntas = ({ Text1, Text2, Text3 }) => {
  return (
    <>
      <link href="https://fonts.googleapis.com/css?family=Inter&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Josefin+Sans&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Josefin+Slab&display=swap" rel="stylesheet" />

      <style>
        {`
          .font-josefin-slab {
            font-family: 'Josefin Slab', serif;
          }
          .font-josefin-sans {
            font-family: 'Josefin Sans', sans-serif;
          }
          .font-inter {
            font-family: 'Inter', sans-serif;
          }
        `}
      </style>

      <div className="w-full bg-[#A3E784] sm-w-2">
        <div className="grid gap-4">
          <div className="grid grid-cols-12 items-center border-b py-2 mt-15 h-20">
            <div className="col-span-10">
              <span className="text-2xl font-josefin-slab font-bold pl-12">{Text1}</span>
            </div>
            <div className="text-2xl font-josefin-slab font-bold flex items-center justify-center">
              <p>{Text2}</p>
            </div>
            <div className="text-2xl font-josefin-slab font-bold flex items-center justify-center">
              <p>{Text3}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BarraPreguntas;
