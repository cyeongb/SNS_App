import React from "react";
import { Oval } from "react-loader-spinner";

const Spinner = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Oval
        color="#bc7bc8"
        secondaryColor="#d2b83a"
        strokeWidth={5}
        height={60}
        width={200}
        className="m-5"
      />
      <p className="text-lg text-center px-2">{message}</p>
    </div>
  );
};

export default Spinner;
