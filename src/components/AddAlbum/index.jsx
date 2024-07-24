import React from "react";
import { Input } from "../Input";
import { Button } from "../Button";
import addAlbumFormStyles from "./index.module.css";

export const AddAlbum = () => {
  return (
    <div className={addAlbumFormStyles.bgContainer}>
      <h1>Create an album</h1>
      <form className={addAlbumFormStyles.form}>
        <Input type="text" />
        <div className={addAlbumFormStyles.btnContainer}>
          <Button
            bgColor="red"
            color="white"
            border="none"
            padding="10px 28px"
            width="6.8rem"
          >
            Clear
          </Button>
          <Button
            bgColor="#07f"
            color="white"
            border="none"
            padding="10px 28px"
            width="6.8rem"
          >
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};
