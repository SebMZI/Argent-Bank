import React from "react";

const Button = ({ type, text, fnc }) => {
  return (
    <button className="btn" type={type} onClick={fnc}>
      {text}
    </button>
  );
};

export default Button;
