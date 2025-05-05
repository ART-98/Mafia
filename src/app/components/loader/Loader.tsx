import React from "react";

type Props = {};

const Loader = (props: Props) => {
  return (
    <div className="flex justify-center items-center h-screen fixed top-0 left-0 right-0 bottom-0 bg-gray-100/50 dark:bg-gray-900/50 backdrop-blur-sm z-50">
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;
