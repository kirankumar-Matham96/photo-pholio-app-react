import React from "react";
import navBarStyles from "./index.module.css";

export const Navbar = () => {
  return (
    <div className={navBarStyles.navbar}>
      <img
        className={navBarStyles.image}
        src="https://cdn-icons-png.flaticon.com/128/11540/11540141.png"
        alt="album"
      />
      <h3 className={navBarStyles.heading}>PhotoFolio</h3>
    </div>
  );
};
