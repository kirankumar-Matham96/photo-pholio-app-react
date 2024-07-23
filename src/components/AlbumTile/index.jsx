import React from "react";
import albumTileStyles from "./index.module.css";
export const AlbumTile = ({ album }) => {
  return (
    <div className={albumTileStyles.tileContainer}>
      <div className={albumTileStyles.imageContainer}>
        <img
          className={albumTileStyles.image}
          src="https://cdn-icons-png.flaticon.com/128/833/833281.png"
          alt="album"
        />
      </div>
      <div className={albumTileStyles.titleContainer}>
        <p>{album.title}</p>
      </div>
    </div>
  );
};
