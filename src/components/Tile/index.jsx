import React from "react";
import albumTileStyles from "./index.module.css";
export const Tile = ({ album, click }) => {
  return (
    <div className={albumTileStyles.tileContainer} onClick={click}>
      <div
        className={
          album.url
            ? albumTileStyles.imageContainer
            : albumTileStyles.albumImageContainer
        }
      >
        <img
          className={
            album.url ? albumTileStyles.image : albumTileStyles.albumImage
          }
          src={
            album.url || "https://cdn-icons-png.flaticon.com/128/833/833281.png"
          }
          alt={album.title || "album"}
        />
      </div>
      <div
        className={
          album.url
            ? albumTileStyles.imageTitleContainer
            : albumTileStyles.albumTitleContainer
        }
      >
        <p>{album.title}</p>
      </div>
    </div>
  );
};
