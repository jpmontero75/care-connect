import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
      <div
        className="loader border-8 border-[#0058A3] border-t-transparent rounded-full w-20 h-20 animate-spin"
        style={{
          borderColor: '#0058A3',
          borderTopColor: 'transparent',
        }}
      ></div>
    </div>
  );
};

export default Loader;
