// import React from 'react';

// const BotonSegundo = ({ Text }) => {
//   return (
//     <div className="flex justify-end">
//       <button
//         className="w-[175px] h-[44px] bg-[#2eb694] rounded-[5px] text-white relative font-semibold font-sans border border-[#2eb694] 
//         after:-z-20 after:absolute after:h-1 after:w-1 after:bg-[#90cc74] after:left-5 overflow-hidden after:bottom-0 after:translate-y-full 
//         after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 
//         transition-all duration-700 mt-3"
//       >
//         <span className="relative  text-black group-hover:text-black text-[18px] duration-500">
//           {Text}
//         </span>
//       </button>
//     </div>
//   );
// };

// export default BotonSegundo;


import React from 'react';

const BotonSegundo = ({ Text, onClick, additionalClasses = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-[120px] h-[36px] text-[14px]',
    md: 'w-[180px] h-[44px] text-[16px]',
    lg: 'w-[180px] h-[48px] text-[18px]',
    xl: 'w-[190px]'
  };

  return (
    <div className="flex justify-center sm:justify-end">
      <button
        className={`relative font-semibold font-sans border border-[#2eb694] bg-[#2eb694] text-white rounded-[5px] overflow-hidden 
          transition-all duration-700 mt-3 ${sizeClasses[size]} ${additionalClasses}`}
        onClick={onClick}  
      >
        <span className="relative z-10 text-black group-hover:text-white duration-500">
          {Text}
        </span>
        <span className="absolute w-full h-full bg-[#2eb694] -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
        <span className="absolute w-full h-full bg-[#2eb694] -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
      </button>
    </div>
  );
};

export default BotonSegundo;