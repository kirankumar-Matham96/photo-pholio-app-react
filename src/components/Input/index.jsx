import React from "react";
import inputStyles from "./index.module.css";

export const Input = (props) => {
  return <input className={inputStyles.input} {...props} />;
};
