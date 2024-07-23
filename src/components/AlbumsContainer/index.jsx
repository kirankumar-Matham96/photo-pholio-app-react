import React from "react";
import { AlbumTile } from "../AlbumTile";
import albumContainerStyles from "./index.module.css";
export const AlbumContainer = ({ albums }) => {
  return (
    <div className={albumContainerStyles.bgContainer}>
      {albums.map((album) => (
        <AlbumTile key={album.id} album={album} />
      ))}
    </div>
  );
};
