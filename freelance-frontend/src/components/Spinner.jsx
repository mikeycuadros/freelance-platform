import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-800"></div>
    </div>
  );
};

export default Spinner;
