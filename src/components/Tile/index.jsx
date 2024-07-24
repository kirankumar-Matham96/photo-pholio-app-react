import React from "react";
import albumTileStyles from "./index.module.css";
import { Button } from "../Button";

export const Tile = ({
  album,
  click,
  deleteImageHandle,
  editImageDataHandle,
}) => {
  return (
    <div className={albumTileStyles.tileContainer} onClick={click}>
      {album.url && (
        <div>
          <Button
            borderRadius="25rem"
            width="2.5rem"
            height="2.5rem"
            padding="0.5rem"
            bgColor="#fff"
            shadow="0 0 3px 2px  #e1e1e1"
            border="none"
            margin="0 20px 0 0"
            onClick={(e) => {
              e.stopPropagation();
              editImageDataHandle(album.id);
            }}
          >
            <img
              className={albumTileStyles.image}
              src="https://cdn-icons-png.flaticon.com/128/2985/2985043.png"
              alt="edit"
            />
          </Button>
          <Button
            borderRadius="25rem"
            width="2.5rem"
            height="2.5rem"
            padding="0.5rem"
            bgColor="#fff"
            shadow="0 0 3px 2px  #e1e1e1"
            border="none"
            margin="0 20px 0 0"
            onClick={(e) => {
              e.stopPropagation();
              deleteImageHandle(album.id);
            }}
          >
            <img
              className={albumTileStyles.image}
              src="https://cdn-icons-png.flaticon.com/128/484/484662.png"
              alt="delete"
            />
          </Button>
        </div>
      )}
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
