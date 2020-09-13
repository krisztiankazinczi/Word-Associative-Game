import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const Spinner = () => {
  return (
    <Loader
      type="Watch"
      color="#ff5733"
      height={100}
      width={100}
      timeout={60000}
    />
  );
}

export default Spinner;
